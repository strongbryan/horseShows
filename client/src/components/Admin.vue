<template>
  <v-card>
    <v-toolbar flat dense dark class="cyan">
      <v-toolbar-title>Administration</v-toolbar-title>
    </v-toolbar>
    <div class="col1">
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminChooseYear'" >
        Change Year
      </v-btn><br />
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminDeclaredDivisions'">
        Declared<br />Division Types
      </v-btn>
      <br />
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminDivisions'">
        Divisions
      </v-btn><br />
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminAssignDeclaredDivisions'">
        Assign Declared<br />Divisions
      </v-btn>
      <br />
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminClasses'">
        Classes
      </v-btn>
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminRiderAges'">
        Rider Ages
      </v-btn><br />
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminShowTypes'">
        Show Types
      </v-btn><br />
    </div>
    <div class="col3">
      <component :is="currentView" transition="fade" transition-mode="out-in">
        <panel title="Choose an action"></panel>
      </component>
    </div>
    <div class="col2">
      <p class="center">Set Up New Year</p>
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminClearRiders'">
        Import<br />Declared Divs
      </v-btn>
      <br />
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminClearRiders'">
        Import<br />Show Types
      </v-btn>
      <br />
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminClearRiders'">
        Import Rider Ages
      </v-btn>
      <br />
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminClearRiders'">
        Import Divisions
      </v-btn>
      <br />
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminClearHorses'">
        Import Classes
      </v-btn>
      <br />
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminClearRiders'">
        Import Riders
      </v-btn>
      <br />
      <v-btn color="cyan" dark class="buttons" @click="currentView='AdminClearHorses'">
        Import Horses
      </v-btn>
      <br />
    </div>
  </v-card>
</template>

<script>
import Panel from '@/components/globals/Panel'
import AdminChooseYear from '@/components/adminComponents/AdminChooseYear'
import AdminClasses from '@/components/adminComponents/AdminClasses'
import AdminClearHorses from '@/components/adminComponents/AdminClearHorses'
import AdminClearPairs from '@/components/adminComponents/AdminClearPairs'
import AdminClearRiders from '@/components/adminComponents/AdminClearRiders'
import AdminDivisions from '@/components/adminComponents/AdminDivisions'
import AdminDeclaredDivisions from '@/components/adminComponents/AdminDeclaredDivisions'
import AdminAssignDeclaredDivisions from '@/components/adminComponents/AdminAssignDeclaredDivisions'
import AdminRiderAges from '@/components/adminComponents/AdminRiderAges'
import AdminShowTypes from '@/components/adminComponents/AdminShowTypes'
export default {
  components: {
    Panel,
    AdminChooseYear,
    AdminClasses,
    AdminClearHorses,
    AdminClearPairs,
    AdminDivisions,
    AdminDeclaredDivisions,
    AdminAssignDeclaredDivisions,
    AdminClearRiders,
    AdminRiderAges,
    AdminShowTypes
  },
  data () {
    return {
      info: [],
      currentView: 'AdminChooseYear'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .col1 {
    /* border:1px solid black; /* */
    text-align: left;
    width: 175px;
    float: left;
    margin-left: 0px;
    margin-top: 10px;
  }
  .col2 {
    /* border:1px solid black; /* */
    text-align: left;
    width: 175px;
    float: left;
    margin-left: 0px;
    margin-top: 10px;
  }
  .col3 {
    /* border:1px solid black; /* */
    text-align: left;
    width: 950px;
    float: left;
    margin-left: 0px;
    margin-top: 10px;
  }
  .buttons {
    width: 150px;
  }
  .fade-transition {
    transition: opacity 0.2s ease;
  }
  .fade-enter, fade-leave {
    opacity: 0;
  }
  .center {
    text-align: center;
    font-weight: bold;
  }
</style>
