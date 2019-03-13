// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function Class () {
  this.getAll = function (res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select c.id, division, class, classNumber, hunter, western, jumpers, ' +
        'case when division is null then \'UNASSIGNED\' else d.name end divName ' +
        'from classes c ' +
        'join divisions d on d.id = c.division ' +
        'order by division, class'
      con.query(query, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.updateClass = function (req, res) {
    // initialize database connection
    connection.init()
    console.log('Update Class', req.body)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'update classes set ' +
        'class = \'' + req.body.class + '\' ' +
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

module.exports = new Class()
