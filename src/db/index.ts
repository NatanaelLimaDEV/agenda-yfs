import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"
import { env } from "../env"

// Conexão com o banco de dados.
export const cliente = postgres(env.DATABASE_URL)
export const db = drizzle(cliente, { schema, logger: true })