import Api from '@/services/Api'

export default {
  getAllClasses () {
    return Api().get(`getAllClasses`)
  },
  updateClass (params) {
    // console.log('update class in service', params)
    return Api().post(`updateClass`, params)
  }
}
