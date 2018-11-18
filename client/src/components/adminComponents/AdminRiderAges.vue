<template>
  <v-layout row="" >
    <v-flex>
      <div class="white elevation-2">
        <v-toolbar flat="" dense="" dark="" class="cyan">
          <v-toolbar-title>Rider Ages</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat="" dark="" @click="navigateTo({name: 'ShowTypesNew'})">New Rider Age</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <dialogRiderAgesEdit :visible="showRiderAgeEdit" @riderAgeClose="showRiderAgeEdit=false" @riderAgeEdited="onRiderAgeUpdated" />
        <v-data-table
          :headers="headers"
          :items="riderAges"
          hide-actions=""
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left largerFont">{{ props.item.age }}</td>
            <td class="text-xs-right">
              <v-btn flat="" icon="" color="cyan" @click="edit({riderAge: props.item})" small="">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-icon>delete</v-icon>
            </td>
          </template>
        </v-data-table>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import RiderAgesService from '@/services/RiderAgesService'
import dialogRiderAgesEdit from '@/components/adminComponents/dialogs/RiderAgesEdit'
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
        { value: '', text: 'Actions', align: 'right', sortable: false, width: '200' }
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
    }
  },
  async mounted () {
    this.riderAges = (await RiderAgesService.getAllRiderAges({year: this.$store.state.showYear})).data
  },
  components: {
    dialogRiderAgesEdit
  }
}
</script>

<style scoped>
</style>
