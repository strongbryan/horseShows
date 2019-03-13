// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function DeclaredDivisions () {
  this.getAllDeclaredJumperDivisions = function (year, res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select id, division, year ' +
        'from declareddivision_j ' +
        ' where year = ? ' +
        'order by division'
      con.query(query, year, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.updateDeclaredJumperDivision = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('Update', req.body)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'update declareddivision_j set ' +
        'division = \'' + req.body.division + '\' ' +
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

  this.getAllUnassignedJumperDivisions = function (year, div, res) {
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
        if (err) console.log('Error', err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.assignDivisionToJumperDivisionType = function (req, res) {
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
        if (err) console.log('Error', err.stack)
        con.release()
        res.send(result)
      })
    })
  }
  this.getPairsUsingJumperDivisionType = function (req, res) {
    // initialize database connection
    // console.log('one', req)
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select id ' +
        ' from pairs ' +
        ' where declaredDivJumper = ' + req
      // console.log(query)
      con.query(query, function (err, result) {
        if (err) console.log('Error', err.stack)
        con.release()
        res.send(result)
      })
    })
  }
  this.newJumperDivisionType = function (req, res) {
    // initialize database connection
    // console.log('newJumperDivisionType', req.body)
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'insert into declareddivision_j (division, year) values (' +
      '\'' + req.body.division + '\', ' + req.body.year +
        ' )'
      // console.log(query)
      con.query(query, function (err, result) {
        if (err) console.log('Error', err.stack)
        con.release()
        res.send(result)
      })
    })
  }
  this.deleteDivisionJumperDivisionType = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('Update', req.params)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'delete from declareddivision_j  ' +
        'where id = ' + req.params.id
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
  this.getOneJumperDivisionType = function (req, res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select id, division, year ' +
        'from declareddivision_j ' +
        ' where division = \'' + req.params.division + '\' ' +
        ' and year = ' + req.params.year
      // console.log(query)
      con.query(query, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }
}

module.exports = new DeclaredDivisions()
