var pairs = require('./data_access/pairs')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    // Pairs
    app.get('/getAllPairs', function (req, res) {
      pairs.getAll(res)
    })
    app.post('/updatePair', function (req, res) {
      pairs.updatePair(req, res)
    })
    app.get('/getPairInShow/:rider', function (req, res) {
      // console.log(req)
      pairs.getPairInShow(req, res)
    })
    app.delete('/deletePair/:rider', function (req, res) {
      // console.log(req)
      pairs.deleteRider(req, res)
    })
  }
}
