//methods for fetching mysql data  
var connection = require('../connection/MySQLConnect')

function Participant() {

  this.getAll = function (res) {
    // initialize database connection  
    connection.init();
    // get id as parameter to passing into query and return filter data  
    connection.acquire(function (err, con) {
      var query = 'select id, name ' +
        'from horses ' +
        'order by name'
      con.query(query, function (err, result) {
        con.release();
        res.send(result)
      });
    });
  };
}

module.exports = new Participant();  
