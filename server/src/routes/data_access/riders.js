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
  this.newRider = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('rider new', req.body.id)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'insert into riders (fname, lname, age, cell, member) values (' +
        '\'' + req.body.fname + '\', ' +
        '\'' + req.body.lname + '\', ' +
        '\'' + req.body.age + '\', ' +
        '\'' + req.body.cell + '\', ' +
        '\'' + req.body.member + '\' ' +
        ')'
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
  this.getPairedRider = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('Update', req.params)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'SELECT * FROM pairs p join horses h on h.id = p.horse ' +
        'where rider = ' + req.params.rider
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
  this.getRiderInShow = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('Update', req.params)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'SELECT * FROM horses.showparticipants ' +
        'where result is not null ' +
        'and shownumber in (' +
        'select shownumber from pairs ' +
        'where rider = ' + req.params.rider +
        ')'
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
  this.deleteRider = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('Update', req.params)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'delete from riders  ' +
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
}

module.exports = new Riders()
