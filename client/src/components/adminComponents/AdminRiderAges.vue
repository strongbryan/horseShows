<template>
  <v-layout row="" >
    <v-flex>
      <div class="white elevation-2">
        <v-toolbar flat="" dense="" dark="" class="cyan">
          <v-toolbar-title>Rider Ages</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <dialogAdd @RiderAgeNew="onNew"></dialogAdd>
          </v-toolbar-items>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="riderAges"
          hide-actions=""
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left largerFont">{{ props.item.age }}</td>
            <td class="text-xs-right">
              <dialogEdit :item="props.item" :index="props.item.id" @riderAgeEdited="onRiderAgeUpdated"></dialogEdit>
            </td>
            <td class="text-xs-right">
              <dialogDelete :message="{'message': 'Are you sure you want to delete this Rider Age?', 'item': props.item}"
                :index="props.item.id" @riderAgeDelete="onDelete">
              </dialogDelete>
            </td>
          </template>
        </v-data-table>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import RiderAgesService from '@/services/RiderAgesService'
import dialogAdd from '@/components/adminComponents/dialogs/RiderAgesAdd'
import dialogEdit from '@/components/adminComponents/dialogs/RiderAgesEdit'
import dialogDelete from '@/components/adminComponents/dialogs/RiderAgesDelete'
export default {
  data () {
    return {
      riderAges: [],
      showRiderAgeEdit: false,
      pagination: {
        sortBy: 'age'
      },
      headers: [
        { value: 'age', text: 'Rider Ages', align: 'left', sortable: false, width: '300', class: ['largerFont'] },
        { value: '', text: 'Actions', align: 'right', sortable: false, width: '1%' },
        { value: '', text: '', align: 'right', sortable: false, width: '1%' }
      ]
    }
  },
  methods: {
    edit (row) {
      // console.log('edit', row)
      this.$store.dispatch('setEditObject', row.riderAge)
      this.showRiderAgeEdit = true
    },
    onRiderAgeUpdated (value) {
      let pos = this.riderAges.map(function (e) { return e.id }).indexOf(value.id)
      this.riderAges[pos].age = value.age
      this.$set(this.riderAges[pos], 'age', value.age)
    },
    onDelete (value) {
      let pos = this.riderAges.map(function (e) { return e.id }).indexOf(value)
      this.riderAges.splice(pos, 1)
    },
    async onNew (value) {
      // console.log('main returned value', value)
      this.riderAges = (await RiderAgesService.getAllRiderAges({year: this.$store.state.showYear})).data
    }
  },
  async mounted () {
    this.riderAges = (await RiderAgesService.getAllRiderAges({year: this.$store.state.showYear})).data
  },
  components: {
    dialogAdd, dialogEdit, dialogDelete
  }
}
</script>

<style scoped>
</style>
