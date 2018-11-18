import Api from '@/services/Api'

export default {
  getAllRiders () {
    return Api().get(`getAllRiders`)
  },
  updateRider (rider) {
    return Api().post(`updateRider`, rider)
  }
}
