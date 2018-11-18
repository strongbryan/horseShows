<template>
<div id = 'editmodal'>
<!-- modal content -->
<md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
  <md-dialog-title>Edit Rider</md-dialog-title>

  <md-dialog-content>
    <form>
      <v-text-field label="First Name" v-model="item.fname"></v-text-field>
      <v-text-field label="Last Name" v-model="item.lname"></v-text-field>
      <label>Age</label>
      <select v-model="item.age" style="border: 1px solid black; text-align: center; padding: 0 2px;">
        <option value="0">Select one</option>
        <option v-for="age in this.$store.state.arrayMemberStatusOptions" v-bind:value="age" :key="age">{{age}}</option>
      </select>
      <v-text-field label="Cell Number" v-model="item.cell"></v-text-field>
      <label>Member</label>
      <select v-model="item.member" style="border: 1px solid black; text-align: center; padding: 0 2px;">
        <option v-for="mem in this.$store.state.arrayMemberOptions" v-bind:value="mem.val" :key="mem.val">{{mem.text}}</option>
      </select>
    </form>
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
import RidersService from '@/services/RidersService'

export default {
  name: 'editmodal',
  props: {
    'index': Number,
    'item': Object
  },
  data () {
    return {
      dialog: false
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
      this.closeDialog()
    },
    async editItem () {
      // console.log('saving', this.item)
      let newInfo = {
        id: this.item.id,
        age: this.item.age,
        cell: this.item.cell,
        fname: this.item.fname,
        fullname: this.cFullname,
        lname: this.item.lname,
        member: this.item.member
      }
      console.log('edited', newInfo)
      this.closeDialog()
      this.$emit('riderEdited', newInfo)
      await RidersService.updateRider(newInfo)
    }
  },
  computed: {
    cFullname () {
      return this.item.lname + ', ' + this.item.fname
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
