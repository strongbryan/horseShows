<template>
<div id = 'editModal'>
<!-- modal content -->
<md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
  <md-dialog-title>New Horse</md-dialog-title>

  <md-dialog-content>
    <p v-if="checkHorseExists">Sorry. This horse name is already in use.</p>
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
  name: 'editmodal',
  props: {
    'index': Number
  },
  data () {
    return {
      dialog: false,
      valid: true,
      checkHorseExists: false,
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
      this.checkHorseExists = false
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
        var horseExists = (await HorsesService.getOneHorse(newInfo)).data
        // console.log('new horse', horseExists.length)
        if (horseExists.length === 0) {
          this.closeDialog()
          await HorsesService.newHorse(newInfo)
          this.$emit('horseNew', newInfo)
        } else {
          this.checkHorseExists = true
        }
      }
    }
  },
  mounted () {
    // console.log(this.$store.state.arrayMemberStatusOptions)
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
