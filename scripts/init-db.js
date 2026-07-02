// Usage: npm run db:init  (make sure DATABASE_URL is set in .env.local)
require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const sql = fs.readFileSync(path.join(__dirname, "..", "schema.sql"), "utf8");
  await pool.query(sql);
  console.log("✅ Database schema created successfully.");
  await pool.end();
}

main().catch((err) => {
  console.error("❌ Failed to init database:", err);
  process.exit(1);
});
