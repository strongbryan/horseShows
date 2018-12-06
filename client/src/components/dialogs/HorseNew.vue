<template>
<div id = 'editModal'>
<!-- modal content -->
<md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
  <md-dialog-title>New Horse</md-dialog-title>

  <md-dialog-content>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field label="Horse's Name" v-model="item.name" :rules="[rules.required, rules.counter]"></v-text-field>
    </v-form>
  </md-dialog-content>

  <md-dialog-actions>
    <v-btn class="cyan" dark @click="editItem()">Save</v-btn>
    <v-btn class="cyan" dark @click="cancel()">Cancel</v-btn>
  </md-dialog-actions>
</md-dialog>
<!-- end of modal content -->

<!-- dialog button -->
<v-btn flat icon color="cyan" @click="openDialog()"><v-icon>add</v-icon></v-btn>
<!-- end of button -->
</div>
</template>

<script>
import HorsesService from '@/services/HorsesService'

export default {
  name: 'editModal',
  props: {
    'index': Number
  },
  data () {
    return {
      dialog: false,
      valid: true,
      item: {},
      rules: {
        required: value => !!value || 'This field is required.',
        counter: value => value.length <= 255 || 'Max 255 characters'
      }
    }
  },
  methods: {
    openDialog () {
      // console.log('open', this.item)
      this.item = {
        id: 0,
        name: ''
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
      // console.log('saving', this.item)
      if (this.$refs.form.validate()) {
        let newInfo = {
          id: this.item.id,
          name: this.item.name
        }
        console.log('edited', newInfo)
        // this.closeDialog()
        // this.$emit('horseNew', newInfo)
        await HorsesService.newHorse(newInfo)
      }
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
