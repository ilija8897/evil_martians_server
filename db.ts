import pg from "pg";
console.log(process.env.DB_LINK);

const pool = new pg.Pool({
  connectionString: process.env.DB_LINK,
  port: 5432,
  database: "db_learn",
});

export default pool;
