var participants = require('./data_access/participants')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    app.get('/getAvailableParticipants/:show/', function (req, res) {
      participants.getAvailable(req.params.show, res)
    })
    app.get('/getParticipantsInShow/:show/', function (req, res) {
      participants.getParticipantsInShow(req.params.show, res)
    })
    /* app.post('/updateHorse', function (req, res) {
      participants.updateHorse(req, res)
    }) */
  }
}
