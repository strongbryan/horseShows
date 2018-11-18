var classes = require('./data_access/classes')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    // Classes
    app.get('/getAllClasses', function (req, res) {
      classes.getAll(res)
    })
    app.post('/updateClass', function (req, res) {
      console.log('server route', req.body)
      classes.updateClass(req, res)
    })
  }
}
