<template>
  <v-layout row="" >
    <v-flex>
      <div class="elevation-2">
        <v-toolbar flat dense dark class="cyan">
          <v-toolbar-title>Declared Jumper Division Types</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field append-icon="search" label="Search" single-line="" hide-details="" v-model="search" ></v-text-field>
          <v-toolbar-items>
            <dialogNew @divisionNew="onDivisionNew"></dialogNew>
          </v-toolbar-items>
        </v-toolbar>
        <v-data-table :headers="headers" :items="divisions" class="elevation-1" :search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left largerFont">{{ props.item.division }}</td>
            <td class="text-xs-right">
              <dialogEdit :item="props.item" :index="props.item.id" @divJumperEdited="onDivJumperUpdated"></dialogEdit>
            </td>
            <td class="text-xs-right">
              <dialogDelete :message="{'message': 'Are you sure you want to delete this division type?', 'item': props.item}"
                :index="props.item.id" @divJumperDeleted="onDivJumperDeleted">
              </dialogDelete>
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Service from '@/services/DeclaredDivisionsJumpersService'
import dialogEdit from '@/components/adminComponents/dialogs/DeclaredDivJumperEdit'
import dialogDelete from '@/components/adminComponents/dialogs/DeclaredDivJumperDelete'
import dialogNew from '@/components/adminComponents/dialogs/DeclaredDivJumperNew'

export default {
  data () {
    return {
      divisions: [],
      search: '',
      showDeclaredDivisionEdit: false,
      pagination: {
        sortBy: 'name'
      },
      headers: [
        { value: 'division', text: 'Divisions', align: 'left', sortable: false, width: '300', class: ['largerFont'] },
        { value: '', text: 'Actions', align: 'right', sortable: false, width: '1%' },
        { value: '', text: '', align: 'right', sortable: false, width: '1%' }
      ]
    }
  },
  methods: {
    edit (row) {
      // console.log('edit', row)
      this.$store.dispatch('setEditObject', row.division)
      this.showDeclaredDivisionEdit = true
    },
    async onDivisionNew () {
      // console.log('onDivisionNew')
      this.divisions = (await Service.getAllDeclaredJumpersDivisions({year: this.$store.state.showYear})).data
      this.$toasted.show('Deivision Added', {type: 'success'})
    },
    onDivJumperUpdated (value) {
      // console.log('onDivJumperUpdated', value)
      let pos = this.divisions.map(function (e) { return e.id }).indexOf(value.id)
      this.divisions[pos].name = value.name
      this.$set(this.divisions[pos], 'name', value.name)
    },
    onDivJumperDeleted (index) {
      // console.log(index)
      var pos = this.divisions.map(function (e) { return e.id }).indexOf(index)
      this.divisions.splice(pos, 1)
      this.divisionsSearch = ''
      this.$toasted.show('Deivision Deleted', {type: 'success'})
    }
  },
  async mounted () {
    this.divisions = (await Service.getAllDeclaredJumpersDivisions({year: this.$store.state.showYear})).data
  },
  components: {
    dialogEdit,
    dialogDelete,
    dialogNew
  }
}
</script>

<style scoped>
  .largerFont {
    font-size:16px;
  }
  table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child) {
    padding: 0 10px
  }
</style>
