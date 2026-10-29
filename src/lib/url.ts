import { nanoid } from "nanoid";
import { sql } from "@/lib/db";
import { envOrThrow } from "./helpers";

const MAX_ATTEMPTS = Number(envOrThrow("MAX_ATTEMPTS"));

type ShortenedUrl = {
  code: string;
  original: string;
  created_at: Date;
};

export function validateUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol == "http:" || url.protocol == "https:";
  } catch {
    return false;
  }
}

export async function saveUrl(url: string): Promise<ShortenedUrl> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const code = nanoid(6);

    try {
      const result = await sql`
      INSERT INTO urls (code, original)
      VALUES (${code}, ${url})
      RETURNING *
      `;
      return result[0] as ShortenedUrl;
    } catch (e) {
      if (isUniqueViolation(e)) continue;
      throw e;
    }
  }

  throw new Error("Não foi possível gerar um código único");
}

function isUniqueViolation(e: unknown): boolean {
  return (
    typeof e === "object" && e !== null && "code" in e && e.code === "23505"
  );
}
