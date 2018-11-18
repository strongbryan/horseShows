//methods for fetching mysql data  
var connection = require('../connection/MySQLConnect')

function Participant() {

  this.getAll = function (res) {
    // initialize database connection  
    connection.init();
    // get id as parameter to passing into query and return filter data  
    connection.acquire(function (err, con) {
      var query = 'select p.id, horse, rider, name, lname, fname, shownumber, concat(lname,\', \',fname) riderfullname ' +
        'FROM horses.pairs p ' +
        'left join horses h on h.id = p.horse ' +
        'left join riders r on r.id = p.rider ' +
        'where horse like "%" ' +
        'or lname like "%" ' +
        'or fname like "%" ' +
        'or name like "%"  ' +
        'or shownumber like "%" ' +
        'order by shownumber'
      con.query(query, function (err, result) {
        con.release();
        res.send(result)
      });
    });
  };
}

module.exports = new Participant();  
