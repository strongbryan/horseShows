// methods for fetching mysql data
var connection = require('../../connection/MySQLConnect')

function AgeGroups () {
  this.getAll = function (res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select id, age ' +
        'from agetypes ' +
        'order by age'
      con.query(query, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.updateAge = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('rider Update', req.body.id)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'update agetypes set ' +
        'age = \'' + req.body.fname + '\', ' +
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

module.exports = new AgeGroups()
