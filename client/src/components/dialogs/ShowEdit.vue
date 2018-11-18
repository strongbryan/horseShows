<template>
<div id = 'editmodal'>
<!-- modal content -->
<md-dialog :md-active.sync="showDialog" style="background-color: #ffffff;">
  <md-dialog-title>Edit Show</md-dialog-title>

  <md-dialog-content>
    <form>
      <v-text-field label="Show Title" v-model="item.showname"></v-text-field>
      <v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40"
        lazy transition="scale-transition" offset-y full-width min-width="290px">
        <v-text-field slot="activator" v-model="dateFormatted" label="Show Date"
          prepend-icon="event" @blur="date = parseDate(dateFormatted)"
        ></v-text-field>
        <v-date-picker v-model="date" @input="menu1 = false" ></v-date-picker>
        <!--v-date-picker v-model="date" @input="$refs.menu1.save(date)"></v-date-picker-->
      </v-menu>
    </form>
  </md-dialog-content>

  <md-dialog-actions>
    <v-btn class="cyan" dark @click="editItem()">Save</v-btn>
    <v-btn class="cyan" dark @click="cancel()">Cancel</v-btn>
  </md-dialog-actions>
</md-dialog>
<!-- end of modal content -->

<!-- dialog button -->
<v-btn class="cyan" dark @click="openDialog()">Edit</v-btn>
<!-- end of button -->
</div>
</template>

<script>
import ShowsService from '@/services/ShowsService'

export default {
  name: 'editmodal',
  props: {
    'index': Number,
    'item': Object
  },
  data () {
    return {
      title: this.item.title,
      copy: Object.assign({}, this.item),
      showDialog: false,
      menu1: false,
      date: this.item.showdate.substring(0, 10),
      dateFormatted: null
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  computed: {
    computedDateFormatted () {
      console.log('computedDate')
      return this.formatDate(this.date)
    }
  },
  methods: {
    openDialog () {
      // console.log('open', this.dateFormatted, this.item, this.date)
      this.dateFormatted = this.formatDate(this.date)
      this.showDialog = true
    },
    closeDialog () {
      this.showDialog = false
    },
    onOpen () {
      console.log('Opened')
    },
    onClose (type) {
      console.log('Closed', type)
    },
    cancel () {
      // console.log('close', this.copy, this.date)
      this.item.showname = this.copy.showname
      this.date = this.copy.showdate.substring(0, 10)
      this.closeDialog()
    },
    async editItem () {
      // console.log('saving', this.item.id, this.item.showname, this.date)
      this.item.displaydate = this.dateFormatted // Change the date that is displayed
      let newShow = {
        id: this.item.id,
        showname: this.item.showname,
        showdate: this.date
      }
      // console.log('editedShow', newShow)
      this.closeDialog()
      await ShowsService.updateShow(newShow)
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style>
  .md-dialog {
    max-width: 768px;
    width: 500px;
  }
  .md-dialog-actions {
    color: white;
  }
</style>
