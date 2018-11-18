// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function Participants () {
  this.getParticipantsInShow = function (show, res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      // console.log('showId', show)
      var query = 'select distinct s.shownumber, s.registered, h.name, r.fname, r.lname, ' +
        'CONCAT(r.lname, ", ", r.fname) AS rider, null removeFromShow ' +
        'from showParticipants s ' +
        '  join pairs p on p.shownumber = s.shownumber ' +
        '  join riders r on r.id = p.rider ' +
        '  join horses h on h.id = p.horse ' +
        'where showid = ?' +
        '  and registered = 1 ' +
        'order by shownumber'
      /* select distinct s.shownumber, s.registered, h.name, r.fname, r.lname
where showid = <cfqueryparam cfsqltype='CF_SQL_INTEGER' value='#arguments.showId#'>
and registered = <cfqueryparam cfsqltype='CF_SQL_INTEGER' value='1'>
and (
lname like <cfqueryparam cfsqltype='CF_SQL_VARCHAR' value='%#arguments.availableFilter#%'>
or fname like <cfqueryparam cfsqltype='CF_SQL_VARCHAR' value='%#arguments.availableFilter#%'>
or name like <cfqueryparam cfsqltype='CF_SQL_VARCHAR' value='%#arguments.availableFilter#%'>
or p.shownumber like <cfqueryparam cfsqltype='CF_SQL_VARCHAR' value='%#arguments.availableFilter#%'>
)
order by shownumber
*/
      con.query(query, show, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.getAvailable = function (show, res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      // console.log('showId', show)
      var query = 'select p.shownumber, h.name, r.fname, r.lname, s.classnumber, s.registered, ' +
      'CONCAT(r.lname, ", ", r.fname) AS rider, null addToShow ' +
      'from pairs p ' +
        '  join horses h on h.id = p.horse ' +
        '  join riders r on r.id = p.rider ' +
        '  left join showparticipants s on s.shownumber = p.shownumber and s.shownumber = ? ' +
        'where p.shownumber not in ' +
        '  (select distinct s.shownumber ' +
        '  from showParticipants s ' +
        '  where showid = ? ' +
        '  and s.registered = 1) ' +
        'order by shownumber'
      /* select p.shownumber, h.name, r.fname, r.lname, s.classnumber, s.registered
where p.shownumber not in (<cfqueryparam cfsqltype='CF_SQL_INTEGER' value='#lstInShow#' list='yes'>)
and (
lname like <cfqueryparam cfsqltype='CF_SQL_VARCHAR' value='%#arguments.availableFilter#%'>
or fname like <cfqueryparam cfsqltype='CF_SQL_VARCHAR' value='%#arguments.availableFilter#%'>
or name like <cfqueryparam cfsqltype='CF_SQL_VARCHAR' value='%#arguments.availableFilter#%'>
or p.shownumber like <cfqueryparam cfsqltype='CF_SQL_VARCHAR' value='%#arguments.availableFilter#%'>
)
order by shownumber
*/
      con.query(query, [show, show], function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  /* this.updateHorse = function (req, res) {
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
  } */
}

module.exports = new Participants()
