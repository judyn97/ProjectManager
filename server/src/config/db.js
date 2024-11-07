import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "pdcprojectmanager",
    multipleStatements: true,
    dateStrings: true
});

export default db;
