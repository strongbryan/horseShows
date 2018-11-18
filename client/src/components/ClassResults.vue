
<template>
  <v-card>
    <v-toolbar flat dense dark class="cyan">
      <v-toolbar-title>{{showDate}} | {{showName}} | Class Results</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn class="cyan" dark
          :to="{ name: 'ShowAdministration',
          params: {showId: showId, showName: showName, showDate: showDate} }">
          Return
        </v-btn>
        <v-btn flat dark @click="navigateTo({name: 'PairsNew'})">Add Pair</v-btn>
        <v-btn class="cyan" dark
          :to="{ name: 'ShowResults',
          params: {showId: this.showId, showName: this.showName, showDate: this.showDate} }">
          Results
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <page-loading :loading="loading"></page-loading>
    <h1 class="left" v-html="dspClassName"></h1>
    <div class="container">
      <div class='colDelete header'>Ct.</div><!-- counter -->
      <div class='colDelete header'>Delete</div>
      <div class='colShowNumber header'>Show #</div>
      <div class='colResult header'>Result</div>
      <div class='colRider header'>Rider</div>
      <div class='colHorse header'>Horse</div>
      <div class='colComment header'>Comment</div>
    </div>
    <template v-if="classes.length > 0">
      <div v-for="(item, index) in classes" :key="index">
        <div class='colDelete'>{{index+1}}.</div>
        <div class='colDelete'>
          &nbsp;
          <!-- <a onClick="deletePair(#participants.id#);" style="cursor:pointer;" class="dontprint"><i class="glyphicon glyphicon-trash" style="cursor:pointer;" title='Delete This Pair'></i></a> -->
        </div>
        <div class='colShowNumber'>{{item.shownumber}}</div>
        <div class='colResult'>
          <!-- <v-select v-model="item.result" :items="places" item-text="id" item-value="id" :chips=true :height=40 :dense=true></v-select> -->
          <select v-model="item.result" @change="changeResult(item.id, index)" style="border: 1px solid black; text-align: center; padding: 0 2px;">
            <option value="0">Select one</option>
            <option v-for="place in places" v-bind:value="place.id" :key="place.id">{{place.id}}</option>
          </select>
        </div>
        <div class='colRider'>{{item.fname}} {{item.lname}}</div>
        <div class='colHorse'>{{item.name}}</div>
        <div class='colComment dontprint'><input type="text" v-model="item.comments" @change="changeComment(item.id, index)" value="item.comments" size="45" placeholder="Enter your comment" /></div>
      </div>
    </template>
    <template v-else>
      <p class="textRed">No Participants Found</p>
    </template>
    <br>
    <v-btn color="cyan" dark @click="changeShow(prevIndex)">Previous Class</v-btn>
    <v-btn color="cyan" dark @click="changeShow(nextIndex)">Next Class</v-btn>
    <div class="classWidth" style=""> &nbsp;
      <a v-for="c in classList" :key="c.id" @click="changeShow(c.classNumber)" v-bind:class="{ textRed: c.classNumber == classNumber}" v-bind:title="c.class">
        <span v-if="c.classNumber == classNumber">[</span>
         {{c.displayClass}}
         <span v-if="c.classNumber == classNumber">]</span></a>&nbsp;
    </div>
  </v-card>
</template>

<script>
import ShowClassesService from '@/services/ShowClassesService'
import ShowsService from '@/services/ShowsService'
import PageLoading from '@/components/globals/PageLoading'

export default {
  components: {
    PageLoading
  },
  data () {
    return {
      classes: [],
      classList: [], // used for navigating to other classes
      places: [],
      showId: 0,
      showName: '',
      showDate: '',
      classNumber: '',
      nextClass: 0,
      previousClass: 0,
      classIndex: 0,
      prevIndex: 0,
      nextIndex: 0,
      dspClassName: '',
      loading: true,
      headers: [
        { value: 'Ct', text: 'Ct.', align: 'center', sortable: false, width: '175', class: 'largerFont' },
        { value: 'class', text: 'Class Name', align: 'left', width: '300', sortable: false },
        { value: 'count', text: 'Count', align: 'center', width: '50', sortable: false },
        { value: '', text: 'Action', align: 'right', width: '50', sortable: false }
      ]
    }
  },
  async mounted () {
    // console.log('params', this.$route.params)
    this.showId = this.$route.params.showId
    this.showName = this.$route.params.showName
    this.showDate = this.$route.params.showDate
    this.classNumber = this.$route.params.classNumber
    this.classes = (await this.getClasses({ showId: this.$route.params.showId, classId: this.$route.params.classNumber })).data
    this.classList = (await this.getClassesInShow({ showId: this.$route.params.showId })).data
    this.classIndex = this.findClassInArray(this.classNumber)
    this.dspClassName = 'Results for &mdash; ' + this.classList[this.classIndex].class
    this.places = (await ShowClassesService.getPlaces()).data
    this.loading = false
  },
  methods: {
    getClasses (params) {
      // console.log('showiD', showId)
      return ShowClassesService.getParticipants(params)
    },
    getClassesInShow (showId) {
      // console.log('showiD', showId)
      return ShowsService.getClassesInShow(showId)
    },
    async changeShow (classId) {
      this.classes = []
      this.dspClassName = ''
      this.loading = true
      this.classNumber = classId
      this.classes = (await this.getClasses({ showId: this.$route.params.showId, classId: this.classNumber })).data
      console.log(this.classes)
      // this.classList = (await this.getClassesInShow({ showId: this.$route.params.showId })).data
      // console.log(this.classList)
      this.classIndex = this.findClassInArray(this.classNumber)
      this.dspClassName = 'Results for &mdash; ' + this.classList[this.classIndex].class
      this.loading = false
    },
    changeResult (r, index) {
      console.log('change result', r, index, this.classes[index])
    },
    changeComment (r, index) {
      console.log('changeComment', r, index, this.classes[index])
    },
    addParticipant (shownumber) {
      console.log('Add to show', shownumber)
    },
    removeFromShow (shownumber) {
      console.log('remove from show', shownumber)
    },
    groupQ (div) {
      var found = this.clone.some(function (el) {
        return el.division === div.division
      })
      if (!found) {
        this.clone.push({division: div.division, divName: div.divName, hunter: div.hunter, jumpers: div.jumpers, western: div.western, classes: []})
      }
    },
    findClassInArray (classNumber) {
      var index = 0
      while (classNumber !== this.classList[index].classNumber) index++
      this.prevIndex = index - 1
      this.nextIndex = index + 1
      if (this.prevIndex < 0) this.prevIndex = this.classList.length - 1
      if (this.nextIndex >= this.classList.length) this.nextIndex = 0
      this.prevIndex = this.classList[this.prevIndex].classNumber
      this.nextIndex = this.classList[this.nextIndex].classNumber
      return index
    }
  },
  computed: {

  }
}
</script>

<style scoped>
  ul {
    list-style: none;
  }
  .divHeader {
    font-size: 18px;
    font-weight: bold;
  }
  .container {
    /* border: 1px solid black; /* */
    width: 1300px;
    text-align: left
    /* width: 600px; */
  }
  .outline {
    border: 1px solid black;
  }
  .largerFont {
    font-size:16px;
  }
  .colDelete {
    width: 50px;
    display: inline-block;
    text-align: center;
    /* border: 1px solid black;/**/
  }
  .colShowNumber {
    width: 100px;
    display: inline-block;
    /* border: 1px solid black;/**/
  }
  .colRider {
    width: 200px;
    display: inline-block;
    margin-left: 10px;
    text-align: left;
    /* border: 1px solid black;/**/
  }
  .colHorse {
    width: 200px;
    display: inline-block;
    text-align: left;
    /* border: 1px solid black;/**/
  }
  .colResult {
    width: 100px;
    display: inline-block;
    /* border: 1px solid black;/**/
  }
  .colComment {
    width: 400px;
    display: inline-block;
    /* border: 1px solid black;/**/
  }
  .header {
    font-weight: bold;
    text-align: center;/**/
  }
  .inputWidth {
    width: 300px;
  }
  .classWidth {
    margin: 20px auto;
    padding: 10px 0 10px 0;
    width: 1200px;
    text-align: center;
    border-top: 1px solid black;
  }
  .textRed {
    color: red;
    font-size: 17px;
  }
  .left {
    text-align: left;
    padding: 0 0 10px 10px;
    width: 100%;
    /* border: 1px solid black;/**/
  }
</style>
