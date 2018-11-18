<template>
<v-layout row="" justify-center="">
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title primary-title="">Edit Class</v-card-title>
      <v-card-text>
        <form>
          <v-text-field label="Class" v-model="cClass" />
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
import ClassesService from '@/services/ClassesService'

export default {
  props: ['visible'],
  data () {
    return {
      dClass: ''
    }
  },
  methods: {
    async save () {
      const newClass = {
        id: this.cId,
        class: this.dClass.length === 0 ? this.cClass : this.dClass
      }
      // console.log('saving', newClass)
      this.$store.dispatch('setEditObject', newClass)
      this.$emit('showClassesEdited', newClass)
      await ClassesService.updateClass(newClass)
      this.resetData()
      this.show = false
    },
    cancel () {
      this.show = false
    },
    resetData () {
      this.dClass = ''
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('showClassesClose')
        }
      }
    },
    cClass: {
      get () {
        return this.$store.state.editObject.class
      },
      set (value) {
        this.dClass = value
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
