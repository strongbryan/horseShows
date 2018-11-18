//methods for fetching mysql data  
var connection = require('../connection/MySQLConnect')

function Class() {

  this.getAll = function (res) {
    // initialize database connection  
    connection.init();
    // get id as parameter to passing into query and return filter data  
    connection.acquire(function (err, con) {
      var query = 'select c.id, division, class, classNumber, hunter, western, jumpers, d.name divName ' +
        'from classes c ' +
        'join divisions d on d.id = c.division ' +
        'order by division, class'
      con.query(query, function (err, result) {
        con.release();
        res.send(result)
      });
    });
  };
}

module.exports = new Class();  
