<template>
<v-layout row="" justify-center="">
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title primary-title="">Edit Division</v-card-title>
      <v-card-text>
        <form>
          <v-text-field label="Division" v-model="cName" />
          <v-text-field label="Declared Division" v-model="cDeclaredDiv" />
          <v-radio-group v-model="radioGroup">
            <v-radio :label="`Hunter`" :value="1" />
            <v-radio :label="`Jumper`" :value="2" />
            <v-radio :label="`Pleasure`" :value="3" />
          </v-radio-group>
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
import DivisionsService from '@/services/DivisionsService'

export default {
  props: ['visible'],
  data () {
    return {
      dName: '',
      dRadioGroup: 0,
      dDeclaredDiv: 0
    }
  },
  methods: {
    async save () {
      if (this.dRadioGroup === 0) this.dRadioGroup = this.radioGroup // this is necessary in case the user doesn't change the value of the radio buttons
      const newDivision = {
        id: this.cId,
        hw: this.dRadioGroup === 1 ? 1 : 0,
        j: this.dRadioGroup === 2 ? 1 : 0,
        p: this.dRadioGroup === 3 ? 1 : 0,
        name: this.dName.length === 0 ? this.cName : this.dName,
        declaredDiv: this.dDeclaredDiv === 0 ? this.cDeclaredDiv : this.dDeclaredDiv
      }
      this.$store.dispatch('setEditObject', newDivision)
      this.$emit('divisionEdited', newDivision)
      await DivisionsService.updateDivision(newDivision)
      this.resetData()
      this.show = false
    },
    cancel () {
      this.show = false
    },
    resetData () {
      this.dName = ''
      this.dRadioGroup = 0
      this.dHw = false
      this.dJ = 0
      this.dP = 0
      this.dDeclaredDiv = 0
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('divisionClose')
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
    cDeclaredDiv: {
      get () {
        return this.$store.state.editObject.declaredDiv
      },
      set (value) {
        this.dDeclaredDiv = value
      }
    },
    radioGroup: {
      get () {
        if (this.$store.state.editObject.hw === 1) {
          return 1
        } else if (this.$store.state.editObject.j === 1) {
          return 2
        } else {
          return 3
        }
      },
      set (value) {
        this.dRadioGroup = value
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
