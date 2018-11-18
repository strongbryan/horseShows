import Api from '@/services/Api'

export default {
  getAllPairs () {
    return Api().get(`getAllPairs`)
  },
  updatePair (newPair) {
    // console.log('newPair', newPair)
    return Api().post(`updatePair`, newPair)
  }
}
