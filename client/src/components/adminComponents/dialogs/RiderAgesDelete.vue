<template>
<div id = 'editmodal'>
<!-- modal content -->
<md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
  <md-dialog-title>{{message.item.age}}<br><br>{{message.message}}</md-dialog-title>

  <md-dialog-content></md-dialog-content>

  <md-dialog-actions>
    <v-btn v-if="dispSaveBtn" class="cyan" dark @click="editItem()">Delete</v-btn>
    <v-btn class="cyan" dark @click="cancel()">Cancel</v-btn>
  </md-dialog-actions>
</md-dialog>
<!-- end of modal content -->

<!-- dialog button -->
<v-btn flat icon color="cyan" @click="openDialog()" title="Delete this Rider Age"><v-icon>delete</v-icon></v-btn>
<!-- end of button -->
</div>
</template>

<script>
import Service from '@/services/RiderAgesService'

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
      item: {
        id: 0,
        type: ''
      },
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
    openDialog () {
      // console.log('open', this.index, this.item, this.dispSaveBtn)
      this.checkHorseExists = false
      this.item = {
        id: 0,
        age: ''
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
    async editItem () {
      // console.log('deleting', this.index)
      this.closeDialog()
      await Service.deleteRiderAge({id: this.index})
      this.$emit('riderAgeDelete', this.index)
    }
  },
  computed: {
    // this.$refs.form.validate()
    nameLength: function () {
      return this.message.item.age.length
    }
  },
  watch: {
    nameLength: function () {
      this.nameLength === 0 ? this.dispSaveBtn = false : this.dispSaveBtn = true
    }
  },
  mounted () {
    this.dispSaveBtn = true
    this.item = {
      id: 0,
      age: ''
    }
    // console.log(this.$store.state.arrayMemberStatusOptions)
  }
}
</script>

<style scoped="">
  .md-dialog {
    max-width: 768px;
    width: 500px;
  }
</style>
