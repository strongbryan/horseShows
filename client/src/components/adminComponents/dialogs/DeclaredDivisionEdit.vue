<template>
<v-layout row="" justify-center="">
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title primary-title="">Edit Declared Division</v-card-title>
      <v-card-text>
        <form>
          <v-text-field label="Division" v-model="cName" />
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" flat="" @click="save()">Save</v-btn>
        <v-btn color="red" flat="" @click.stop="cancel()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
</template>

<script>
import DeclaredDivisionsService from '@/services/DeclaredDivisionsService'

export default {
  props: ['visible'],
  data () {
    return {
      dName: ''
    }
  },
  methods: {
    async save () {
      if (this.dRadioGroup === 0) this.dRadioGroup = this.radioGroup // this is necessary in case the user doesn't change the value of the radio buttons
      const newDiv = {
        id: this.cId,
        name: this.dName.length === 0 ? this.cName : this.dName
      }
      this.$store.dispatch('setEditObject', newDiv)
      this.$emit('declaredDivisionEdited', newDiv)
      await DeclaredDivisionsService.updateDeclaredDivision(newDiv)
      this.resetData()
      this.show = false
    },
    cancel () {
      // console.log('123 close')
      this.show = false
    },
    resetData () {
      this.dName = ''
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('declaredDivisionClose')
        }
      }
    },
    cName: {
      get () {
        return this.$store.state.editObject.name
      },
      set (value) {
        this.dName = value
      }
    },
    cId: {
      get () {
        return this.$store.state.editObject.id
      },
      set (value) {
      }
    }
  }
}
</script>

<style scoped="">
</style>
