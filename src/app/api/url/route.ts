import { saveUrl, validateUrl } from "@/lib/url";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "invalid_json",
        message: "O corpo da requisição não é um JSON válido",
      },
      { status: 400 },
    );
  }

  const url = body.url;

  if (!validateUrl(url)) {
    return NextResponse.json(
      {
        error: "bad_request",
        message: "Informe uma url válida começando com http:// ou https://",
      },
      { status: 400 },
    );
  }

  try {
    const result = await saveUrl(url);
    return NextResponse.json({ result });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        error: "db_error",
        message:
          "Não foi possível encurtar a URL. Tente novamente em instantes.",
      },
      { status: 500 },
    );
  }
}
