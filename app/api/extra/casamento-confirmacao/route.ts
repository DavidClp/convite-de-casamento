import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const apiUrl = 'https://lms-api.bikoservicos.com.br/api/'

  if (!apiUrl) {
    return NextResponse.json(
      { error: "API não configurada" },
      { status: 500 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido" },
      { status: 400 }
    )
  }

  const baseUrl = apiUrl.endsWith("/") ? apiUrl : `${apiUrl}/`

  try {
    const response = await fetch(`${baseUrl}extra/casamento-confirmacao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      const message =
        (data && typeof data === "object" && "message" in data && typeof data.message === "string"
          ? data.message
          : null) ||
        (data && typeof data === "object" && "error" in data && typeof data.error === "string"
          ? data.error
          : null) ||
        "Erro ao salvar confirmação"

      return NextResponse.json({ error: message }, { status: response.status })
    }

    return NextResponse.json(data ?? { success: true })
  } catch {
    return NextResponse.json(
      { error: "Não foi possível conectar ao servidor" },
      { status: 502 }
    )
  }
}
