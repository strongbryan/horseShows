<template>
  <v-flex xs12="" sm12="" paren="" justify-center="" align-center="" >
    <h1>{{ msg }}</h1>
    <div class="minHeightExample">
      <v-btn class="btn-edit" color="cyan" dark="" :to="{ name: 'Shows'}">
        Let's Get Started
      </v-btn>
    </div>
  </v-flex>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Horse Shows'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.minHeightExample{
  padding: 70px 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
