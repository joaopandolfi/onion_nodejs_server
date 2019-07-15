/**
 * ECG controller
 * 
 * (C) João Carlos Pandolfi Santana - 13/07/2019
 */

const daoECG = require('../model/dao/ecgDao')
const constants = require('../configurations/constants')
const permissionLevelController = require('../controller/permissionLevelController')

var ecgController = {}

var errMessage = "<center>SAI DAQUI SEU CACHORRO</center>"

function getUserPayload(req){
    return {
        name:req.session.name,
        permission: req.session.permission,
        userID: req.session.userID
    }
}

ecgController.NewReport = (req,res) =>{
    let body = req.body
    if(!permissionLevelController.CheckLevel(req,res,constants.Users.USER) )
        return res.send(errMessage)

    daoECG.NewReport(body,req.session.userID).then(r=>{
        let id = parseInt(body.image) +1
        res.render('report.hbs',{ecgs:{image:id,total:1000},msg:"Salvo com sucesso",user:getUserPayload(req)})
    }).catch(e=>{res.send(errMessage)})
}

ecgController.Get = (req,res) =>{
    let body = req.body
    if(!permissionLevelController.CheckLevel(req,res,constants.Users.USER) )
        return res.send(errMessage)

    daoECG.GetECG(req.session.userID).then(r=>{
        let data = r.data.pop()
        if(data) data.image = parseInt(data.image) +1
        else data = {image:1}
        data.total= 1000
        
        res.render('report.hbs',{ecgs:data,msg:"",user:getUserPayload(req)})
    }).catch(e=>{console.log(e); res.send(errMessage)})
}

ecgController.GetByID = (req,res) =>{
    let body = req.body
    if(!permissionLevelController.CheckLevel(req,res,constants.Users.USER) )
        return res.send(errMessage)

    daoECG.GetECGByID(body).then(r=>{
        res.render('report.hbs',{ecgs:r.data.pop(),msg:"",user:getUserPayload(req)})
    }).catch(e=>{res.send(errMessage)})
}


module.exports = ecgController