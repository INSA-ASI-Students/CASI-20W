<template>
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to the project 20W'
    }
  }
}
</script>

<style lang="scss">
  $color: red;
  h1 {
    color: $color;
  }
</style>
