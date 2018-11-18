import Api from '@/services/Api'

export default {
  getAllShowYears () {
    return Api().get(`getAllShowYears`)
  },
  updateShowYear (year) {
    return Api().post(`updateShowYear`, year)
  }
}
