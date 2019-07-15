const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
var expressSession = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var morgan = require("morgan")
var helmet = require("helmet")
var fs = require('fs');
var https = require('https');
var http = require('http')

const router = require('./routes');
const config = require('./configurations/constants')
const pass = require('./configurations/pass')
const gf = require('./configurations/globalFunctions')

var useHHTPS = false

// Server
app.set('view engine', 'hbs');

// Nunjucks
let njk_env = nunjucks.configure("views", {
    autoescape: true,
    cache: false,
    express: app,
    watch: true
});

// Set Nunjucks as rendering engine for pages with .html suffix

//Logs
app.use(morgan("common"))

// Security
app.use(helmet())

// Cookie parser
app.use(cookieParser())
// Body parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Session
app.use(expressSession(pass.Session))

// Public files
app.use('/public', express.static('public'));
app.use('*/css', express.static('public/css'))

app.use('/', router);


if(useHHTPS){
    // HTTPS
    var privateKey  = fs.readFileSync(config.SSL.Key, 'utf8');
    var certificate = fs.readFileSync(config.SSL.Cert, 'utf8');
    var credentials = {key: privateKey, cert: certificate};

    // Listen server
    var httpsServer = https.createServer(credentials, app);

    // HTTPS
    httpsServer.listen(config.Ports.https, function () {
        console.log(`Listening HTTPS at: ${config.Ports.https}`)
    });

    // HTTP
    http.createServer(function (req, res) {
        res.writeHead(301, { "Location": "https://" + req.headers['host'].replace("www.","") + req.url });
        res.end();
    }).listen(config.Ports.http, () =>{
        console.log(`Listening HTTP at: ${config.Ports.http} and redirect to HTTPS`)
    });

    app.use('/',router)
}else{
    http.createServer(app).listen(config.Ports.http, () =>{
        console.log(`Listening HTTP at: ${config.Ports.http}`)
    });
}

