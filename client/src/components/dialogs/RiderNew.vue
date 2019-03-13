<template>
<div id = 'editmodal'>
<!-- modal content -->
<md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
  <md-dialog-title>New Rider</md-dialog-title>

  <md-dialog-content>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field label="First Name" v-model="item.fname" type="text" name="fname" :rules="[rules.required, rules.counter]"></v-text-field>
      <v-text-field label="Last Name" v-model="item.lname" :rules="[rules.required, rules.counter]"></v-text-field>
      <v-autocomplete
        ref="item.age"
        :rules="[rules.required]"
        :items="this.$store.state.arrayMemberStatusOptions"
        v-model="item.age"
        label="Age"
        placeholder="Select..."
        :menu-props="{contentClass: 'select1'}"
        required
      ></v-autocomplete>
      <v-text-field label="Cell Number" v-model="item.cell" mask="###-###-####" return-masked-value :rules="[rules.cell]"></v-text-field><!-- :rules="[() => !!item.cell || 'This field is required']" -->
      <v-autocomplete
        ref="item.member"
        :rules="[rules.required]"
        :items="this.$store.state.arrayMemberOptions"
        v-model="item.member"
        label="Member"
        placeholder="Select..."
        :menu-props="{contentClass: 'select2'}"
        required
      ></v-autocomplete>
    </v-form>
  </md-dialog-content>

  <md-dialog-actions>
    <v-btn class="cyan" dark @click="editItem()">Save</v-btn>
    <v-btn class="cyan" dark @click="cancel()">Cancel</v-btn>
  </md-dialog-actions>
</md-dialog>
<!-- end of modal content -->

<!-- dialog button -->
<v-btn flat icon color="cyan" @click="openDialog()" title="Add a rider"><v-icon>add</v-icon></v-btn>
<!-- end of button -->
</div>
</template>

<script>
import RidersService from '@/services/RidersService'

export default {
  name: 'editmodal',
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
      // console.log('open', this.item)
      this.checkHorseExists = false
      this.item = {
        id: 0,
        age: 0,
        cell: '',
        fname: '',
        fullname: '',
        lname: '',
        member: ''
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
      // console.log('saving', this.item.cell)
      if (this.$refs.form.validate()) {
        let newInfo = {
          id: this.item.id,
          age: this.item.age,
          cell: this.item.cell,
          fname: this.item.fname,
          fullname: this.cFullname,
          lname: this.item.lname,
          member: this.item.member
        }
        // console.log('RiderNew New Rider', newInfo)
        this.closeDialog()
        await RidersService.newRider(newInfo)
        this.$emit('riderNew', newInfo)
      }
    }
  },
  computed: {
    cFullname () {
      return this.item.lname + ', ' + this.item.fname
    }
  },
  mounted () {
    this.item = {
      id: 0,
      age: 0,
      cell: '',
      fname: '',
      fullname: '',
      lname: '',
      member: ''
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
