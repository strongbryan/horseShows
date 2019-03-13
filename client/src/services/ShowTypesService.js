import Api from '@/services/Api'

export default {
  getAllShowTypes (year) {
    // console.log('test', year)
    return Api().get(`getAllShowTypes/${year.year}`)
  },
  updateShowType (showType) {
    // console.log('service showType', showType)
    return Api().post(`updateShowType`, showType)
  },
  newShowType (newShow) {
    console.log('new show Type', newShow)
    return Api().post(`newShowType`, newShow)
  },
  deleteShowType (params) {
    // console.log('deleteShowType service', params)
    return Api().delete(`deleteShowType/${params.id}`)
  }
}
