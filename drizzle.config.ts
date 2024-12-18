import { defineConfig } from "drizzle-kit";
import { env } from "./src/env";
export default defineConfig({
  out: "./.migrations",
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});