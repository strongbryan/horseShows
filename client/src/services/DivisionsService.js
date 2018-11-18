import Api from '@/services/Api'

export default {
  getAllDivisions () {
    return Api().get(`getAllDivisions`)
  },
  getAllDivisionsUntranslated (year) {
    return Api().get(`getAllDivisionsUntranslated/${year.year}`)
  },
  updateDivision (division) {
    return Api().post(`updateDivision`, division)
  }
}
