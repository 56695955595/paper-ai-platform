import type { NextRequest } from 'next/server'
import { getInfo } from '@/app/api/utils/common'
import { API_KEY, API_PREFIX } from '@/config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const API_BASE_URL = API_PREFIX?.startsWith('http')
  ? API_PREFIX
  : 'https://api.dify.ai/v1'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { inputs, files } = body
    const { user } = getInfo(request)

    if (!API_KEY) {
      return Response.json(
        { error: 'Missing Dify API key' },
        { status: 500 },
      )
    }

    const difyRes = await fetch(`${API_BASE_URL}/workflows/run`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: inputs || {},
        files: files || [],
        response_mode: 'streaming',
        user,
      }),
      cache: 'no-store',
    })

    if (!difyRes.ok || !difyRes.body) {
      const text = await difyRes.text()
      return new Response(text || 'Dify workflow start failed', {
        status: difyRes.status,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
    }

    const reader = difyRes.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    const startedAt = Date.now()
    const timeout = 55000

    while (Date.now() - startedAt < timeout) {
      const { value, done } = await reader.read()

      if (done)
        break

      buffer += decoder.decode(value, { stream: true })

      const match = buffer.match(/"workflow_run_id"\s*:\s*"([^"]+)"/)

      if (match?.[1]) {
        return Response.json({
          workflow_run_id: match[1],
          status: 'started',
        })
      }
    }

    return Response.json(
      {
        error: 'Workflow started, but workflow_run_id was not captured.',
        raw: buffer.slice(0, 1000),
      },
      { status: 500 },
    )
  }
  catch (error: any) {
    console.error('workflow start error:', error)

    return Response.json(
      {
        error: error?.message || 'Workflow start failed',
      },
      { status: 500 },
    )
  }
}