// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function Horses () {
  this.getAll = function (res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select id, name ' +
        'from horses ' +
        'order by name'
      con.query(query, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.updateHorse = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('horse Update', req.body.id)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      const query = 'update horses set ' +
        'name = \'' + req.body.name + '\' ' +
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

module.exports = new Horses()
