import Api from '@/services/Api'

export default {
  getParticipants (param) {
    // console.log('param', param)
    return Api().get(`getParticipants/${param.showId}/${param.classId}`)
  },
  getPlaces () {
    // console.log('getPlaces')
    return Api().get(`getPlaces`)
  } /*,
  getAvailableParticipants (showId) {
    // console.log('ShowId', showId)
    return Api().get(`getAvailableParticipants/${showId.showId}`)
  },
  getParticipantsInShow (showId) {
    // console.log('ShowId', showId)
    return Api().get(`getParticipantsInShow/${showId.showId}`)
  },
  getClassesInShow (showId) {
    // console.log('ShowId service', showId)
    return Api().get(`getClassesInShow/${showId.showId}`)
  },
  getDivisionsInShow (showId) {
    // console.log('ShowId service', showId)
    return Api().get(`getDivisionsAssignedToShow/${showId.showId}`)
  },
  getResults (params) {
    // console.log('ShowId service', params)
    return Api().get(`getResults/${params.showId}/${params.year}`)
  },
  getResultsClassPlaces (params) {
    // console.log('ShowId service', params)
    return Api().get(`getResultsClassPlaces/${params.showId}`)
  },
  getResultsDivisionsInShow (params) {
    // console.log('ShowId service', params)
    return Api().get(`getResultsDivisionsInShow/${params.showId}`)
  } */

}
