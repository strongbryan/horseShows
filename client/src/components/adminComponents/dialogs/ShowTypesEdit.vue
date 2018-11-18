<template>
<v-layout row="" justify-center="">
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title primary-title="">Edit Show Types</v-card-title>
      <v-card-text>
        <form>
          <v-text-field label="Show Type" v-model="cShowType"></v-text-field>
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
import ShowTypesService from '@/services/ShowTypesService'

export default {
  props: ['visible'],
  data () {
    return {
      dShowType: ''
    }
  },
  methods: {
    async save () {
      const newShowType = {
        id: this.cId,
        type: this.dShowType.length === 0 ? this.cShowType : this.dShowType
      }
      this.$store.dispatch('setEditObject', newShowType)
      this.$emit('showTypeEdited', newShowType)
      await ShowTypesService.updateShowType(newShowType)
      this.resetData()
      this.show = false
    },
    cancel () {
      this.show = false
    },
    resetData () {
      this.dShowType = ''
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('showTypeClose')
        }
      }
    },
    cShowType: {
      get () {
        return this.$store.state.editObject.type
      },
      set (value) {
        this.dShowType = value
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
