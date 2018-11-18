import Api from '@/services/Api'

export default {
  getAllDeclaredDivisions (year) {
    return Api().get(`getAllDeclaredDivisions/${year.year}`)
  },
  updateDeclaredDivision (division) {
    return Api().post(`updateDeclaredDivision`, division)
  },
  getAllUnassignedDivisions (year, div) {
    // console.log('getAllUnassignedDivisions', year, div)
    return Api().get(`getAllUnassignedDivisions/${year.year}/${div.div}`)
  },
  assignDivision (params) {
    // console.log('assignDivision', params)
    return Api().post(`assignDivisionToDivisionType`, params)
  }
}
