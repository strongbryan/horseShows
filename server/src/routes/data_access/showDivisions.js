// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function ShowDivisions () {
  this.getDivisionsAssignedToShow = function (show, res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      // console.log('showId', show)
      var query = 'select distinct s.div_id, d.name, c.hunter, c.western, c.jumpers, s.inUse ' +
        'from show_classes s ' +
        '  left join divisions d on d.id = s.div_id ' +
        '  left join classes c on s.classes_id = c.id ' +
        'where show_id = ?' +
        'order by d.name'
      con.query(query, show, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }
}

module.exports = new ShowDivisions()
