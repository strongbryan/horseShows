<template>
  <v-layout row >
    <v-flex>
      <div class="white elevation-2">
        <page-loading :loading="loading"></page-loading>
        <v-toolbar flat dense dark class="cyan">
          <v-toolbar-title>Shows</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field append-icon="search" label="Search" single-line hide-details v-model="showsSearch"></v-text-field>
          <v-toolbar-items>
            <v-btn flat dark @click="navigateTo({name: 'ShowsNew'})">New Show</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-data-table :headers="headers" :items="shows" class="elevation-1" :search="showsSearch">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left largerFont">{{ props.item.displaydate }}</td>
            <td class="text-xs-left largerFont">{{ props.item.showname }}</td>
            <td class="text-xs-right">
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
              <v-btn class="cyan" dark
                :to="{ name: 'ShowDivisions',
                params: {showId: props.item.id, showName: props.item.showname, showDate: props.item.displaydate} }">
                Divisions
              </v-btn>
              <v-btn class="cyan" dark
                :to="{ name: 'ShowResults',
                params: {showId: props.item.id, showName: props.item.showname, showDate: props.item.displaydate} }">
                Results
              </v-btn>
              <dialogShowEdit :item="props.item" :index="props.item.id" v-on:edit="editShow"></dialogShowEdit>
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ showsSearch }}" found no results.
          </v-alert>
        </v-data-table>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import ShowsService from '@/services/ShowsService'
import dialogShowEdit from '@/components/dialogs/ShowEdit'
import PageLoading from '@/components/globals/PageLoading'

export default {
  data () {
    return {
      shows: [],
      showsSearch: '',
      showShowsEdit: false,
      loading: true,
      pagination: {
        sortBy: 'name'
      },
      headers: [
        { value: 'displaydate', text: 'Show Date', align: 'left', sortable: false, width: '200', class: ['largerFont'] },
        { value: 'showname', text: 'Show Name', align: 'left', sortable: false },
        { value: '', text: 'Actions', align: 'Center', sortable: false }
      ]
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    editShow (show) {
      let recipe = {
        id: show.id,
        title: show.title,
        showDate: show.showdate
      }
      // console.log(recipe)
      this.$emit('editIt', recipe)
      // console.log('edit show', row)
      // this.$store.dispatch('setEditObject', row.show)
      // this.showShowsEdit = true
    },
    onShowUpdated (value) {
      // console.log('onShowUpdate', value)
      this.$store.dispatch('setEditObject', value)
      this.showShowsEdit = true
    }
  },
  async mounted () {
    // console.log(this.$store.state.showYear)
    this.shows = (await ShowsService.getShowsByYear({ reportingYear: this.$store.state.showYear })).data
    this.loading = false
    /* console.log(this.$route.params) */
  },
  components: {
    dialogShowEdit,
    PageLoading
  }
}
</script>

<style scoped>
  ul{
    list-style-type:none
  }
  .largerFont {
    font-size:16px;
  }
  #editmodal {
    width: 100px;
    float: right;
  }
</style>
