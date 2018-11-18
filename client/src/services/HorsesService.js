import Api from '@/services/Api'

export default {
  getAllHorses () {
    return Api().get(`getAllHorses`)
  },
  updateHorse (horse) {
    return Api().post(`updateHorse`, horse)
  }
}
