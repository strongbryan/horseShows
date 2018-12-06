import Api from '@/services/Api'

export default {
  getAllClasses () {
    return Api().get(`getAllClasses`)
  },
  updateClass (info) {
    // console.log('update class in service', info)
    return Api().post(`updateClass`, info)
  }
}
