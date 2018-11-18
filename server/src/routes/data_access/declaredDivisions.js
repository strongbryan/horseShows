// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function DeclaredDivisions () {
  this.getAllDeclaredDivisions = function (year, res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select id, name, year ' +
        'from declared_division_types ' +
        ' where year = ? ' +
        'order by name'
      con.query(query, year, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.updateDeclaredDivision = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('Update', req.body)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'update declared_division_types set ' +
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

  this.getAllUnassignedDivisions = function (year, div, res) {
    // initialize database connection
    // console.log('one', year, div)
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select id, name, declaredDiv, year ' +
        'from divisions ' +
        ' where year = ' + year +
        ' and declaredDiv = ' + div +
        ' order by name'
      console.log(query)
      con.query(query, function (err, result) {
        if (err) console.log('test', err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.assignDivisionToDivisionType = function (req, res) {
    // initialize database connection
    // console.log('one', req.body)
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'update divisions ' +
        ' set declaredDiv  = ' + req.body.declaredDiv +
        ' where id = ' + req.body.id
      // console.log(query)
      con.query(query, function (err, result) {
        if (err) console.log('assignDivisionToDivisionType Error', err.stack)
        con.release()
        res.send(result)
      })
    })
  }
}

module.exports = new DeclaredDivisions()
