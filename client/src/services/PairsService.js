import Api from '@/services/Api'

export default {
  getAllPairs () {
    return Api().get(`getAllPairs`)
  },
  updatePair (newPair) {
    // console.log('newPair', newPair)
    return Api().post(`updatePair`, newPair)
  },
  getPairInShow (params) { // Horse being deleted check the horse is not in a show
    console.log('getPairInShow service', params)
    return Api().get(`getPairInShow/${params.id}`)
  },
  deletePair (params) {
    // console.log('deleteHorse service', params)
    return Api().delete(`deletePair/${params.id}`)
  }
}
