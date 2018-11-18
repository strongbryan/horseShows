<template>
<div id = 'editHorseModal'>
<!-- modal content -->
<md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
  <md-dialog-title>Edit Horse</md-dialog-title>

  <md-dialog-content>
    <form>
      <v-text-field label="Horse's Name" v-model="item.name"></v-text-field>
    </form>
  </md-dialog-content>

  <md-dialog-actions>
    <v-btn class="cyan" dark @click="editItem()">Save</v-btn>
    <v-btn class="cyan" dark @click="cancel()">Cancel</v-btn>
  </md-dialog-actions>
</md-dialog>
<!-- end of modal content -->

<!-- dialog button -->
<v-btn flat icon color="cyan" @click="openDialog()"><v-icon>edit</v-icon></v-btn>
<!-- end of button -->
</div>
</template>

<script>
import HorsesService from '@/services/HorsesService'

export default {
  name: 'editHorseModal',
  props: {
    'index': Number,
    'item': Object
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    openDialog () {
      // console.log('open', this.item)
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    },
    onOpen () {
      console.log('Opened')
    },
    onClose (type) {
      console.log('Closed', type)
    },
    cancel () {
      // console.log('close')
      this.closeDialog()
    },
    async editItem () {
      // console.log('saving', this.item)
      let newInfo = {
        id: this.item.id,
        name: this.item.name
      }
      // console.log('edited', newInfo)
      this.closeDialog()
      this.$emit('horseEdited', newInfo)
      await HorsesService.updateHorse(newInfo)
    }
  },
  mounted () {
    // console.log(this.$store.state.arrayMemberStatusOptions)
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
  div.btn__content {
    padding: 0;
  }
  div.btn {
    min-width: 0;
  }
  div.v-btn {
    width: 10px;
  }
  .v-btn__content {
    margin: 0 5px;
  }
</style>
