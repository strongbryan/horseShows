var startup = require('./data_access/general')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    app.get('/getShowsByYear/:year/', function (req, res) { // :reportingYear/
      startup.getShowsByYear(req.params.year, res) // req.params.reportingYear,
    })
    // set show year for the association
    app.post('/updateShow', function (req, res) {
      // console.log(req.body)
      startup.updateShow(req, res)
    })
    // adding route for users, here app is express instance which provide use
    // get method for handling get request from http server.
    app.get('/api/users', function (req, res) {
      startup.getAllUsers(res)
    })
    // here we gets id from request and passing to it transaction method.
    app.get('/api/transactions/:id/', function (req, res) {
      startup.getTransactionById(req.params.id, res)
    })
    // get all show years enter in the database
    app.get('/getAllShowYears', function (req, res) {
      startup.getAllShowYears(res)
    })
    // set show year for the association
    app.post('/updateShowYear', function (req, res) {
      startup.updateShowYear(req, res)
    })
    // Association and Year information
    app.get('/getPageHeaderInfo', function (req, res) {
      startup.getPageHeaderInfo(res)
    })
  }
}
