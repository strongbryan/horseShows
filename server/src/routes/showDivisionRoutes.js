var showDivisions = require('./data_access/showDivisions')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    app.get('/getDivisionsAssignedToShow/:show/', function (req, res) {
      showDivisions.getDivisionsAssignedToShow(req.params.show, res)
    })
    /* app.get('/getParticipantsInShow/:show/', function (req, res) {
      showDivisions.getParticipantsInShow(req.params.show, res)
    }) */
    /* app.post('/updateHorse', function (req, res) {
      participants.updateHorse(req, res)
    }) */
  }
}
