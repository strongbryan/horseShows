// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function Results () {
  this.getResults = function (params, res) {
    // console.log(params)
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query =
        'select id, division, rider, horse, showNumber, divId, riderId, horseId, '
      if (params.showId.length > 0) {
        query += 'sum(points) points '
      } else {
        query += 'points '
      }
      query += 'from (' +
        'select d.name division, s.showNumber, concat(r.lname,\', \',r.fname) rider, h.name horse, ' +
          'case when ps.points is null then 0 else ps.points end points, c.id, d.id divId, ' +
          'r.id riderId, h.id horseId ' +
        'from showParticipants s ' +
          'join classes c on c.id = s.classnumber ' +
          'join divisions d on d.id = c.division and d.year = ' + params.year + ' ' +
          'join pairs p on p.showNumber = s.showNumber ' +
          'join riders r on r.id = p.rider ' +
          'join horses h on h.id = p.horse ' +
          'left join possibleScores ps on ps.id = s.result ' +
        'where inClass = 1 '
      if (params.showId.length > 0) {
        query += 'and showId = ' + params.showId + ' '
      }
      query += ') a '
      if (params.showId.length > 0) {
        query += 'group by  division, rider, horse, showNumber, divId, riderId, horseId '
      }
      query += 'order by id, division, points desc'
      con.query(query, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }
  this.getResultsClassPlaces = function (params, res) {
    // console.log(params)
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query =
        'select s.classNumber, s.shownumber, ' +
        'case when s.result is null then 0 else s.result end result, ' +
        'c.division, c.class ' +
        'from showparticipants s ' +
        'left join classes c on s.classNumber = c.id ' +
        'where showid = ' + params.showId + ' ' +
        'order by classnumber'
      con.query(query, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.getResultsDivisionsInShow = function (params, res) {
    // console.log(params)
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query =
        'select classes_id, d.name, d.id divId ' +
        'from show_classes s ' +
          'join divisions d on s.div_id = d.id ' +
        'where show_id = ' + params.showId + ' ' +
          'and inuse = 1'
      con.query(query, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }
}

module.exports = new Results()
