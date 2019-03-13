<template>
<div id = 'editmodal'>
<!-- modal content -->
<md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
  <md-dialog-title>New Rider Age</md-dialog-title>

  <md-dialog-content>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field label="Rider Age"
        v-model="item.age"
        :rules="[rules.required, rules.counter]"
        light
      ></v-text-field>
    </v-form>
  </md-dialog-content>

  <md-dialog-actions>
    <v-btn v-if="dispSaveBtn" class="cyan" dark @click="saveItem()">Save</v-btn>
    <v-btn class="cyan" dark @click="cancel()">Cancel</v-btn>
  </md-dialog-actions>
</md-dialog>
<!-- end of modal content -->

<!-- dialog button -->
<v-btn flat icon @click="openDialog()" title="Add a Rider Age"><v-icon>add</v-icon></v-btn>
<!-- end of button -->
</div>
</template>

<script>
// import Service from '@/services/DeclaredDivisionsJumpersService'
import Service from '@/services/RiderAgesService'

export default {
  name: 'editmodal',
  props: {
    'index': Number
  },
  data () {
    return {
      dialog: false,
      valid: true,
      dispSaveBtn: true,
      item: {
        id: 0,
        age: ''
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
      // console.log('open', this.item, this.dispSaveBtn)
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
    async saveItem () {
      // console.log('saving', this.item)
      if (this.$refs.form.validate()) {
        let newInfo = {
          id: this.item.id,
          age: this.item.age,
          year: this.$store.state.showYear
        }
        var exists = (await Service.getOneRiderAge(newInfo)).data
        if (exists.length === 0) {
          this.closeDialog()
          await Service.newRiderAge(newInfo)
          this.$emit('RiderAgeNew', newInfo)
        } else {
          this.$toasted.show('Rider Age already exists', {type: 'error'})
        }
      }
    }
  },
  computed: {
    // this.$refs.form.validate()
    nameLength: function () {
      return this.item.age.length
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
