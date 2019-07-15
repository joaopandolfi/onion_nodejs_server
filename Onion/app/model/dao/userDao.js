/*
* Dao User
*/
const dao = require('../dao.js');

const daoUser = Object.create(dao);

/**
* Efetua login do usuário
* @param user {username, password,company}
*/
daoUser.Login = user => new Promise((resolve, reject) => {
  const sql = 'SELECT * FROM user where username = ? ;';
  daoUser.sql_query(sql, [user.username,user.company])
    .then((results) => {
      resolve(results);
    })
    .catch((r) => {
      reject(r);
    });
});

/**
* Cria novo usuário
* @param user - {username, password, company, name, permission}
*/
daoUser.NewUser = user => new Promise((resolve, reject) => {
  let sql1 = 'SELECT username FROM user where username = ? '
  daoUser.sql_query(sql, [user.username,user.company])
    .then((results) => {
      if(results.data.length == 0){
        const sql = 'INSERT INTO user (username, password, company, name, permission) VALUES ?;';
        daoUser.sql_query(sql, [user.username, user.password, user.company, user.name, user.permission])
        .then((results) => {
          console.log(results)
          resolve(results);
        })
        .catch((r) => {reject(r);});    
      }else 
        reject({success:false,message:"Usuário já registrado no banco de dados"})
    })
    .catch((r) => {
      reject(r);
    });
  
});

/**
* Update User
* @param user {username,  company,name}
*/
daoUser.UpdateUser = user => new Promise((resolve, reject) => {
  const sql = 'UPDATE user SET username = ?, name = ? WHERE username = ? ;';
  daoUser.sql_query(sql, [user.username, user.name, user.username, user.company])
    .then((results) => {
      console.log(`[Mysql][userDAO][UpdateUser] - Usuário atualizado com sucesso: ${user.username}`);
      resolve(results);
    })
    .catch((r) => {
      reject(r);
    });
});

/**
* Update Password User
* @param user {username, password, company}
*/
daoUser.UpdatePasswordUser = user => new Promise((resolve, reject) => {
  const sql = 'UPDATE user SET password = ? WHERE username = ? ;';
  daoUser.sql_query(sql, [user.password, user.username, user.company])
    .then((results) => {
      console.log(`[Mysql][userDAO][UpdatePassword] - Senha do usuário atualizada com sucesso: ${user.username}`);
      resolve(results);
    })
    .catch((r) => {
      reject(r);
    });
});

/**
* Delete User
* @param user {username, company}
*/
daoUser.DeleteUser = user => new Promise((resolve, reject) => {
  const sql = 'DELETE FROM user WHERE username = ? ;';
  daoUser.sql_query(sql, [user.password, user.username, user.company])
    .then((results) => {
      console.log(`[Mysql][userDAO][DeleteUser] - Usuário removido com sucesso: ${user.username}`);
      resolve(results);
    })
    .catch((r) => {
      reject(r);
    });
});


module.exports = daoUser;
