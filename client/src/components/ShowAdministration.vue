<template>
  <v-card>
    <v-toolbar flat dense dark class="cyan">
      <v-toolbar-title>{{showDate}} | {{showName}} | Show Administration</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat dark @click="navigateTo({name: 'PairsNew'})">Add Pair</v-btn>
        <v-btn class="cyan" dark
          :to="{ name: 'ShowResults',
          params: {showId: this.showId, showName: this.showName, showDate: this.showDate} }">
          Results
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <page-loading :loading="loading"></page-loading>
    <div class="container">
      <ul>
        <li v-for="c in clone" :key="c.division">
          <span class="divHeader">
            {{c.divName}}
            (<span v-if = "c.hunter = 1">Hunter</span>
            <span v-else-if = "c.western = 1">Western</span>
            <span v-else>Jumpers</span>)
          </span>
          <div style="margin-left: 30px; width: 800px;">
            <v-data-table :items="c.classes" class="elevation-1" hide-actions hide-headers>
              <template slot="items" slot-scope="props">
                <td class="text-xs-left largerFont col1">({{props.item.displayClass}})</td>
                <td class="text-xs-left largerFont col2">{{props.item.class}}</td>
                <td class="text-xs-left largerFont col3">({{props.item.ct}})</td>
                <td class="text-xs-left largerFont col4">
                  <!-- <v-btn dark color="cyan" @click="check(props.item.classNumber)">
                    Class Results
                  </v-btn> -->
                  <v-btn class="cyan" dark
                    :to="{ name: 'ClassResults',
                    params: {classNumber: props.item.classNumber, showId: showId, showName: showName, showDate: showDate } }">
                    Class Results
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </div>
          <br/>
        </li>
      </ul>
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
      classes: [],
      showId: 0,
      showName: '',
      showDate: '',
      clone: [],
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
    this.showId = this.$route.params.showId
    this.showName = this.$route.params.showName
    this.showDate = this.$route.params.showDate
    this.classes = (await this.getClassesInShow({ showId: this.$route.params.showId })).data
    // console.log(this.classes)
    for (var i = 0; i < this.classes.length; i++) {
      this.groupQ(this.classes[i])
    }
    i = 0
    for (var j = 0; j < this.classes.length; j++) {
      if (this.classes[j].division !== this.clone[i].division) {
        i++
      }
      this.clone[i].classes.push(this.buildClassObject(this.classes[j]))
    }
    this.loading = false
    // console.log(this.clone)
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
    groupQ (div) {
      var found = this.clone.some(function (el) {
        return el.division === div.division
      })
      if (!found) {
        this.clone.push({division: div.division, divName: div.divName, hunter: div.hunter, jumpers: div.jumpers, western: div.western, classes: []})
      }
    },
    buildClassObject (classInfo) {
      // console.log(classInfo)
      return {
        classNumber: classInfo.classNumber,
        displayClass: classInfo.displayClass,
        class: classInfo.class,
        ct: classInfo.ct
      }
    },
    check (e) {
      // if (e.target.checked) {
      console.log('single check', e)
      // }
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
    /* border: 1px solid black; */
    margin-left: 0;
    text-align: left;
    /* width: 600px; */
  }
  .largerFont {
    font-size:16px;
  }
  .col1 {
    width: 50px;
    text-align: right;
    /* border: 1px solid blue; */
  }
  .col2 {
    width: 400px;
    text-align: right;
    /* border: 1px solid yellow; */
  }
  .col3 {
    width: 50px;
    text-align: center;
    /* border: 1px solid red; */
  }
  .col4 {
    width: 10px;
    text-align: center;
    /* border: 1px solid green; */
  }
</style>
