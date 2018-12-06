import Api from '@/services/Api'

export default {
  getAllRiders () {
    return Api().get(`getAllRiders`)
  },
  updateRider (rider) {
    return Api().post(`updateRider`, rider)
  },
  newRider (rider) {
    // console.log('service new rider', rider)
    return Api().post(`newRider`, rider)
  },
  getPairedRider (params) { // Rider being deleted check the rider is not paired with a horse
    // console.log('getPairedRider service', params)
    return Api().get(`getPairedRider/${params.id}`)
  },
  getRiderInShow (params) { // Rider being deleted check the rider is not paired with a horse
    // console.log('getPairedRider service', params)
    return Api().get(`getRiderInShow/${params.id}`)
  },
  deleteRider (params) {
    // console.log('deleteRider service', params)
    return Api().delete(`deleteRider/${params.id}`)
  }
}
