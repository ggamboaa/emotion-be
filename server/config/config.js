module.exports = {
  development: {
    dialect: "mysql",
    //storage: "./db.development.sqlite"
  },
  test: {
    dialect: "mysql",
    //storage: ":memory:"
  },
  production: {
    username: 'bf0cdbc65b64d9',
    password: 'a4d5d4f1',
    database: 'heroku_7dda55d9c07116c',
    host: 'us-cdbr-iron-east-01.cleardb.net',
    dialect: 'mysql',
    use_env_variable: false
  }

};