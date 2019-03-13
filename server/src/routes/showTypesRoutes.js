var showtypes = require('./data_access/showtypes')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    // Pairs
    app.get('/getAllShowTypes/:year/', function (req, res) {
      // console.log('routes', req.params.year)
      showtypes.getAll(req.params.year, res)
    })
    app.post('/updateShowType', function (req, res) {
      console.log('showTypesRoutes', req.body)
      showtypes.updateShowType(req, res)
    })
    app.post('/newShowType', function (req, res) {
      // console.log(req)
      showtypes.newShowType(req, res)
    })
    app.delete('/deleteShowType/:id', function (req, res) {
      // console.log('api delete show type', req)
      showtypes.deleteShowType(req, res)
    })
  }
}
