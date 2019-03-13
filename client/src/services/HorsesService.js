import Api from '@/services/Api'

export default {
  getAllHorses () {
    return Api().get(`getAllHorses`)
  },
  updateHorse (horse) {
    return Api().post(`updateHorse`, horse)
  },
  getOneHorse (horse) {
    // console.log('service get one horse', horse)
    return Api().get(`getOneHorse/${horse.name}`)
  },
  newHorse (horse) {
    // console.log('service new Horse', horse)
    return Api().post(`newHorse`, horse)
  },
  getPairedHorse (params) { // Horse being deleted check the horse is not paired with a rider
    // console.log('getPairedHorse service', params)
    return Api().get(`getPairedHorse/${params.id}`)
  },
  getHorseInShow (params) { // Horse being deleted check the horse is not in a show
    // console.log('getHorseInShow service', params)
    return Api().get(`getHorseInShow/${params.id}`)
  },
  deleteHorse (params) {
    // console.log('deleteHorse service', params)
    return Api().delete(`deleteHorse/${params.id}`)
  }
}
