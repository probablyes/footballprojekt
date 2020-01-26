const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'toor321',
    database: 'tin_project',
});

module.exports = pool.promise();