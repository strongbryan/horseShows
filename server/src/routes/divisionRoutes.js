var divisions = require('./data_access/divisions')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    // Divisions
    app.get('/getAllDivisions', function (req, res) {
      divisions.getAll(res)
    })
    app.get('/getAllDivisionsUntranslated/:year/', function (req, res) {
      // console.log('routes', req.params.year)
      divisions.getAllUntranslated(req.params.year, res)
    })
    app.post('/updateDivision', function (req, res) {
      console.log('server route', req.body)
      divisions.updateDivision(req, res)
    })
  }
}
