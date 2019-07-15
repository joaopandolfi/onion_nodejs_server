/*
* Mysql Database Controller
*/
const mysql = require('mysql');
const config = require('../configurations/pass');

const credentials = config.mysql;

let pool = null;
try {
  pool = mysql.createPool(credentials);
} catch (e) {
  console.log('ERRO NO POOL');
  console.log(e);
}

// Debug
pool.on('connection', (connection) => {
  console.log('[connectionPool] new connection opened');

  connection.on('error', (err) => {
    console.log(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', (err) => {
    console.log(new Date(), 'MySQL close', err);
  });
});

pool.on('enqueue', () => {
  console.log('[connectionPool] WARNING! there are callbacks enqueued, waiting for a free connection');
});

module.exports = {
  format: mysql.format,
  query: sql => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      connection.query(sql, (err1, rows) => {
        if (err1) {
          console.log(err1);
          reject(err1);
          return;
        }
        connection.release();
        resolve(rows);
      });
    });
  }),
};