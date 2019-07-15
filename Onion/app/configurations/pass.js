var Pass = {
    Bcrypt:{
        hash: "SecretPassBCRYPT",
        salt:12,
    },

    Session:{
      name:"sessionId",
      secret: 'SecretPassSESSION',
      resave: false,
      saveUninitialized: false
  },

    mysql: {
        connectionLimit: 10,
        multipleStatements: true,
        host: 'mysql',
        user: 'root',
        password: 'rootpassword',
        database: 'ecg_data',
        port: 3306,//3311,
      },
}

module.exports = Pass