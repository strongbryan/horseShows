var riders = require('./data_access/riders')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    // Riders
    app.get('/getAllRiders', function (req, res) {
      riders.getAll(res)
    })
    app.post('/updateRider', function (req, res) {
      // console.log(req)
      riders.updateRider(req, res)
    })
  }
}
