import mysql from 'mysql2';

const dbConfig = {
    host: "10.111.160.105",
    port: 28306,
    user: "root",
    password: "root",
    database: "pdcprojectmanager",
    multipleStatements: true,
    dateStrings: true
};

let db;

function handleDisconnect() {
    db = mysql.createConnection(dbConfig);

    db.connect(err => {
        if (err) {
            console.error('Error connecting to the database:', err);
            setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds
        } else {
            console.log('Connected to the database.');
        }
    });

    db.on('error', err => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconnect on connection loss
        } else {
            throw err;
        }
    });
}

handleDisconnect();

export default db;