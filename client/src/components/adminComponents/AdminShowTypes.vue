<template>
  <v-layout row="" >
    <v-flex>
      <div class="elevation-2">
        <v-toolbar flat dense dark class="cyan">
          <v-toolbar-title>Show Types</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field append-icon="search" label="Search" single-line="" hide-details="" v-model="search" ></v-text-field>
          <v-toolbar-items>
            <dialogNew @showNew="onNew"></dialogNew>
          </v-toolbar-items>
        </v-toolbar>
        <v-data-table :headers="headers" :items="showTypes" class="elevation-1" :search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left largerFont">{{ props.item.type }}</td>
            <td class="text-xs-right">
              <dialogEdit :item="props.item" :index="props.item.id" @showTypeEdited="onShowTypeUpdated"></dialogEdit>
            </td>
            <td class="text-xs-right">
              <dialogDelete :message="{'message': 'Are you sure you want to delete this show type?', 'item': props.item}"
                :index="props.item.id" @showDelete="onDelete">
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
import Service from '@/services/ShowTypesService'
import dialogEdit from '@/components/adminComponents/dialogs/ShowTypesEdit'
import dialogDelete from '@/components/adminComponents/dialogs/ShowTypesDelete'
import dialogNew from '@/components/adminComponents/dialogs/ShowTypesNew'
export default {
  data () {
    return {
      showTypes: [],
      search: '',
      showShowTypeEdit: false,
      pagination: {
        sortBy: 'type'
      },
      headers: [
        { value: 'type', text: 'Show Types', align: 'left', sortable: false, width: '300', class: ['largerFont'] },
        { value: '', text: 'Actions', align: 'right', sortable: false, width: '1%' },
        { value: '', text: '', align: 'right', sortable: false, width: '1%' }
      ]
    }
  },
  methods: {
    edit (row) {
      // console.log('edit', row)
      this.$store.dispatch('setEditObject', row.showType)
      this.showShowTypeEdit = true
    },
    onShowTypeUpdated (value) {
      console.log('updated', value)
      let pos = this.showTypes.map(function (e) { return e.id }).indexOf(value.id)
      this.showTypes[pos].type = value.type
      this.$set(this.showTypes[pos], 'type', value.type)
    },
    async onNew () {
      this.showTypes = (await Service.getAllShowTypes({year: this.$store.state.showYear})).data
    },
    onDelete (index) {
      // console.log('onDelete', index)
      var pos = this.showTypes.map(function (e) { return e.id }).indexOf(index)
      this.showTypes.splice(pos, 1)
      this.search = ''
      this.$toasted.show('Show Type Deleted', {type: 'success'})
    }
  },
  async mounted () {
    this.showTypes = (await Service.getAllShowTypes({year: this.$store.state.showYear})).data
  },
  components: {
    dialogEdit, dialogNew, dialogDelete
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
