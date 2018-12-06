<template>
  <v-card>
    <v-toolbar flat dense dark class="cyan">
      <v-toolbar-title>Participants</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat dark>Add Horse</v-btn>
        <v-btn flat dark>Add Pairing</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div class="col1">
      <v-card-title>
        Riders
        <v-spacer></v-spacer>
        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="riderSearch"></v-text-field>
        <dialogRiderNew @riderNew="onRiderNew"></dialogRiderNew>
      </v-card-title>
      <v-data-table :headers="riderHeaders" :items="riders" :search="riderSearch">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left largerFont">{{ props.item.fullname }}</td>
          <td class="text-xs-right sm3 flex">
            <dialogRiderEdit :item="props.item" :index="props.item.id" @riderEdited="onRiderUpdated"></dialogRiderEdit>
            <dialogConfirm :message="{'message': 'Are you sure you want to delete this rider?', 'item': props.item}"
              :index="props.item.id" @riderDeleted="onRiderDeleted">
            </dialogConfirm>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ riderSearch }}" found no results.
        </v-alert>
      </v-data-table>
    </div>
    <div class="col2">
      <v-card-title>
        Horses
        <v-spacer></v-spacer>
        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="horseSearch"></v-text-field>
        <dialogHorseNew @horseNew="onHorseNew"></dialogHorseNew>
      </v-card-title>
      <v-data-table :headers="horsesHeaders" :items="horses" :search="horseSearch">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left largerFont">{{ props.item.name }}</td>
          <td class="text-xs-right sm3 flex">
            <dialogHorseEdit :item="props.item" :index="props.item.id" @horseEdited="onHorseUpdated"></dialogHorseEdit>
            <v-btn flat icon color="cyan" @click="deleteHorse({horse: props.item.id})" small>
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ horseSearch }}" found no results.
        </v-alert>
      </v-data-table>
    </div>
    <div class="col3">
      <v-card-title>
        Pairs
        <v-spacer></v-spacer>
        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="pairSearch"></v-text-field>
      </v-card-title>
      <v-data-table :headers="pairsHeaders" :items="pairs" :search="pairSearch" >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left largerFont">{{ props.item.shownumber }}</td>
          <td class="text-xs-left largerFont">{{ props.item.riderfullname }}</td>
          <td class="text-xs-left largerFont">{{ props.item.name }}</td>
          <td class="text-xs-right sm3 flex">
            <dialogPairEdit :item="props.item" :index="props.item.id" @pairEdited="onPairUpdated"></dialogPairEdit>
            <!-- <v-btn flat icon color="cyan" @click="editPair({pair: props.item.id})" small>
              <v-icon>edit</v-icon>
            </v-btn> -->
            <v-btn flat icon color="cyan" @click="deletePair({pair: props.item.id})" small>
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ riderSearch }}" found no results.
        </v-alert>
      </v-data-table>
    </div>
  </v-card>
</template>

<script>
import RidersService from '@/services/RidersService'
import HorsesService from '@/services/HorsesService'
import PairsService from '@/services/PairsService'
import dialogRiderEdit from '@/components/dialogs/RiderEdit'
import dialogRiderNew from '@/components/dialogs/RiderNew'
import dialogHorseEdit from '@/components/dialogs/HorseEdit'
import dialogHorseNew from '@/components/dialogs/HorseNew'
import dialogPairEdit from '@/components/dialogs/PairEdit'
import dialogConfirm from '@/components/dialogs/RiderDelete'

export default {
  data () {
    return {
      riderSearch: '',
      showRiderEdit: false,
      horseSearch: '',
      showHorseEdit: false,
      pairSearch: '',
      riders: [],
      horses: [],
      pairs: [],
      riderHeaders: [
        { text: 'Rider Name', align: 'left', sortable: false, class: ['largerFont'], value: 'fullname' },
        { text: '', align: 'Center', sortable: false, value: false }
      ],
      horsesHeaders: [
        { value: 'name', text: 'Horse Name', align: 'left', sortable: false, class: ['largerFont'] },
        { value: '', text: '', align: 'Center', sortable: false }
      ],
      pairsHeaders: [
        { value: 'shownumber', text: '#', align: 'left', sortable: false, class: ['largerFont'] },
        { value: 'riderfullname', text: 'Rider', align: 'left', sortable: false, class: ['largerFont'] },
        { value: 'name', text: 'Horse', align: 'left', sortable: false, class: ['largerFont'] },
        { value: '', text: '', align: 'Center', sortable: false }
      ],
      fname: ''
    }
  },
  components: {
    dialogRiderEdit, dialogRiderNew, dialogHorseEdit, dialogHorseNew, dialogPairEdit, dialogConfirm
  },
  methods: {
    addRider  () {
      console.log('add rider')
    },
    async onRiderNew () {
      console.log('after new rider')
      this.riderSearch = ''
      await this.getRiders()
    },
    onRiderUpdated (value) {
      // Change the appearance of the rider in the Riders column
      let pos = this.riders.map(function (e) { return e.id }).indexOf(value.id)
      this.$set(this.riders[pos], 'fname', value.fname)
      this.$set(this.riders[pos], 'lname', value.lname)
      this.$set(this.riders[pos], 'age', value.age)
      this.$set(this.riders[pos], 'cell', value.cell)
      this.$set(this.riders[pos], 'member', value.member)
      this.$set(this.riders[pos], 'fullname', value.lname + ', ' + value.fname)
      this.changePairsAfterEdit(this.pairs, 'rider', value.id, value.lname, value.fname)
    },
    deleteRider (rider) {
      console.log('delete rider', rider)
    },
    async onRiderDeleted () {
      console.log('after delete dialog closed')
      this.riderSearch = ''
      await this.getRiders()
    },
    onHorseNew () {
      console.log('after new horse')
    },
    onHorseUpdated (value) {
      // change the appearance of the horses name in the Horses column
      let pos = this.horses.map(function (e) { return e.id }).indexOf(value.id)
      this.$set(this.horses[pos], 'name', value.name)
      // change the appearance of the horse's name in the Pairs column
      this.changePairsAfterEdit(this.pairs, 'horse', value.id, value.name)
    },
    deleteHorse (pair) {
      console.log('delete pair', pair)
    },
    deletePair (horse) {
      console.log('delete horse', horse)
    },
    onPairUpdated (value) {
      // console.log('emit pair updated', value)
      // change the appearance of the horses name in the Horses column
      let pos = this.pairs.map(function (e) { return e.id }).indexOf(value.id)
      // console.log(pos)
      this.$set(this.pairs[pos], 'shownumber', value.showNumber)
      this.$set(this.pairs[pos], 'riderfullname', value.riderFullName)
      this.$set(this.pairs[pos], 'name', value.name)
      // change the appearance of the horse's name in the Pairs column
      this.changePairsAfterEdit(this.pairs, 'horse', value.id, value.name)
    },
    editPair (pair) {
      console.log('edit pair', pair)
    },
    changeData (rider) {
      console.log('after call')
    },
    changePairsAfterEdit (arr, target, id, lname, fname) {
      for (var i = 0; i < arr.length; i++) {
        if (target === 'rider') {
          if (parseInt(arr[i].rider) === parseInt(id)) {
            this.$set(arr[i], 'riderfullname', lname + ', ' + fname)
            this.$set(arr[i], 'fname', fname)
            this.$set(arr[i], 'lname', lname)
          }
        } else {
          if (parseInt(arr[i].horse) === parseInt(id)) {
            this.$set(arr[i], 'name', lname)
          }
        }
      }
    },
    async getRiders () {
      this.riders = (await RidersService.getAllRiders()).data
    },
    async getHorses () {
      this.horses = (await HorsesService.getAllHorses()).data
    },
    async getPairs () {
      this.pairs = (await PairsService.getAllPairs()).data
    }
  },
  mounted () {
    this.getRiders()
    this.getHorses()
    this.getPairs()
  }
}
</script>

<style scoped>
  .col1 {
    border:1px solid black; /* */
    text-align: left;
    width: 395px;
    float: left;
    margin-left: 0px;
  }
  .col2 {
    border:1px solid black; /* */
    text-align: left;
    width: 375px;
    float: left;
    margin-left: 0px;
  }
  .col3 {
    border:1px solid black; /* */
    text-align: left;
    width: 700px;
    float: left;
    margin-left: 0px;
  }
  .largerFont {
    font-size:14px;
  }
  .flex {
    display: flex;
  }
</style>
