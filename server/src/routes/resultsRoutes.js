var results = require('./data_access/results')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    app.get('/getResults/:showId/:year/', function (req, res) {
      console.log(req.params)
      results.getResults({showId: req.params.showId, year: req.params.year}, res)
    })
    app.get('/getResultsClassPlaces/:showId/', function (req, res) {
      console.log(req.params)
      results.getResultsClassPlaces({showId: req.params.showId}, res)
    })
    app.get('/getResultsDivisionsInShow/:showId/', function (req, res) {
      console.log(req.params)
      results.getResultsDivisionsInShow({showId: req.params.showId}, res)
    })
  }
}
