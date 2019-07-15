/**
 * User controller
 * 
 * This file is responsible to control user interactions
 * 
 * (C) João Carlos Pandolfi Santana - 19/03/2019
 */

const daoUser = require('../model/dao/userDao')
const constants = require('../configurations/constants')
const permissionLevelController = require('../controller/permissionLevelController')
var bcrypt = require('bcrypt-nodejs')

var userController = {}

/** 
 * Create new user
 * @param body {username,password,company,name}
 * @return promisse
*/
userController.New = (req,res) =>{
    if(!permissionLevelController.CheckLevel(req,res,constants.Users.COMPANY_ADMIN) )
        return res.send({success:false})
    let user = req.body.username
    let password = req.body.password
    const salt = bcrypt.genSaltSync(pass.Bcrypt.salt);
    const hash = bcrypt.hashSync(password, salt);
    let body = req.body
    body.password = hash
    // SEND TO Mysql
    daoUser.NewUser(body)
        .then(result =>{
            res.send(result)
        })
        .catch(err =>{
            console.log("[ERROR][AuthController][NewUser] - Erro ao registrar novo usuário")
            res.send({success:false})
        })
}

/** 
 * Update user
 * @param body {username,company,name}
 * @return promisse
*/
userController.Update = (req,res) =>{
    let body = req.body
    if(!permissionLevelController.CheckLevel(req,res,constants.Users.COMPANY_ADMIN) )
        return res.send({success:false})
    
    daoUser.UpdateUser(body)
        .then(result=>{
            res.send(result)
        })
        .catch(err=>{
            console.log(`[Error][userDAO][UpdateUser] - Erro ao atualizar usuário`);
            //console.log(err)
            res.send({success:false})
        })
}

/** 
 * Update password User
 * @param body {username,password,company}
 * @return promisse
*/
userController.UpdatePassword = (req,res) =>{
    let body = req.body
    if(!permissionLevelController.CheckCompany(req,res,body.company) )
        return res.send({success:false})

    const salt = bcrypt.genSaltSync(pass.Bcrypt.salt);
    const hash = bcrypt.hashSync(body.password, salt);
    body.password = hash

    daoUser.UpdatePassword(body)
        .then(result=>{
            res.send(result)
        })
        .catch(err=>{
            console.log(`[Error][userDAO][UpdateUser] - Erro ao atualizar usuário`);
            //console.log(err)
            res.send({success:false})
        })
}

/** 
 * Delete user
 * @param body {username,password,company}
 * @return promisse
*/
userController.Delete = (req,res) =>{
    let body = req.body
    if(!permissionLevelController.CheckLevel(req,res,constants.Users.COMPANY_ADMIN) )
        return res.send({success:false})

    body.password = hash

    daoUser.DeleteUser(body)
        .then(result=>{
            res.send(result)
        })
        .catch(err=>{
            console.log(`[Error][userDAO][UpdateUser] - Erro ao atualizar usuário`);
            //console.log(err)
            res.send({success:false})
        })
}



module.exports = userController