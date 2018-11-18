<template>
<v-layout row="" justify-center="">
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title primary-title="">Edit Rider Ages</v-card-title>
      <v-card-text>
        <form>
          <v-text-field label="Rider Age" v-model="cAge"></v-text-field>
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
import RiderAgesService from '@/services/RiderAgesService'

export default {
  props: ['visible'],
  data () {
    return {
      dAge: ''
    }
  },
  methods: {
    async save () {
      const newRiderAge = {
        id: this.cId,
        age: this.dAge.length === 0 ? this.cAge : this.dAge
      }
      this.$store.dispatch('setEditObject', newRiderAge)
      this.$emit('riderAgeEdited', newRiderAge)
      await RiderAgesService.updateRiderAge(newRiderAge)
      this.resetData()
      this.show = false
    },
    cancel () {
      this.show = false
    },
    resetData () {
      this.dAge = ''
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('riderAgeClose')
        }
      }
    },
    cAge: {
      get () {
        return this.$store.state.editObject.age
      },
      set (value) {
        this.dAge = value
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
