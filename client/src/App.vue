<template>
  <div class="app bg-dark">
    <navbar v-bind:title="title" v-bind:activeTools="activeComponent"/>

    <div class="page">
      <board v-if="activeComponent === 'board'"></board>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Board from './components/board/Board.vue';
import store from './store';

export default {
  name: 'app',
  store,
  data () {
    return {
      title: 'Project 20W',
    }
  },
  beforeCreate() {
    this.$store.dispatch('retrieveData');
  },
  computed: {
    activeComponent: {
      get() {
        return this.$store.state.page;
      }
    },
  },
  components: {
    Navbar,
    Board
  },
}
</script>

<style lang="scss" scoped>
  .app {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .page {
      display: flex;
      flex: 1;
    }

  }
</style>
