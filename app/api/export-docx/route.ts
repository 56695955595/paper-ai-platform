import { NextRequest } from 'next/server'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  PageOrientation,
} from 'docx'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function cleanText(text: string) {
  return (text || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function isMainTitle(line: string) {
  return line.length > 4 && line.length < 60 && !/^(摘要|关键词|Abstract|Keywords|第一章|第二章|第三章|第四章|第五章|第六章|参考文献|致谢)/.test(line)
}

function isSectionTitle(line: string) {
  return /^(摘要|关键词|Abstract|Keywords|第一章|第二章|第三章|第四章|第五章|第六章|参考文献|致谢)/.test(line)
}

function createParagraph(line: string, index: number) {
  const trimmed = line.trim()

  if (!trimmed)
    return new Paragraph({ text: '' })

  if (index === 0 && isMainTitle(trimmed)) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: trimmed,
          bold: true,
          size: 32,
          font: 'SimHei',
        }),
      ],
    })
  }

  if (isSectionTitle(trimmed)) {
    return new Paragraph({
      spacing: { before: 240, after: 160 },
      children: [
        new TextRun({
          text: trimmed,
          bold: true,
          size: 28,
          font: 'SimHei',
        }),
      ],
    })
  }

  const isEnglish = /^[A-Za-z\s,.;:'"()\-]+$/.test(trimmed.slice(0, 80))

  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: 480 },
    spacing: {
      line: 360,
      after: 120,
    },
    children: [
      new TextRun({
        text: trimmed,
        size: 24,
        font: isEnglish ? 'Times New Roman' : 'SimSun',
      }),
    ],
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const rawText = cleanText(body?.text || '')
    const filename = cleanText(body?.filename || '论文文档') || '论文文档'

    if (!rawText) {
      return Response.json(
        { error: 'Missing text' },
        { status: 400 },
      )
    }

    let lines = rawText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)

    // 去掉常见占位标题
    lines = lines.filter((line, index) => {
      if (index === 0 && ['论文题目', '# 论文题目'].includes(line))
        return false
      return true
    })

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              size: {
                orientation: PageOrientation.PORTRAIT,
              },
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: lines.map((line, index) => createParagraph(line, index)),
        },
      ],
    })

    const buffer = await Packer.toBuffer(doc)

    const safeFilename = filename.replace(/[\\/:*?"<>|]/g, '').slice(0, 80) || '论文文档'

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(`${safeFilename}.docx`)}`,
      },
    })
  }
  catch (error: any) {
    console.error('export docx error:', error)
    return Response.json(
      { error: error?.message || 'Export docx failed' },
      { status: 500 },
    )
  }
}