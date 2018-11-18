// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function Riders () {
  this.getAll = function (res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select id, lname, fname, cell, age, member, concat(lname,\', \',fname) fullname ' +
        'from riders ' +
        'order by lname, fname'
      con.query(query, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.updateRider = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('rider Update', req.body.id)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'update riders set ' +
        'fname = \'' + req.body.fname + '\', ' +
        'lname = \'' + req.body.lname + '\', ' +
        'age = \'' + req.body.age + '\', ' +
        'cell = \'' + req.body.cell + '\', ' +
        'member = \'' + req.body.member + '\' ' +
        'where id = ' + req.body.id
      con.query(query, function (err, result) {
        if (err) {
          console.log(err.stack)
        } else {
          con.release()
          // console.log(result)
          res.send(result)
        }
      })
    })
  }
}

module.exports = new Riders()
