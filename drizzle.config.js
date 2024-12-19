"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
const env_1 = require("./src/env");
exports.default = (0, drizzle_kit_1.defineConfig)({
    out: "./.migrations",
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    dbCredentials: {
        url: env_1.env.DATABASE_URL,
    },
});
