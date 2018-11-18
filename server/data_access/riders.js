//methods for fetching mysql data  
var connection = require('../connection/MySQLConnect')

function Participant() {

  this.getAll = function (res) {
    // initialize database connection  
    connection.init()
    // get id as parameter to passing into query and return filter data  
    connection.acquire(function (err, con) {
      var query = 'select id, lname, fname, cell, age, member, concat(lname,\', \',fname) fullname ' +
        'from riders ' +
        'order by lname, fname'
      con.query(query, function (err, result) {
        con.release()
        res.send(result)
      })
    })
  },
  this.updateRider = function (res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data  
    connection.acquire(function (err, con) {
      var query = 'update riders set ' +
        'age = "Junior", ' +
        'cell = "555554321", ' +
        'fname = "Jessica", ' +
        'lname = "Strong", ' +
        'member = "M", ' +
        'where id = 9'
        con.query(query, function (err, result) {
        con.release()
        res.send(result)
      })
    })
  }
}

module.exports = new Participant();  