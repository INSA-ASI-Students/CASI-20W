<template>
  <div class="app bg-dark">
    <navbar v-bind:title="title" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'app',
  data () {
    return {
      title: 'Project 20W'
    }
  },
  components: {
    Navbar,
  }
}
</script>

<style lang="scss" scoped>
 .app {
   height: 100%;
   width: 100%;
 }
</style>
