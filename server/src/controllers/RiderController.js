var riders = require('../../data_access/riders')

module.exports = {
  getAll (req, res) {
    riders.getAll(res)
  },
  updateRider (req, res) {
    res.send({
      message: `Hello ${req.body.fname} ${req.body.cell}`
    })
  }
}
