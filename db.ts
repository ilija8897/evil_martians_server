import pg from "pg";
const password = `${encodeURIComponent("b3XY3PwS5spW5rcZ6t0vAjJfXTWvvu2s")}`;
const pool = new pg.Pool({
  user: "admin",
  password: password,
  connectionString: `postgres://admin:${password}@dpg-cgpfe99euhlq286a32fg-a/db_learn`,
  port: 5432,
  database: "db_learn",
});

export default pool;
