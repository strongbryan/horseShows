import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Shows from '@/components/Shows'
import ShowAdministration from '@/components/ShowAdministration'
import ShowParticipants from '@/components/ShowParticipants'
import ShowDivisions from '@/components/ShowDivisions'
import ShowResults from '@/components/ShowResults'
import ShowsNew from '@/components/ShowsNew'
import Admin from '@/components/Admin'
import Participants from '@/components/Participants'
import OverallResults from '@/components/OverallResults'
import ClassResults from '@/components/ClassResults'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/shows',
      name: 'Shows',
      component: Shows
    },
    {
      path: '/showParticipants/:showId',
      name: 'ShowParticipants',
      component: ShowParticipants,
      props: true
    },
    {
      path: '/showDivisions/:showId',
      name: 'ShowDivisions',
      component: ShowDivisions,
      props: true
    },
    {
      path: '/showResults/:showId',
      name: 'ShowResults',
      component: ShowResults,
      props: true
    },
    {
      path: '/classResults', // /:classNumber
      name: 'ClassResults',
      component: ClassResults,
      props: true
    },
    {
      path: '/showAdministration/:showId',
      name: 'ShowAdministration',
      component: ShowAdministration,
      props: true
    },
    {
      path: '/showsNew',
      name: 'ShowsNew',
      component: ShowsNew
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/participants',
      name: 'Participants',
      component: Participants
    },
    {
      path: '/overallresults',
      name: 'OverallResults',
      component: OverallResults
    }
  ]
})
