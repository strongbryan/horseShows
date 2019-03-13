<template>
<div id = 'edit'>
<!-- modal content -->
<md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
  <md-dialog-title>Edit Rider Ages</md-dialog-title>

  <md-dialog-content>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field label="Rider Age" v-model="item.age" :rules="[rules.required, rules.counter]"></v-text-field>
    </v-form>
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
import RiderAgesService from '@/services/RiderAgesService'

export default {
  name: 'edit',
  props: {
    'index': Number,
    'item': Object
  },
  data () {
    return {
      dialog: false,
      valid: true,
      copy: Object.assign({}, this.item), // shallow copy of the item
      rules: {
        required: value => !!value || 'This field is required.',
        counter: value => value.length <= 255 || 'Max 255 characters'
      }
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
      this.item.age = this.copy.age // restore the original name from the copy taken in data
      this.closeDialog()
    },
    async editItem () {
      // console.log('saving', this.item)
      if (this.$refs.form.validate()) {
        let newInfo = {
          id: this.item.id,
          age: this.item.age
        }
        // console.log('edited', newInfo)
        this.closeDialog()
        await RiderAgesService.updateRiderAge(newInfo)
        this.$emit('riderAgeEdited', newInfo)
      }
    }
  }
}
</script>

<style scoped="">
</style>
