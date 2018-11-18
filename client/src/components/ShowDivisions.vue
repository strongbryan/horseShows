<template>
  <div>
    <v-toolbar flat dense dark color="cyan" class="largerFont">
      {{showDate}} | {{showName}} | Show Administration
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn light @click="navigateTo({name: 'PairsNew'})">Check All Hunter Divs</v-btn>
      <v-btn light @click="navigateTo({name: 'PairsNew'})">Check All Western Divs</v-btn>
      <v-btn light @click="navigateTo({name: 'PairsNew'})">Check All Jumpers Divs</v-btn>
    </v-toolbar>
    <v-layout row>
      <v-flex>
        <v-data-table :headers="headers" :items="firstHalf" class="elevation-1 largerFont" hide-actions>
          <template slot="items" slot-scope="props">
            <td class="text-xs-left" style="font-size:16px;">{{ props.item.name }}</td>
            <td class="text-xs-left largerFont">
              <v-checkbox color="cyan" class="checkbox" v-model="props.item.inUse" @change="check(props.item.div_id)">
              </v-checkbox>
            </td>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex>
        <v-data-table :headers="headers" :items="secondHalf" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td class="text-xs-left" style="font-size:16px;">{{ props.item.name }}</td>
            <td class="text-xs-left largerFont">
              <v-checkbox color="cyan" class="checkbox" v-model="props.item.inUse" @change="check(props.item.div_id)">
              </v-checkbox>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
  <!-- <v-card>
    <div class="outer">
      <div class="left">
        <div v-for="div in firstHalf" :key="div.div_id">
          <div style="display: flex; text-align: left;">
             <v-checkbox color="cyan" :label="div.name" class="checkbox"></v-checkbox>
          </div>
        </div>
      </div>
      <div class="right">
        <div v-for="div in secondHalf" :key="div.div_id">
          <v-checkbox color="cyan" :label="div.name" class="checkbox"></v-checkbox>
        </div>
      </div>
    </div>
  </v-card> -->
</template>

<script>
import ShowsService from '@/services/ShowsService'

export default {
  data () {
    return {
      divisions: [],
      showId: 0,
      showName: '',
      showDate: '',
      headers: [
        { value: 'name', text: 'Division', align: 'left', sortable: false, width: '400', class: 'largerFont' },
        { value: 'inUse', text: 'In Show?', align: 'left', sortable: false }
      ]
    }
  },
  async mounted () {
    // console.log('params', this.$route.params.showId)
    this.showId = this.$route.params.showId
    this.showName = this.$route.params.showName
    this.showDate = this.$route.params.showDate
    this.divisions = (await ShowsService.getDivisionsInShow({ showId: this.$route.params.showId })).data
    // console.log(this.divisions)
  },
  methods: {
    check (e) {
      // if (e.target.checked) {
      console.log('single check', e)
      // }
    }
  },
  computed: {
    firstHalf: function () {
      var i = this.divisions.length / 2
      if (this.divisions.length % 2 === 1) i--
      return this.divisions.slice(0, i)
    },
    secondHalf: function () {
      var i = this.divisions.length / 2
      if (this.divisions.length % 2 === 1) i--
      return this.divisions.slice(i, this.divisions.length)
    }
  }
}
</script>

<style scoped>
  .outer {
    /* border: 1px solid yellowgreen; /**/
    font-size: 16px;
  }
  .left {
    border: 1px solid black; /**/
    width: 50%;
    text-align: left;
    padding-left: 350px;
  }
  .right {
    border: 1px solid red; /**/
    width: 400px;
    text-align: left;
    padding-left: 10px;
    left: 300px;
  }
  /* .checkbox {
    height: 20px;
    width: 20px;
  } */
  .largerFont {
    font-size: 16px;
  }
</style>
