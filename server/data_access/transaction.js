// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function Transaction () {

  this.getShowsByYear = function (year, res) {
    // initialize database connection  
    connection.init()
    // get id as parameter to passing into query and return filter data  
    connection.acquire(function (err, con) {
      var query = 'select id, showname, showdate, date_format(showdate, "%e %M %Y") displaydate from shows where year(showdate) = ? order by showdate desc'
      con.query(query, year, function (err, result) {
        con.release()
        res.send(result)
      })
    })
  }
  
  this.getPageHeaderInfo = function (res) {
    // initialize database connection  
    connection.init()
    connection.acquire(function (err, con) {
      var query = 'select * from adminInfos'
      con.query(query, function (err, result) {
        con.release()
        res.send(result)
      })
    })
  }
  
  // get all users data
  this.getAllUsers = function (res) {
    // initialize database connection  
    connection.init()
    // calling acquire methods and passing callback method that will be execute query  
    // return response to server   
    connection.acquire(function (err, con) {
      con.query('Select * from shows', function (err, result) {
        con.release()
        res.send(result)
      })
    })
  }

  this.getTransactionById = function (id, res) {
    // initialize database connection  
    connection.init()
    // get id as parameter to passing into query and return filter data  
    connection.acquire(function (err, con) {
      /* var query = 'SELECT date_format(t.TransactionDate,\'%d-%b-%Y\') as date, ' +
        'CASE WHEN t.TransactionAmount >= 0 THEN t.TransactionAmount ' +
        'ELSE 0 END AS Credit, CASE WHEN t.TransactionAmount < 0 THEN ' +
        't.TransactionAmount ELSE 0 END AS Debit, t.Balance FROM ' +
        'transactions t INNER JOIN users u ON t.UserId=u.UserID WHERE t.UserId = ?' */
      var query = 'select * from shows where year(showdate) = ?'
      con.query(query, id, function (err, result) {
        con.release()
        res.send(result)
      })
    })
  }

}

module.exports = new Transaction()
