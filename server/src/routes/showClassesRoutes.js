var showClasses = require('./data_access/showClasses')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    // Riders
    app.get('/getParticipants/:show/:class/', function (req, res) {
      // console.log('test1', req.params)
      showClasses.getParticipants(req, res)
    })
    app.get('/getPlaces', function (req, res) {
      console.log('test1')
      showClasses.getPlaces(res)
    })
    /* app.post('/updateRider', function (req, res) {
      // console.log(req)
      riders.updateRider(req, res)
    }) */
  }
}
