// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function ShowAdministration () {
  this.getClassesInShow = function (show, res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      // console.log('showId', show)
      var query = 'select c.id, division, class, c.id classNumber, classNumber displayClass, hunter, western, ' +
        'jumpers, d.name divName, ' +
        '(select count(*) ct ' +
          'from showParticipants p ' +
          'where showId = ? ' +
          'and p.classnumber = c.id ' +
          'and inClass = 1) ct ' +
        'from classes c ' +
        '  join divisions d on d.id = c.division ' +
        'where c.id in ( ' +
        '  SELECT distinct classnumber' +
        '  FROM horses.showparticipants' +
        '  where showid= ? ' +
        '  and registered = 1' +
        ')' +
        'order by c.id'
      con.query(query, [show, show], function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }
}

module.exports = new ShowAdministration()
