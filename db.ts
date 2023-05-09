import pg from "pg";
console.log(process.env.DB_LINK);

const pool = new pg.Pool({
  connectionString:
    "postgres://admin:b3XY3PwS5spW5rcZ6t0vAjJfXTWvvu2s@dpg-cgpfe99euhlq286a32fg-a/db_learn",
  port: 5432,
  database: "db_learn",
});

export default pool;
