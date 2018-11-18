import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // can't modify state except through code
  state: {
    showYear: 0,
    arrayMemberStatusOptions: ['Junior', 'Adult', 'Jack Benny'],
    arrayMemberOptions: [{val: '', text: 'Select...'}, {val: 'M', text: 'Member'}, {val: 'N', text: 'Non-Member'}],
    arrayDeclaredDivisionsJumper: [{id: 2, division: 'Open'}, {id: 1, division: 'Puddle'}],
    arrayDeclaredDivisions: [{id: 6, division: 'Adult'},
      {id: 5, division: 'Childrens'},
      {id: 7, division: 'Leadline'},
      {id: 4, division: 'Novice Horse'},
      {id: 3, division: 'Novice Rider'},
      {id: 1, division: 'Open'},
      {id: 8, division: 'Pre-Short Stirrup'},
      {id: 2, division: 'Short Stirrup'}],
    arrayDeclaredDivisionsPleasure: [{id: 1006, division: 'Adult Pleasure'},
      {id: 1005, division: 'Childrens Pleasure'},
      {id: 1007, division: 'Leadline'},
      {id: 1004, division: 'Novice Horse Pleasure'},
      {id: 1003, division: 'Novice Rider Pleasure'},
      {id: 1001, division: 'Open'},
      {id: 1002, division: 'Short Stirrup Pleasure'}],
    editObject: {}
  },
  mutations: {
    changeShowYear (state, token) {
      state.showYear = token
    },
    changeEditObject (state, token) {
      state.editObject = token
    } /*,
    horseModalShow (state, token) {
      state.horseModalVisible = true
      state.horseModalComponent = token
    },
    horseModalHide (state) {
      state.horseModalVisible = false
    },
    showTypesModalShow (state, token) {
      state.showTypesModalVisible = true
      state.showTypesModalComponent = token
    },
    showTypesModalHide (state) {
      state.showTypesModalVisible = false
    },
    riderAgesModalShow (state, token) {
      state.riderAgesModalVisible = true
      state.riderAgesModalComponent = token
    },
    riderAgesModalHide (state) {
      state.riderAgesModalVisible = false
    },
    divisionsModalShow (state, token) {
      state.divisionsModalVisible = true
      state.divisionsModalComponent = token
    },
    divisionsModalHide (state) {
      state.riderAgesModalVisible = false
    },
    declaredDivisionsModalShow (state, token) {
      state.declaredDivisionsModalVisible = true
      state.declaredDivisionsModalComponent = token
    },
    declaredDivisionsModalHide (state) {
      state.declaredDivisionsModalComponent = false
    } */
  },
  actions: {
    setYear (context, token) {
      context.commit('changeShowYear', token)
    },
    setEditObject (context, token) {
      context.commit('changeEditObject', token)
    } /*,
    setHorseModalVisible (context, token) {
      context.commit('horseModalShow', token)
    },
    setHorseModalHide (context, token) {
      context.commit('horseModalHide', token)
    },
    setShowTypesModalVisible (context, token) {
      context.commit('showTypesModalShow', token)
    },
    setShowTypesModalHide (context, token) {
      context.commit('showTypesModalHide', token)
    },
    setRiderAgesModalVisible (context, token) {
      context.commit('riderAgesModalShow', token)
    },
    setRiderAgesModalHide (context, token) {
      context.commit('riderAgesModalHide', token)
    },
    setDivisionsModalVisible (context, token) {
      context.commit('divisionsModalShow', token)
    },
    setDivisionsModalHide (context, token) {
      context.commit('divisionsModalHide', token)
    },
    setDeclaredDivisionsModalVisible (context, token) {
      context.commit('declaredDivisionsModalShow', token)
    },
    setDeclaredDivisionsModalHide (context, token) {
      context.commit('declaredDivisionsModalHide', token)
    } */
  }
})
