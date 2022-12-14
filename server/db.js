const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,

    // connectionString: process.env.DATABASE_URL,

    // // ssl: {
    // //     rejectUnauthorized: false
    // // }

    // ssl: process.env.DATABASE_URL ? true : false
})


module.exports = pool;