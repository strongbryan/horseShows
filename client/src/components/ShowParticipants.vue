<template>
  <v-card>
    <v-toolbar flat dense dark class="cyan">
      <v-toolbar-title>{{showDate}} | {{showName}} | Show Participants</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat dark @click="navigateTo({name: 'PairsNew'})">New Pair</v-btn>
        <v-btn class="cyan" dark
          :to="{ name: 'ShowAdministration',
          params: {showId: showId, showName: showName, showDate: showDate} }">
          Show Admin
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout row>
      <v-flex>
        <div class="white elevation-2">
          <v-toolbar flat dense light class="white">
            <v-toolbar-title>Available Pairs</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="availableSearch"></v-text-field>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn light @click="addSelected()">Add To Show</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-data-table :headers="showHeaders" :loading="notInShowLoading" :items="notInShow" class="elevation-1" :search="availableSearch">
            <v-progress-linear slot="progress" color="cyan" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <td class="text-xs-left largerFont">{{props.item.shownumber}}</td>
              <td class="text-xs-left largerFont">{{ props.item.rider }}</td>
              <td class="text-xs-left largerFont">{{ props.item.name }}</td>
              <td class="text-xs-left largerFont">
                <div style="display: flex;">
                  <v-checkbox color="cyan"
                    v-model="props.item.addToShow"
                    :id="'notIn'+props.item.shownumber"
                    @change="check(props.item.shownumber)">
                  </v-checkbox>
                  <v-btn flat icon color="cyan" @click="check(props.item.shownumber)">
                    <v-icon color="cyan">forward</v-icon>
                  </v-btn>
                </div>
              </td>
              <!-- <td class="text-xs-right">
                <v-btn class="cyan" dark
                  :to="{ name: 'ShowAdministration',
                  params: {showId: props.item.id, showName: props.item.showname, showDate: props.item.displaydate} }">
                  Show
                </v-btn>
                <v-btn class="cyan" dark
                  :to="{ name: 'ShowParticipants',
                  params: {showId: props.item.id, showName: props.item.showname, showDate: props.item.displaydate} }">
                  Participants
                </v-btn>
                <v-btn class="cyan" dark>Assign</v-btn>
              </td> -->
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ availableSearch }}" found no results.
            </v-alert>
          </v-data-table>
        </div>
      </v-flex>
      <v-flex>
        <div class="white elevation-2">
          <v-toolbar flat dense light class="white">
            <v-toolbar-title>Selected Pairs  ({{showParticipants.length}})</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="assignedSearch"></v-text-field>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn light @click="removeSelected()">Remove From Show</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-data-table :headers="showHeaders" :loading="showParticipantsLoading" :items="showParticipants" class="elevation-1" :search="assignedSearch">
            <v-progress-linear slot="progress" color="cyan" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <td class="text-xs-left largerFont">{{props.item.shownumber}}</td>
              <td class="text-xs-left largerFont">{{props.item.removeFromShow}}{{ props.item.rider }}</td>
              <td class="text-xs-left largerFont">{{ props.item.name }}</td>
              <td class="text-xs-left largerFont">
                <div style="display: flex">
                  <v-checkbox
                    color="cyan"
                    v-model="props.item.removeFromShow"
                    :id="'in'+props.item.shownumber"
                    @change="check(props.item.shownumber)"
                  >
                  </v-checkbox>
                  <v-btn flat icon color="cyan" @click="check(props.item.shownumber)">
                    <v-icon color="cyan">undo</v-icon>
                  </v-btn>
                </div>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ assignedSearch }}" found no results.
            </v-alert>
          </v-data-table>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import ShowsService from '@/services/ShowsService'

export default {
  data () {
    return {
      notInShow: [],
      notInShowLoading: true,
      showParticipants: [],
      showParticipantsLoading: true,
      showId: 0,
      showName: '',
      showDate: '',
      availableSearch: '',
      assignedSearch: '',
      showHeaders: [
        { value: 'shownumber', text: 'Show Number', align: 'left', sortable: false, width: '75', class: ['largerFont'] },
        { value: 'rider', text: 'Rider', align: 'left', sortable: false },
        { value: 'name', text: 'Horse', align: 'left', sortable: false },
        { value: '', text: 'Action', align: 'Center', width: '100', sortable: false }
      ]
    }
  },
  async mounted () {
    // console.log('params', this.$route.params)
    this.showId = this.$route.params.showId
    this.showName = this.$route.params.showName
    this.showDate = this.$route.params.showDate
    this.notInShow = (await this.getAvailableParticipants({ showId: this.$route.params.showId })).data
    this.notInShowLoading = false
    this.showParticipants = (await this.getParticipantsInShow({ showId: this.$route.params.showId })).data
    this.showParticipantsLoading = false
    // console.log(this.notInShow)
  },
  methods: {
    getAvailableParticipants (showId) {
      // console.log(showId)
      return ShowsService.getAvailableParticipants(showId)
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
    check (e) {
      // if (e.target.checked) {
      console.log('single check', e)
      // }
    },
    addSelected () {
      for (var i = 0; i < this.notInShow.length; i++) {
        if (this.notInShow[i].addToShow) {
          console.log(this.notInShow[i].shownumber)
        }
      }
    },
    removeSelected () {
      for (var i = 0; i < this.showParticipants.length; i++) {
        if (this.showParticipants[i].removeFromShow) {
          console.log(this.showParticipants[i].shownumber)
        }
      }
    }
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
  }
  .container {
    /* border: 1px solid black; */
    margin-left: 0;
    display: flex;
    text-align: left;
    /* width: 600px; */
  }
  .leftCol{
    /* border: 1px solid red; */
    width: 550px;
  }
  .rightCol{
    /* border: 1px solid blue; */
    flex-grow: 1;
  }
  p {
    font-weight: bold;
    font-size: 16px;
  }
</style>
