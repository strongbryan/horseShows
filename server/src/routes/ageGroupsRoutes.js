var ageGroups = require('./data_access/admin/ageGroups')

module.exports = {
  // set up route configuration that will be handle by express server
  configure: function (app) {
    // Age Groups
    app.get('/getAgeGroups', function (req, res) {
      ageGroups.getAll(res)
    })
  }
}
