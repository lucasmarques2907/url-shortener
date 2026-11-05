export function envOrThrow(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment key ${key} not set.`);
  }

  return value;
}

export function validateUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol == "http:" || url.protocol == "https:";
  } catch {
    return false;
  }
}

export function buildUrl(baseUrl: string, value: string): string {
  const url = new URL(`${baseUrl}/${value}`);
  return url.href;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
