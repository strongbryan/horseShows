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
  this.getOneRiderAge = function (req, res) {
    // initialize database connection
    // console.log('data access', year)
    connection.init()
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var q = 'SELECT id FROM agetypes ' +
        'where age = \'' + req.params.age + '\' ' +
        'and year = ' + req.params.year
      // console.log(req.params, q)
      con.query(q, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        // console.log(result)
        res.send(result)
      })
    })
  }
  this.deleteRiderAge = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('Update', req.params)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'delete from agetypes  ' +
        'where id = ' + req.params.rider
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
  this.newRiderAge = function (req, res) {
    // initialize database connection
    connection.init()
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var q = 'insert into agetypes (age, year) values (' +
        '\'' + req.body.age + '\', ' +
        req.body.year + ' ' +
        ')'
      console.log('rider new', req.body, q)
      con.query(q, function (err, result) {
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
