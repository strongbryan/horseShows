<template>
  <v-layout row="" >
    <v-flex>
      <div class="white elevation-2">
        <v-toolbar flat="" dense="" dark="" class="cyan">
          <v-toolbar-title>Declared Division Types</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field append-icon="search" label="Search" single-line="" hide-details="" v-model="search"></v-text-field>
          <v-toolbar-items>
            <v-btn flat="" dark="" @click="navigateTo({name: 'DivisionsNew'})">New Declared Division</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <dialogDeclaredDivisionEdit :visible="showDeclaredDivisionEdit" @declaredDivisionClose="showDeclaredDivisionEdit=false"
          @declaredDivisionEdited="onDeclaredDivisionUpdated" />
        <v-data-table :headers="headers" :items="divisions" class="elevation-1" :search="search">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left largerFont">{{ props.item.name }}</td>
            <td class="text-xs-right">
              <v-btn flat="" icon="" color="cyan" @click="edit({division: props.item})" small="">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-icon>delete</v-icon>
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
import DeclaredDivisionsService from '@/services/DeclaredDivisionsService'
import dialogDeclaredDivisionEdit from '@/components/adminComponents/dialogs/DeclaredDivisionEdit'

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
        { value: 'name', text: 'Divisions', align: 'left', sortable: false, width: '300', class: ['largerFont'] },
        { value: '', text: 'Actions', align: 'right', sortable: false, width: '200' }
      ]
    }
  },
  methods: {
    edit (row) {
      // console.log('edit', row)
      this.$store.dispatch('setEditObject', row.division)
      this.showDeclaredDivisionEdit = true
    },
    onDeclaredDivisionUpdated (value) {
      // console.log('test', value)
      let pos = this.divisions.map(function (e) { return e.id }).indexOf(value.id)
      this.divisions[pos].name = value.name
      this.$set(this.divisions[pos], 'name', value.name)
    }
  },
  async mounted () {
    this.divisions = (await DeclaredDivisionsService.getAllDeclaredDivisions({year: this.$store.state.showYear})).data
  },
  components: {
    dialogDeclaredDivisionEdit
  }
}
</script>

<style scoped="">
  .largerFont {
    font-size:16px;
  }
</style>
