<template>
  <v-card>
    <v-toolbar flat dense dark class="cyan">
      <v-toolbar-title>{{showDate}} | {{showName}} | Show Administration</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat dark @click="navigateTo({name: 'PairsNew'})">Combine Divisions</v-btn>
        <v-btn class="cyan" dark
          :to="{ name: 'ShowAdministration',
          params: {showId: this.showId, showName: this.showName, showDate: this.showDate} }">
          Show Admin
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <page-loading :loading="loading"></page-loading>
    <div class="container">
      <div class='row'>
        <div class='colShowNumber'><strong>Place</strong></div>
        <div class='colShowNumber'><strong>Show #</strong></div>
        <div class='colPoints'><strong>Points</strong></div>
        <div class='colClassResults'><strong>Ribbons</strong></div>
        <div class='colRider'><strong>Rider</strong></div>
        <div class='colHorse'><strong>Horse Name</strong></div>
      </div><br>
      <div v-for="(item, index) in divisions" :key="index"> <!-- :key="division-item-${index}" -->
        <p style="font-weight: bold">{{item.name}}</p>
        <div class='row' v-for="(i, index) in item.results" :key="index">
          <div class='colShowNumber'>{{i.place}}</div>
          <div class='colShowNumber'>{{i.showNumber}}</div>
          <div class="colPoints">{{i.points}}</div>
          <div class="colClassResults"><!-- {{i.classResults}} -->
            (
              <span v-for="(j, index) in i.classResults" :key="index" :title="j.title" class="cursor">{{j.result}} </span>
             )
          </div><!--  {{i.classResults}}-->
          <div class="colRider">{{i.rider}}</div>
          <div class="colHorse">{{i.horse}}</div>
        </div><br>
      </div>
    </div>
  </v-card>
</template>

<script>
import ShowsService from '@/services/ShowsService'
import PageLoading from '@/components/globals/PageLoading'

export default {
  components: {
    PageLoading
  },
  data () {
    return {
      rawDivisions: [],
      divisions: [],
      ind1: 0, // index for loops through data
      ind2: 0, // index for loops through data
      results: [], // Raw show results
      classResults: {},
      showId: 0,
      showName: '',
      showDate: '',
      ct: 1,
      loading: true,
      headers: [
        { value: 'classnumber', text: 'Class Number', align: 'center', sortable: false, width: '175', class: 'largerFont' },
        { value: 'class', text: 'Class Name', align: 'left', width: '300', sortable: false },
        { value: 'count', text: 'Count', align: 'center', width: '50', sortable: false },
        { value: '', text: 'Action', align: 'right', width: '50', sortable: false }
      ]
    }
  },
  async mounted () {
    // console.log('params', this.$route.params)
    console.clear()
    this.showId = this.$route.params.showId
    this.showName = this.$route.params.showName
    this.showDate = this.$route.params.showDate
    // get the results of the divisions for the show
    this.rawDivisions = (await ShowsService.getResultsDivisionsInShow({showId: this.showId})).data
    // get the results of all the classes for the show inside all the divisions
    this.classResults = (await ShowsService.getResultsClassPlaces({showId: this.showId})).data
    // group the raw divisions so they can be displayed correctly
    for (this.ind1 = 0; this.ind1 < this.rawDivisions.length; this.ind1++) {
      this.groupDivisions(this.rawDivisions[this.ind1])
    }
    // get the results of show
    this.results = (await ShowsService.getResults({showId: this.showId, year: this.$store.state.showYear})).data
    // loop through all the results
    for (this.ind1 = 0; this.ind1 < this.results.length; this.ind1++) { // ind1 is for looping in results
      // loop through all the divisions
      for (this.ind2 = 0; this.ind2 < this.divisions.length; this.ind2++) { // ind2 is for looping in divisions
        // find the division corresponding to the current result
        if (this.divisions[this.ind2].divId === this.results[this.ind1].divId) {
          break // stop when correct division is found
        }
      }
      // console.log(this.divisions)
      // console.log(this.classResults[0])
      // console.log('result', this.results[this.ind1])
      // put the class results inside the division part of the object so it can be displayed correctly
      var classResults = this.findClassResult(this.results[this.ind1].showNumber, this.results[this.ind1].divId)
      this.divisions[this.ind2].results.push({
        place: this.divisions[this.ind2].results.length + 1,
        horse: this.results[this.ind1].horse,
        points: this.results[this.ind1].points,
        rider: this.results[this.ind1].rider,
        showNumber: this.results[this.ind1].showNumber,
        classResults: classResults
      })
    }
    // console.log(this.divisions)
    this.loading = false
  },
  methods: {
    getClassesInShow (showId) {
      // console.log('showiD', showId)
      return ShowsService.getClassesInShow(showId)
    },
    getParticipantsInShow (showId) {
      return ShowsService.getParticipantsInShow(showId)
    },
    addParticipant (shownumber) {
      console.log('Add to show', shownumber)
    },
    removeFromShow (shownumber) {
      console.log('remove from show', shownumber)
    },
    groupDivisions (item) {
      var i = 0
      for (i = 0; i < this.divisions.length; i++) {
        if (item.name === this.divisions[i].name) {
          this.divisions[i].classes.push({classes_id: item.classes_id})
          return
        }
      }
      this.divisions.push({
        name: item.name,
        divId: item.divId,
        classes: [{classes_id: item.classes_id}],
        results: []
      })
    },
    findClassResult (showNumber, divId) {
      var res = []
      // debugger
      for (var i = 0; i < this.classResults.length; i++) {
        if (this.classResults[i].shownumber === showNumber && this.classResults[i].division === divId) {
          res.push({
            title: this.classResults[i].class,
            result: this.classResults[i].result
          })
        }
      }
      return res
    }
  },
  computed: {

  }
}
</script>

<style scoped>
  .container {
    /* border: 1px solid black; */
    margin-left: 0;
    text-align: left;
    /* width: 600px; */
  }
  .largerFont {
    font-size:16px;
  }
  .row {
    margin-left: 40px;
    /*border: 1px solid black;*/
  }
  .colShowNumber {
    width: 50px;
    display: inline-block;
    text-align: center;
    /*border: 1px solid black;*/
  }
  .colPoints {
    width: 50px;
    text-align:center;
    display: inline-block;
    /*border: 1px solid black;*/
  }
  .colRider {
    width: 250px;
    display: inline-block;
    /*border: 1px solid black;*/
  }
  .colHorse {
    width: 300px;
    display: inline-block;
    /*border: 1px solid black;*/
  }
  .colClassResults {
    width: 70px;
    display: inline-block;
  }
  .cursor {
    cursor: context-menu;
  }
</style>
