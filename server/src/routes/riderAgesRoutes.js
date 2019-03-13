var riderAges = require('./data_access/riderAges')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    app.get('/getAllRiderAges/:year/', function (req, res) {
      // console.log('routes', req.params.year)
      riderAges.getAll(req.params.year, res)
    })
    app.post('/updateRiderAge', function (req, res) {
      console.log('riderAgeRoutes', req.body)
      riderAges.updateRiderAge(req, res)
    })
    app.post('/newRiderAge', function (req, res) {
      // console.log(req)
      riderAges.newRiderAge(req, res)
    })
    app.get('/getOneRiderAge/:age/:year/', function (req, res) {
      // console.log(req)
      riderAges.getOneRiderAge(req, res)
    })
    app.delete('/deleteRiderAge/:rider', function (req, res) {
      // console.log(req)
      riderAges.deleteRiderAge(req, res)
    })
  }
}
