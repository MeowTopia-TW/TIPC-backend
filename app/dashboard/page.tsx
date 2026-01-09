'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Article {
  id: string
  title: string
  author: string
  slug: string
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

interface Photograph {
  id: string
  title: string
  author: string
  description: string
  photoDate: string
  createdAt: string
  updatedAt: string
}

type ContentItem = (Article | Photograph) & { type: 'article' | 'photograph' }

export default function DashboardPage() {
  const router = useRouter()
  const [contents, setContents] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    // 獲取使用者角色
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        setUserRole(user.title)
      } catch (err) {
        console.error('Failed to parse user data:', err)
      }
    }
    fetchContents()
  }, [])

  const fetchContents = async () => {
    try {
      setIsLoading(true)
      
      // 並行獲取文章和照片
      const [articlesResponse, photographsResponse] = await Promise.all([
        fetch('/api/articles'),
        fetch('/api/photographs')
      ])

      const articlesResult = await articlesResponse.json()
      const photographsResult = await photographsResponse.json()
      
      const allContents: ContentItem[] = []
      
      if (articlesResult.success) {
        allContents.push(...articlesResult.data.map((article: Article) => ({
          ...article,
          type: 'article' as const
        })))
      }
      
      if (photographsResult.success) {
        allContents.push(...photographsResult.data.map((photo: Photograph) => ({
          ...photo,
          type: 'photograph' as const
        })))
      }
      
      // 按更新時間排序（最新的在前）
      allContents.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      
      setContents(allContents)
    } catch (err) {
      setError('載入內容時發生錯誤')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '未發布'
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const deleteArticle = async (articleId: string, articleTitle: string) => {
    if (!confirm(`確定要刪除文章「${articleTitle}」嗎？此操作無法復原。`)) {
      return
    }

    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        alert('文章已成功刪除')
        fetchContents()
      } else {
        alert('刪除失敗：' + (result.error || '未知錯誤'))
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('刪除失敗：' + (err instanceof Error ? err.message : '未知錯誤'))
    }
  }

  const deletePhotograph = async (photographId: string, photographTitle: string) => {
    if (!confirm(`確定要刪除照片「${photographTitle}」嗎？此操作無法復原。`)) {
      return
    }

    try {
      const response = await fetch(`/api/photographs/${photographId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        alert('照片已成功刪除')
        fetchContents()
      } else {
        alert('刪除失敗：' + (result.error || '未知錯誤'))
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('刪除失敗：' + (err instanceof Error ? err.message : '未知錯誤'))
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">內容管理</h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">載入中...</div>
          </div>
        ) : contents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">尚無內容</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    類別
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    標題
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    作者
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    日期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    最後更新
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contents.map((item) => (
                  <tr key={`${item.type}-${item.id}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.type === 'article' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          觀點文章
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          光影故事
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      {item.type === 'article' && (
                        <div className="text-sm text-gray-500">{(item as Article).slug}</div>
                      )}
                      {item.type === 'photograph' && (
                        <div className="text-sm text-gray-500">{(item as Photograph).description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.type === 'article' 
                          ? formatDate((item as Article).publishedAt)
                          : formatDate((item as Photograph).photoDate)
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(item.updatedAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {item.type === 'article' ? (
                          <>
                            <button
                              onClick={() => router.push(`/dashboard/update/article/${item.id}`)}
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              更新
                            </button>
                            {userRole === 'admin' && (
                              <button
                                onClick={() => deleteArticle(item.id, item.title)}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                刪除
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => router.push(`/dashboard/update/photograph/${item.id}`)}
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              更新
                            </button>
                            {userRole === 'admin' && (
                              <button
                                onClick={() => deletePhotograph(item.id, item.title)}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                刪除
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
