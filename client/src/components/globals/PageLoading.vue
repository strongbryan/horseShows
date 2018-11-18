<template>
  <div class="pageLoading" v-if="loading">
    <v-progress-circular :indeterminate=loading color="cyan" style="text-align:center"></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: [
    'loading'
  ]
}
</script>

<style scoped>
.pageLoading{
  text-align: center;
  margin-top: 20px;
}
</style>
