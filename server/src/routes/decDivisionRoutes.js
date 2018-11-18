var declaredDivisions = require('./data_access/declaredDivisions')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    app.get('/getAllDeclaredDivisions/:year/', function (req, res) {
      // console.log('routes', req.params.year)
      declaredDivisions.getAllDeclaredDivisions(req.params.year, res)
    })
    app.post('/updateDeclaredDivision', function (req, res) {
      // console.log('server route', req.body)
      declaredDivisions.updateDeclaredDivision(req, res)
    })
    app.get('/getAllUnassignedDivisions/:year/:div/', function (req, res) {
      // console.log('routes', req.params)
      declaredDivisions.getAllUnassignedDivisions(req.params.year, req.params.div, res)
    })
    app.post('/assignDivisionToDivisionType', function (req, res) {
      // console.log('server route', req.params)
      declaredDivisions.assignDivisionToDivisionType(req, res)
    })
  }
}
