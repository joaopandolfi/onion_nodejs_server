
const Constants = {
    Users: {
        USER: 1,
        PRIVILEDGED_USER:3,
        COMPANY_ADMIN: 5,
        GESTOR: 10,
        ADMIN: 99
    },
    Paths:{
        Upload:'./files/' 
    },
    Ports:{
        http:9000,
        https:443
    },
    SSL:{
        Key: "./sslcert/server.key",
        Cert: "./sslcert/server.crt",
    }
}

module.exports = Constants