import Api from '@/services/Api'

export default {
  getAllShowTypes (year) {
    // console.log('test', year)
    return Api().get(`getAllShowTypes/${year.year}`)
  },
  updateShowType (showType) {
    // console.log('service showType', showType)
    return Api().post(`updateShowType`, showType)
  }
}
