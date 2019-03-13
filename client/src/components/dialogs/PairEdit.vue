  <template>
  <div id = 'editmodal'>
  <!-- modal content -->
  <md-dialog :md-active.sync="dialog" style="background-color: #ffffff;">
    <md-dialog-title>Edit Pair</md-dialog-title>

    <md-dialog-content>
      <form>
<!-- :custom-text="codeAndNameAndDesc" -->
        <v-select v-model="item.horse" :items="horses"
          item-text="name"
          item-value="id"
          :persistent-hint=true
          placeholder="Select..."
          :menu-props="{maxHeight: 200}"
          label="Horse Name">
        </v-select>
        <v-select v-model="item.rider" :items="riders"
          item-text="fullname"
          item-value="id"
          :persistent-hint=true
          placeholder="Select..."
          :menu-props="{maxHeight: 200}"
          label="Rider Name">
        </v-select>
        <v-text-field label="Show Number" v-model="item.shownumber"></v-text-field>
        <v-select v-model="item.declaredDiv" :items="westernDivs"
          item-text="division"
          item-value="id"
          :persistent-hint=true
          placeholder="Select..."
          :menu-props="{maxHeight: 200}"
          label="Declared Division: Hunter">
        </v-select>
        <v-select v-model="item.declaredDivP" :items="pleasureDivs"
          item-text="division"
          item-value="id"
          :persistent-hint=true
          :menu-props="{maxHeight: 200}"
          label="Declared Division: Pleasure">
        </v-select>
        <v-select v-model="item.declaredDivJumper" :items="jumperDivs"
          item-text="division"
          item-value="id"
          :persistent-hint=true
          label="Declared Division: Jumper">
        </v-select>
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
import HorsesService from '@/services/HorsesService'
import PairsService from '@/services/PairsService'

export default {
  name: 'editmodal',
  props: {
    'index': Number,
    'item': Object
  },
  data () {
    return {
      dialog: false,
      riders: [],
      horses: [],
      jumperDivs: this.$store.state.arrayDeclaredDivisionsJumper,
      westernDivs: this.$store.state.arrayDeclaredDivisions,
      pleasureDivs: this.$store.state.arrayDeclaredDivisionsPleasure
    }
  },
  methods: {
    async openDialog () {
      this.riders = (await RidersService.getAllRiders()).data
      this.horses = (await HorsesService.getAllHorses()).data
      this.dialog = true
      console.log('open', this.item)
    },
    codeAndNameAndDesc (item) {
      console.log(item)
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
      var newRider = 0
      while (this.riders[newRider].id !== parseInt(this.item.rider, 10)) newRider++
      // console.log('newRider', newRider, this.riders[newRider].id, typeof(parseInt(this.item.rider, 10)), typeof(this.riders[newRider].id))
      var newHorse = 0
      while (this.horses[newHorse].id !== parseInt(this.item.horse)) newHorse++
      let newInfo = {
        id: this.item.id,
        horse: this.item.horse,
        rider: this.item.rider,
        name: this.horses[newHorse].name,
        riderFullName: this.riders[newRider].fullname,
        showNumber: this.item.shownumber,
        declaredDiv: this.item.declaredDiv,
        declaredDivJumper: this.item.declaredDivJumper,
        declaredDivP: this.item.declaredDivP
      }
      this.closeDialog()
      await PairsService.updatePair(newInfo)
      this.$emit('pairEdited', newInfo)
    }
  },
  computed: {
  },
  mounted () {
    // console.log(this.$store.state.arrayMemberStatusOptions)
  },
  components: {
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
  .field {
    margin-bottom: 15px;
  }
</style>
