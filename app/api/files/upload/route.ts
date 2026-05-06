import { API_KEY, API_URL } from '@/config'

export async function POST(request: Request) {
  const formData = await request.formData()

  const res = await fetch(`${API_URL}/files/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    body: formData,
  })

  const text = await res.text()

  return new Response(text, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'application/json',
    },
  })
}
