var classes = require('./data_access/showAdministration')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    app.get('/getClassesInShow/:show/', function (req, res) {
      classes.getClassesInShow(req.params.show, res)
    })
    /* app.post('/updateHorse', function (req, res) {
      classes.updateHorse(req, res)
    }) */
  }
}
