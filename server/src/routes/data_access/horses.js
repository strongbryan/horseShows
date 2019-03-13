// methods for fetching mysql data
var connection = require('../connection/MySQLConnect')

function Horses () {
  this.getAll = function (res) {
    // initialize database connection
    connection.init()
    // get id as parameter to passing into query and return filter data
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'select id, name ' +
        'from horses ' +
        'order by name'
      con.query(query, function (err, result) {
        if (err) console.log(err.stack)
        con.release()
        res.send(result)
      })
    })
  }

  this.updateHorse = function (req, res) {
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
  }
  this.getOneHorse = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('get one horse', req.params)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      const query = 'SELECT * ' +
        'from horses ' +
        'where name = \'' + req.params.horseName.trim() + '\''
      con.query(query, function (err, result) {
        if (err) {
          console.log(err.stack)
        } else {
          con.release()
          res.send(result)
        }
      })
    })
  }
  this.newHorse = function (req, res) {
    // initialize database connection
    connection.init()
    console.log('horse new', req.body)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'insert into horses (name) values (' +
        '\'' + req.body.name + '\' ' +
        ')'
      console.log(query) // SELECT LAST_INSERT_ID();
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
  }
  this.getPairedHorse = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('Update', req.params)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'SELECT * FROM pairs p join horses h on h.id = p.horse ' +
        'where horse = ' + req.params.horse
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
  }
  this.getHorseInShow = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('Update', req.params)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'SELECT * FROM horses.showparticipants ' +
        'where result is not null ' +
        'and shownumber in (' +
        'select shownumber from pairs ' +
        'where horse = ' + req.params.horse +
        ')'
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
  }
  this.deleteHorse = function (req, res) {
    // initialize database connection
    connection.init()
    // console.log('Update', req.params)
    connection.acquire(function (err, con) {
      if (err) console.log(err.stack)
      var query = 'delete from horses  ' +
        'where id = ' + req.params.horse
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
  }
}

module.exports = new Horses()
