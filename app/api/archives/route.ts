import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/archives
 * 建立新典藏索引
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      Class: classValue,
      WebName,
      OrgName,
      OrgWebLink,
    } = body

    // 驗證必填欄位
    if (!classValue || !WebName || !OrgName || !OrgWebLink) {
      return NextResponse.json(
        { success: false, error: '所有欄位皆為必填' },
        { status: 400 }
      )
    }

    // 建立典藏索引
    const archive = await prisma.archiveIndex.create({
      data: {
        Class: classValue,
        WebName,
        OrgName,
        OrgWebLink,
      },
    })

    return NextResponse.json({
      success: true,
      data: archive,
    })
  } catch (error) {
    console.error('Archive creation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '典藏索引建立失敗',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/archives
 * 獲取所有典藏索引
 */
export async function GET(request: Request) {
  try {
    const archives = await prisma.archiveIndex.findMany({
      orderBy: {
        id: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      data: archives,
    })
  } catch (error) {
    console.error('Archives fetch error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '典藏索引獲取失敗',
      },
      { status: 500 }
    )
  }
}
