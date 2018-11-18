// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function ShowClasses () {
  this.getParticipants = function (params, res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    // console.log('in', params.params)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select s.id, fname, lname, name, s.shownumber, ' +
        'case when result is null then 0 else result end result, comments ' +
        'from showParticipants s ' +
        '  join pairs p on p.showNumber = s.showNumber' +
        '  join riders r on r.id = p.rider ' +
        '  join horses h on h.id = p.horse ' +
        'where showId = ' + params.params.show +
        '  and classNumber = ' + params.params.class +
        '  and inClass = 1 ' +
        'order by s.showNumber'
      con.query(query, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }
  this.getPlaces = function (res) {
    connection.init()
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var q = 'select id, points from possiblescores'
      // console.log('q', q)
      con.query(q, function (err, result) {
        // console.log('1', res)
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }
}

module.exports = new ShowClasses()
