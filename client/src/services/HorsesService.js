import Api from '@/services/Api'

export default {
  getAllHorses () {
    return Api().get(`getAllHorses`)
  },
  updateHorse (horse) {
    return Api().post(`updateHorse`, horse)
  },
  newHorse (horse) {
    console.log('service new rider', horse)
    // return Api().post(`newHorse`, horse)
  }
}
