const fs = require('fs')

const PermissionLevelController = require('./permissionLevelController')
const constants = require('../configurations/constants')

const FileController = {}

const errMessage = "TÁ DE SACANAGEM NÉ???"

//TODO: PODE TER FALHA DE SEGURANCA AQUI
FileController.GetCertFile =  (req, res) => {
    if(!PermissionLevelController.CheckLevel(req,res,constants.Users.USER)) return
    
    try{
        let file = req.params.id
        file = file.toString().replace(/[/=.]/g, '');
        file = file.replace("png","")
        file = constants.Paths.Upload+file+".png"
        if(fs.existsSync(file)){
            res.setHeader('Content-Type','image/png')
            fs.createReadStream(file).pipe(res)
        }
        else
            res.send(errMessage)    
    }catch(e){
        res.send(errMessage)
    }
}

module.exports = FileController