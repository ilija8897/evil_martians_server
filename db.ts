import pg from 'pg';

const pool = new pg.Pool({
    user: 'postgres',
    password: 'Borealis.8897',
    host: 'localhost',
    port: 5432,
    database: 'db_node',
});

export default pool;
