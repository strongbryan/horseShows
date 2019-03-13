<template>
<div id = 'deleteDDJmodal'>
<!-- modal content -->
<md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
  <md-dialog-title>{{message.item.division}}<br><br>{{message.message}}</md-dialog-title>

  <md-dialog-content></md-dialog-content>

  <md-dialog-actions>
    <v-btn v-if="dispSaveBtn" class="cyan" dark @click="deleteDiv()">Delete</v-btn>
    <v-btn class="cyan" dark @click="cancel()">Cancel</v-btn>
  </md-dialog-actions>
</md-dialog>
<!-- end of modal content -->

<!-- dialog button -->
<v-btn flat icon color="cyan" @click="openDialog()" title="Delete this Pairing"><v-icon>delete</v-icon></v-btn>
<!-- end of button -->
</div>
</template>

<script>
import declaredDivService from '@/services/DeclaredDivisionsJumpersService'

export default {
  name: 'deleteDDJmodal',
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
      var inUse = (await declaredDivService.getPairsUsingJumperDivisionType({id: this.index})).data
      // console.log('inUse', inUse)
      if (inUse.length > 0) { // allow delete
        this.dispSaveBtn = false
        this.message.message = 'Cannot delete this Declared Division Type. It has been used by a pairing.'
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
    async deleteDiv () {
      // console.log('deleting', this.index)
      this.closeDialog()
      // await
      declaredDivService.deleteDivision({id: this.index})
      this.$emit('divJumperDeleted', this.index)
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
</style>
