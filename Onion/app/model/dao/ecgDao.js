/*
* Dao ECG
*/
const daoBase = require('../dao.js');

const dao = Object.create(daoBase);

dao.NewReport = (r,iduser) => new Promise((resolve,reject)=>{
  const sql = 'INSERT INTO report (image,geral,v1,v2,v3,v4,v5,v6,avr,avl,avf,i,ii,iii,iduser) VALUES (?);';
  dao.sql_query(sql, [[r.image,r.geral,r.v1,r.v2,r.v3,r.v4,r.v5,r.v6,r.avr,r.avl,r.avf,r.i,r.ii,r.iii,iduser]])
    .then((results) => {
      resolve(results);
    })
    .catch((r) => {
      reject(r);
    });
})

dao.GetECG = (iduser) => new Promise((resolve,reject)=>{
    const sql = 'SELECT * FROM report WHERE iduser = ? ORDER BY idreport DESC LIMIT 1 ;';
    dao.sql_query(sql, [parseInt(iduser)])
      .then((results) => {
        resolve(results);
      })
      .catch((r) => {
        console.log(r)
        reject(r);
      });
})

dao.GetECGByID = (data) => new Promise((resolve,reject)=>{
    
})

module.exports = dao