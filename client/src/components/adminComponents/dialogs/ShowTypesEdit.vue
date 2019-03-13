<template>
<div id = 'editDDJModal'>
<!-- modal content -->
<md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
  <md-dialog-title>Edit Show Type</md-dialog-title>

  <md-dialog-content>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field label="Show Type" v-model="item.type" :rules="[rules.required, rules.counter]"></v-text-field>
    </v-form>
  </md-dialog-content>

  <md-dialog-actions>
    <v-btn v-if="dispSaveBtn" class="cyan" dark @click="editItem()">Save</v-btn>
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
import Service from '@/services/ShowTypesService'

export default {
  name: 'editDDJModal',
  props: {
    'index': Number,
    'item': Object
  },
  data () {
    return {
      dialog: false,
      valid: true,
      dispSaveBtn: true,
      copy: Object.assign({}, this.item), // shallow copy of the item
      rules: {
        required: value => !!value || 'This field is required.',
        counter: value => value.length <= 255 || 'Max 255 characters'
      }
    }
  },
  methods: {
    openDialog () {
      console.log('open', this.item)
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
      // console.log('close', this.item, this.copy)
      this.item.type = this.copy.type // restore the original name from the copy taken in data
      this.closeDialog()
    },
    async editItem () {
      // console.log('saving', this.item, this.$refs.form.validate())
      if (this.$refs.form.validate()) {
        let newInfo = {
          id: this.item.id,
          type: this.item.type
        }
        // console.log('edited', newInfo)
        this.closeDialog()
        await Service.updateShowType(newInfo)
        this.$emit('showTypeEdited', newInfo)
      }
    }
  },
  mounted () {
    // console.log('mount', this.$store.state.arrayMemberStatusOptions)
    this.dispSaveBtn = true
  },
  computed: {
    // this.$refs.form.validate()
    nameLength: function () {
      return this.item.type.length
    }
  },
  watch: {
    nameLength: function () {
      this.nameLength === 0 ? this.dispSaveBtn = false : this.dispSaveBtn = true
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
  /* div.btn__content {
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
  } */
</style>
