var fetch = require('node-fetch')
var bcrypt = require('bcrypt-nodejs')
const authConstants = require('../configurations/pass')
const daoUser = require('../model/dao/userDao')
const authController = {}

authController.CheckAuth = (req,res,next) =>{
    let session = req.session; // Sessao igual do PHP
    res.locals.username = session.username || false
    next()
}

authController.RedirectLogin = (req,res) =>{
    res.render('login.hbs')
}

authController.Forbidden = (req,res) =>{
    res.render('forbidden.hbs')
}

authController.Logout = (req,res) =>{
    req.session.username = null
    res.redirect('/')
}

authController.Login = (req,res) =>{
    // Ir ao banco e efetuar login
    const salt = bcrypt.genSaltSync(authConstants.Bcrypt.salt);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash)
    daoUser.Login(req.body)
        .then((dbResult)=>{
            if(dbResult.data.length > 0){
                result = dbResult.data[0]
                if(bcrypt.compareSync( req.body.password,result.password)){
                    req.session.username = req.body.username
                    req.session.permission = result.permission
                    req.session.userID = result.iduser
                    req.session.name = result.name
                    res.redirect('/')
                }else res.send({success:false,message:"Invalid username or password"})
            }
            else res.send({success:false,message:"Invalid username or password"})
            
        })
        .catch(r=>{
            console.log(r)
            res.send({success:false})
        })
}

authController.NewUser = (req,res) =>{
    let user = req.body.username
    let password = req.body.password
    const salt = bcrypt.genSaltSync(authConstants.Bcrypt.salt);
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

authController.Auth = async (req, res, next) => {
    let session = req.session
    if (!session.username) res.redirect('/login')
    else next()
}

authController.FowardCookie = async (req, res, next) => {
    var results = await fetch('http://localhost/hospital', { method: "GET", headers: { cookie: req.headers.cookie } }) //, body , headers: { 'Content-Type': 'application/json' } })
    let data = await results.json()
    req.hospitais = data
    if (!data && data.msg && data.msg == 'Auth Error') res.redirect('/')
    else next()
}


module.exports = authController