// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function ShowTypes () {
  this.getAll = function (year, res) {
    // initialize database connection
    console.log('data access', year)
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var q = 'SELECT id, type, year FROM showtypes ' +
        'where year = ?' +
        ' order by type'
      con.query(q, year, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        // console.log(result)
        res.send(result)
      })
    })
  }

  this.updateShowType = function (req, res) {
    // initialize database connection
    connection.init()
    console.log('showType Update', req.body)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      const query = 'update showTypes set ' +
        'type = \'' + req.body.type + '\' ' +
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

module.exports = new ShowTypes()
