export function envOrThrow(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment key ${key} not set.`);
  }

  return value;
}
