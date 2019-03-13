<template>
<div id = 'edit'>
<!-- modal content -->
<md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
  <md-dialog-title>Edit Class</md-dialog-title>

  <md-dialog-content>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field label="Class Name" v-model="item.class" :rules="[rules.required, rules.counter]"></v-text-field>
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
import Service from '@/services/ClassesService'

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
      this.item.class = this.copy.class // restore the original name from the copy taken in data
      this.closeDialog()
    },
    async editItem () {
      // console.log('saving', this.item)
      if (this.$refs.form.validate()) {
        let newInfo = {
          id: this.item.id,
          class: this.item.class
        }
        // console.log('edited', newInfo)
        this.closeDialog()
        await Service.updateClass(newInfo)
        this.$emit('classEdited', newInfo)
      }
    }
  }
}
</script>

<style scoped="">
</style>
