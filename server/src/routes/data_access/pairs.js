// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function Pairs () {
  this.getAll = function (res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select p.id, horse, rider, name, lname, fname, shownumber, concat(lname,\', \',fname) riderfullname, declaredDiv, declaredDivJumper, declaredDivP ' +
        'FROM horses.pairs p ' +
        'left join horses h on h.id = p.horse ' +
        'left join riders r on r.id = p.rider ' +
        'where horse like "%" ' +
        'or lname like "%" ' +
        'or fname like "%" ' +
        'or name like "%"  ' +
        'or shownumber like "%" ' +
        'order by shownumber '
      con.query(query, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }
  this.updatePair = function (req, res) {
    // initialize database connection
    connection.init()
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      const query = 'update pairs set ' +
        'horse = ' + req.body.horse + ' ' +
        ',rider = ' + req.body.rider + ' ' +
        ',showNumber = ' + req.body.showNumber + ' ' +
        ',declaredDiv = ' + req.body.declaredDiv + ' ' +
        ',declaredDivJumper = ' + req.body.declaredDivJumper + ' ' +
        ',declaredDivP = ' + req.body.declaredDivP + ' ' +
        'where id = ' + req.body.id
      // console.log('pair Update', req.body, query)
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

module.exports = new Pairs()
