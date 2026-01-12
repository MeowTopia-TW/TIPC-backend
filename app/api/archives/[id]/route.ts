import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/archives/[id]
 * 獲取單一典藏索引詳情
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const archive = await prisma.archiveIndex.findUnique({
      where: { id: parseInt(id) },
    })

    if (!archive) {
      return NextResponse.json(
        { success: false, error: '典藏索引不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: archive,
    })
  } catch (error) {
    console.error('Archive fetch error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '典藏索引獲取失敗',
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/archives/[id]
 * 刪除典藏索引
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // 檢查典藏索引是否存在
    const archive = await prisma.archiveIndex.findUnique({
      where: { id: parseInt(id) },
    })

    if (!archive) {
      return NextResponse.json(
        { success: false, error: '典藏索引不存在' },
        { status: 404 }
      )
    }

    // 刪除典藏索引
    await prisma.archiveIndex.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({
      success: true,
      message: '典藏索引已成功刪除',
    })
  } catch (error) {
    console.error('Archive deletion error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '典藏索引刪除失敗',
      },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/archives/[id]
 * 更新典藏索引
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // 檢查典藏索引是否存在
    const existingArchive = await prisma.archiveIndex.findUnique({
      where: { id: parseInt(id) },
    })

    if (!existingArchive) {
      return NextResponse.json(
        { success: false, error: '典藏索引不存在' },
        { status: 404 }
      )
    }

    // 更新典藏索引
    const archive = await prisma.archiveIndex.update({
      where: { id: parseInt(id) },
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
    console.error('Archive update error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '典藏索引更新失敗',
      },
      { status: 500 }
    )
  }
}
