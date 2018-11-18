var horses = require('./data_access/horses')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    // Horses
    app.get('/getAllHorses', function (req, res) {
      horses.getAll(res)
    })
    app.post('/updateHorse', function (req, res) {
      horses.updateHorse(req, res)
    })
  }
}
