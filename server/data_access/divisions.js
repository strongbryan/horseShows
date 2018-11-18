//methods for fetching mysql data  
var connection = require('../connection/MySQLConnect')

function Divisions() {

  this.getAll = function (res) {
    // initialize database connection  
    connection.init();
    // get id as parameter to passing into query and return filter data  
    connection.acquire(function (err, con) {
      var query = 'select id, name, declaredDiv declaredDivId, ' +
        'case when hw = 1 then \'Hunter/Western\' else ' +
        'case when j = 1 then \'Jumper\' else ' +
        'case when p = 1 then \'Pleasure\' end end end declaredDiv ' +
        'from divisions ' +
        'order by name'
      con.query(query, function (err, result) {
        con.release();
        res.send(result)
      });
    });
  };
}

module.exports = new Divisions();  
