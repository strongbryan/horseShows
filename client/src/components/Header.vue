<template>
  <v-toolbar dark fixed class="cyan">
    <v-toolbar-title class="mr-4">
      {{this.$store.state.showYear}} {{info.association}}
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat dark :to="{ name: 'Shows'}">Shows</v-btn>
      <v-btn flat dark :to="{ name: 'Participants'}">Participants</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat dark :to="{ name: 'Admin'}">Admin</v-btn>
      <v-btn flat dark :to="{ name: 'OverallResults'}">Overall Results</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import PageHeaderService from '@/services/PageHeaderService'

export default {
  data () {
    return {
      info: [],
      showTypes: [],
      riderAges: []
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    this.info = (await PageHeaderService.getInfo()).data[0]
    this.$store.dispatch('setYear', this.info.reportingYear)

    this.$router.push({ name: 'HelloWorld' }) // This will push the user to Shows when the page is reloaded AFTER the showYear has been pushed into the store
  }
}

</script>

<style scoped>
</style>
