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
    app.get('/getOneHorse/:horseName/', function (req, res) {
      // console.log(req.params)
      horses.getOneHorse(req, res)
    })
    app.post('/newHorse', function (req, res) {
      // console.log(req)
      horses.newHorse(req, res)
    })
    app.get('/getPairedHorse/:horse', function (req, res) {
      // console.log(req)
      horses.getPairedHorse(req, res)
    })
    app.get('/getHorseInShow/:horse', function (req, res) {
      // console.log(req)
      horses.getHorseInShow(req, res)
    })
    app.delete('/deleteHorse/:horse', function (req, res) {
      // console.log(req)
      horses.deleteHorse(req, res)
    })
  }
}
