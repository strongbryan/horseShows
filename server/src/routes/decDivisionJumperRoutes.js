var declaredJumperDivisions = require('./data_access/declaredJumperDivisions')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    app.get('/getAllDeclaredJumperDivisions/:year/', function (req, res) {
      // console.log('routes', req.params.year)
      declaredJumperDivisions.getAllDeclaredJumperDivisions(req.params.year, res)
    })
    app.post('/updateDeclaredJumperDivision', function (req, res) {
      // console.log('server route', req.body)
      declaredJumperDivisions.updateDeclaredJumperDivision(req, res)
    })
    app.get('/getAllUnassignedJumperDivisions/:year/:div/', function (req, res) {
      // console.log('routes', req.params)
      declaredJumperDivisions.getAllUnassignedJumperDivisions(req.params.year, req.params.div, res)
    })
    app.post('/assignDivisionToJumperDivisionType', function (req, res) {
      // console.log('server route', req.params)
      declaredJumperDivisions.assignDivisionToJumperDivisionType(req, res)
    })
    app.get('/getPairsUsingJumperDivisionType/:id/', function (req, res) {
      // console.log('routes 23', req.params.id)
      declaredJumperDivisions.getPairsUsingJumperDivisionType(req.params.id, res)
    })
    app.post('/newJumperDivisionType', function (req, res) {
      // console.log(req)
      declaredJumperDivisions.newJumperDivisionType(req, res)
    })
    app.delete('/deleteDivisionJumperDivisionType/:id', function (req, res) {
      // console.log(req)
      declaredJumperDivisions.deleteDivisionJumperDivisionType(req, res)
    })
    app.get('/getOneJumperDivisionType/:division/:year/', function (req, res) {
      // console.log('get getOneJumperDivisionType', req.params)
      declaredJumperDivisions.getOneJumperDivisionType(req, res)
    })
  }
}
