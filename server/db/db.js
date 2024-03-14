const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'qwerasdf',
    host: 'localhost',
    port: 5432,
    database: 'codeforces',//it will be the name of the database
    //max: 10, // Maximum number of connections in the pool
    //idleTimeoutMillis: 30000, // Time a connection can be idle before being closed
});

module.exports = pool;
