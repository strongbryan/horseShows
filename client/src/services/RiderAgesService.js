import Api from '@/services/Api'

export default {
  getAllRiderAges (year) {
    // console.log('test', year)
    return Api().get(`getAllRiderAges/${year.year}`)
  },
  updateRiderAge (riderAge) {
    // console.log('service riderAge', riderAge)
    return Api().post(`updateRiderAge`, riderAge)
  }
}
