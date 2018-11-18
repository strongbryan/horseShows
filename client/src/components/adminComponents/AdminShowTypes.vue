<template>
  <v-layout row="" >
    <v-flex>
      <div class="white elevation-2">
        <v-toolbar flat="" dense="" dark="" class="cyan">
          <v-toolbar-title>Show Types</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat="" dark="" @click="navigateTo({name: 'ShowTypesNew'})">New Show Type</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <dialogShowTypeEdit :visible="showShowTypeEdit" @showTypeClose="showShowTypeEdit=false" @showTypeEdited="onShowTypeUpdated" />
        <v-data-table
          :headers="headers"
          :items="showTypes"
          hide-actions=""
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left largerFont">{{ props.item.type }}</td>
            <td class="text-xs-right">
              <v-btn flat="" icon="" color="cyan" @click="edit({showType: props.item})" small="">
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
import ShowTypesService from '@/services/ShowTypesService'
import dialogShowTypeEdit from '@/components/adminComponents/dialogs/ShowTypesEdit'
export default {
  data () {
    return {
      showTypes: [],
      showShowTypeEdit: false,
      pagination: {
        sortBy: 'type'
      },
      headers: [
        { value: 'type', text: 'Show Types', align: 'left', sortable: false, width: '300', class: ['largerFont'] },
        { value: '', text: 'Actions', align: 'right', sortable: false, width: '200' }
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
      // console.log('updated', value)
      let pos = this.showTypes.map(function (e) { return e.id }).indexOf(value.id)
      this.showTypes[pos].type = value.type
      this.$set(this.showTypes[pos], 'type', value.type)
    }
  },
  async mounted () {
    this.showTypes = (await ShowTypesService.getAllShowTypes({year: this.$store.state.showYear})).data
  },
  components: {
    dialogShowTypeEdit
  }
}
</script>

<style scoped>
</style>
