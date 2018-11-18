const mysql = require('mysql')

function MySqlConnect () {
  this.pool = null

  this.init = function () {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'horses'
    })
  }
  this.acquire = function (callback) {
    this.pool.getConnection(function (err, connection) {
      callback(err, connection)
    })
  }
}

module.exports = new MySqlConnect()
