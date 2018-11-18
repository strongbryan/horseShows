<template>
  <form>
    <v-text-field label="First Name" v-model="fname" :error-messages="fnameErrors" :counter="1" @input="$v.fname.$touch()" @blur="$v.fname.$touch()" required=""></v-text-field>
    <v-text-field label="Last Name" v-model="lname" :error-messages="lnameErrors" :counter="1" @input="$v.lname.$touch()" @blur="$v.lname.$touch()" required=""></v-text-field>
    <v-text-field label="Age" v-model="age" :error-messages="ageErrors" :counter="1" @input="$v.age.$touch()" @blur="$v.age.$touch()" required=""></v-text-field>
    <v-text-field label="E-mail" v-model="email" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" required="" />
    <v-select label="Item" v-model="select"
      :items="items"
      :item-value="items.id"
      :error-messages="selectErrors"
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()" required="">
    </v-select>
    <v-checkbox label="Do you agree?" v-model="checkbox" :error-messages="checkboxErrors" @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()" required="" ></v-checkbox>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, between } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    fname: { required, maxLength: maxLength(50) },
    lname: { required, maxLength: maxLength(10) },
    email: { required, email },
    age: { required, between: between(5, 99) },
    select: { required },
    checkbox: { required }
  },

  data: () => ({
    lname: '',
    fname: '',
    age: '',
    email: '',
    select: null,
    items: [
      {value: 0, text: 'Item 1', id: 0},
      {value: 1, text: 'Item 2', id: 1},
      {value: 2, text: 'Item 3', id: 2},
      {value: 3, text: 'Item 4', id: 3}
    ],
    checkbox: false
  }),

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.required && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    lnameErrors () {
      const errors = []
      if (!this.$v.lname.$dirty) return errors
      !this.$v.lname.maxLength && errors.push('Last Name must be at most 50 characters long')
      !this.$v.lname.required && errors.push('Last Name is required.')
      return errors
    },
    fnameErrors () {
      const errors = []
      if (!this.$v.fname.$dirty) return errors
      !this.$v.fname.maxLength && errors.push('First Name must be at most 50 characters long')
      !this.$v.fname.required && errors.push('A First Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    ageErrors () {
      const errors = []
      if (!this.$v.age.$dirty) return errors
      !this.$v.age.numeric && errors.push('Age must be numeric')
      !this.$v.age.required && errors.push('Age is required')
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    }
  }
}
</script>

<style scoped="">
</style>
