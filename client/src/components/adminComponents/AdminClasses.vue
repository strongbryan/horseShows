<template>
  <v-layout row >
    <v-flex>
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan">
          <v-toolbar-title>Classes</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field append-icon="search" label="Search" single-line hide-details v-model="classesSearch"></v-text-field>
          <v-toolbar-items>
            <v-btn flat dark @click="navigateTo({name: 'ClassNew'})">New Class</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- <dialogClassesEdit :visible="showClassesEdit" @showClassesClose="showClassesEdit=false" @showClassesEdited="onClassUpdated" /> -->
        <v-data-table :headers="headers" :items="classes" :search="classesSearch" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left largerFont">{{ props.item.divName }}</td>
            <td class="text-xs-left largerFont">{{ props.item.class }}</td>
            <td class="text-xs-right">
              <dialogEdit :item="props.item" :index="props.item.id" @classEdited="onUpdated"></dialogEdit>
              <!-- <v-btn flat icon color="cyan" @click="edit({class: props.item})" small>
                <v-icon>edit</v-icon>
              </v-btn> -->
            </td>
            <td class="text-xs-right">
              <v-icon>delete</v-icon>
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ classesSearch }}" found no results.
          </v-alert>
        </v-data-table>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import ClassesService from '@/services/ClassesService'
import dialogEdit from '@/components/adminComponents/dialogs/ClassesEdit'

export default {
  data () {
    return {
      classes: [],
      classesSearch: '',
      showClassesEdit: false,
      pagination: {
        sortBy: 'name'
      },
      headers: [
        { value: 'class', text: 'Division', align: 'left', sortable: false, width: '400', class: ['largerFont'] },
        { value: 'class', text: 'Class Name', align: 'left', sortable: false, width: '300', class: ['largerFont'] },
        { value: '', text: 'Actions', align: 'right', sortable: false, width: '1%' },
        { value: '', text: '', align: 'right', sortable: false, width: '1%' }
      ]
    }
  },
  methods: {
    edit (row) {
      this.$store.dispatch('setEditObject', row.class)
      this.showClassesEdit = true
    },
    onUpdated (value) {
      let pos = this.classes.map(function (e) { return e.id }).indexOf(value.id)
      // console.log('test', this.classes[pos])
      this.classes[pos].class = value.class
      this.$set(this.classes[pos], 'class', value.class)
    }
  },
  async mounted () {
    this.classes = (await ClassesService.getAllClasses({year: this.$store.state.showYear})).data
    // console.log(this.classes)
  },
  components: {
    dialogEdit
  }
}
</script>

<style scoped>
  .largerFont {
    font-size:16px;
  }
</style>
