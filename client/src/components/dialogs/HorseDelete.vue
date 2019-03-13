<template>
<div id = 'editmodal'>
<!-- modal content -->
<md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
  <md-dialog-title>{{message.item.name}}<br><br>{{message.message}}</md-dialog-title>

  <md-dialog-content></md-dialog-content>

  <md-dialog-actions>
    <v-btn v-if="dispSaveBtn" class="cyan" dark @click="deleteRider()">Delete</v-btn>
    <v-btn class="cyan" dark @click="cancel()">Cancel</v-btn>
  </md-dialog-actions>
</md-dialog>
<!-- end of modal content -->

<!-- dialog button -->
<v-btn flat icon color="cyan" @click="openDialog()" title="Delete this horse"><v-icon>delete</v-icon></v-btn>
<!-- end of button -->
</div>
</template>

<script>
import HorsesService from '@/services/HorsesService'

export default {
  name: 'editmodal',
  props: {
    'index': Number,
    'message': Object
  },
  data () {
    return {
      dialog: false,
      valid: true,
      dispSaveBtn: true,
      rules: {
        required: value => !!value || 'This field is required.',
        cell: value => !value || value.length === 12 || 'Not a valid phone number',
        counter: value => value.length <= 255 || 'Max 255 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    async openDialog () {
      // console.log('open', this.message, this.index)
      var pairs = (await HorsesService.getPairedHorse({id: this.index})).data
      var inShows = (await HorsesService.getHorseInShow({id: this.index})).data
      // console.log(pairs.length, pairs)
      // console.log(inShows.length, inShows)
      if (pairs.length > 0 || inShows.length > 0) { // allow delete
        this.dispSaveBtn = false
        this.message.message = 'This horse cannot be deleted: Paired with a rider or has been in a show.'
      }
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
    async deleteRider () {
      // console.log('saving', this.item.cell)
      // console.log('Rider Delete')
      this.closeDialog()
      await HorsesService.deleteHorse({id: this.index})
      this.$emit('horseDeleted', this.index)
    }
  },
  computed: {
  },
  mounted () {
    this.dispSaveBtn = true
  }
}
</script>

<style scoped="">
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
  .selct {
    border: 1px solid black;
    text-align: center;
    padding: 0 2px;
    margin-top: 10px;
  }
  .select1 {
    top: 245px !important;
  }
  .select2 {
    top: 300px !important;
  }
</style>
