import Api from '@/services/Api'

export default {
  getAllRiderAges (year) {
    // console.log('test', year)
    return Api().get(`getAllRiderAges/${year.year}`)
  },
  updateRiderAge (riderAge) {
    // console.log('service riderAge', riderAge)
    return Api().post(`updateRiderAge`, riderAge)
  },
  newRiderAge (riderAge) {
    // console.log('service new rider age', riderAge)
    return Api().post(`newRiderAge`, riderAge)
  },
  getOneRiderAge (riderAge) {
    // console.log('service get one rider age', riderAge)
    return Api().get(`getOneRiderAge/${riderAge.age}/${riderAge.year}`)
  },
  deleteRiderAge (params) {
    // console.log('deleteRider service', params)
    return Api().delete(`deleteRiderAge/${params.id}`)
  }
}
