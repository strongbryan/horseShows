<template>
  <div>
    <panel title="Choose Year">
      <v-select :items="info" v-model="e1" label="Select Year" single-line=""
                hint="The selected year will be used." persistent-hint=""
                @change="changeYear"
        class="selectWidth"
      >
      </v-select>
    </panel>
  </div>
</template>

<script>
import ShowYearsService from '@/services/ShowYearsService'
import Panel from '@/components/globals/Panel'

export default {
  components: {
    Panel
  },
  data () {
    return {
      info: [],
      e1: {
        'text': this.$store.state.showYear,
        'value': this.$store.state.showYear
      }
    }
  },
  methods: {
    async changeYear (value) {
      this.$store.dispatch('setYear', value)
      await ShowYearsService.updateShowYear({year: value})
    }
  },
  async mounted () {
    this.info = (await ShowYearsService.getAllShowYears()).data
    /* for (var i = 0; i < this.info.length; i++) {
      console.log(this.info[i])
      console.log('from store', this.$store.state.showYear)
    } */
  }
}
</script>

<style scoped="">
  .selectWidth {width: 200px;}
</style>
