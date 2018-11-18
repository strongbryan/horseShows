// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function RiderAges () {
  this.getAll = function (year, res) {
    // initialize database connection
    // console.log('data access', year)
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var q = 'SELECT id, age, year FROM agetypes ' +
        'where year = ?' +
        ' order by age'
      con.query(q, year, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        // console.log(result)
        res.send(result)
      })
    })
  }

  this.updateRiderAge = function (req, res) {
    // initialize database connection
    connection.init()
    console.log('riderAge Update', req.body)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      const query = 'update ageTypes set ' +
        'age = \'' + req.body.age + '\' ' +
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

module.exports = new RiderAges()
