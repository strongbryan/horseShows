import Api from '@/services/Api'

export default {
  getAllDeclaredJumpersDivisions (year) {
    // console.log('1', year)
    return Api().get(`getAllDeclaredJumperDivisions/${year.year}`)
  },
  updateDeclaredJumpersDivision (division) {
    return Api().post(`updateDeclaredJumperDivision`, division)
  },
  getOneDivision (division) {
    //  console.log('service get one division', division)
    return Api().get(`getOneJumperDivisionType/${division.division}/${division.year}`)
  },
  getAllUnassignedJumpersDivisions (year, div) {
    // console.log('getAllUnassignedDivisions', year, div)
    return Api().get(`getAllUnassignedJumperDivisions/${year.year}/${div.div}`)
  },
  assignJumpersDivision (params) {
    // console.log('assignDivision', params)
    return Api().post(`assignDivisionToJumperDivisionType`, params)
  },
  //
  getPairsUsingJumperDivisionType (id) {
    // console.log('1', year)
    return Api().get(`getPairsUsingJumperDivisionType/${id.id}`)
  },
  newJumperDivisionType (newDivision) {
    // console.log('new division', newDivision)
    return Api().post(`newJumperDivisionType`, newDivision)
  },
  deleteDivision (params) {
    // console.log('deleteDivision service', params)
    return Api().delete(`deleteDivisionJumperDivisionType/${params.id}`)
  }
}
