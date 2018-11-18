// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function Divisions () {
  this.getAll = function (res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select id, name, declaredDiv declaredDivId, ' +
        'case when hw = 1 then \'Hunter/Western\' else ' +
        'case when j = 1 then \'Jumper\' else ' +
        'case when p = 1 then \'Pleasure\' end end end declaredDiv ' +
        'from divisions ' +
        'order by name'
      con.query(query, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.getAllUntranslated = function (year, res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select id, name, declaredDiv, hw, j, p ' +
        'from divisions ' +
        ' where year = ? ' +
        'order by name'
      con.query(query, year, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.updateDivision = function (req, res) {
    // initialize database connection
    connection.init()
    console.log('Update', req.body)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'update divisions set ' +
        'name = \'' + req.body.name + '\', ' +
        'declaredDiv = ' + req.body.declaredDiv + ', ' +
        'hw = ' + req.body.hw + ', ' +
        'j = ' + req.body.j + ', ' +
        'p = ' + req.body.p + ' ' +
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

module.exports = new Divisions()
