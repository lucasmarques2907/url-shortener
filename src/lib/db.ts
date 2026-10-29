import { neon } from "@neondatabase/serverless";
import { envOrThrow } from "./helpers";

const dbUrl = envOrThrow("DATABASE_URL");
export const sql = neon(dbUrl);
