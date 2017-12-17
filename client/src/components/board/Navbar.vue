<template>
  <header class="navbar bg-gray">
    <section class="navbar-section">
      <a href="#" class="navbar-brand text-primary">{{title}}</a>
    </section>
    <section class="navbar-section">
      <button type="button" class="btn btn-primary" v-on:click="createList">Add a list</button>
    </section>
  </header>
</template>

<script>
import store from '../../store';

export default {
  name: 'navbar',
  store,
  props: [
    'title',
  ],
  methods: {
    createList() {
      store.commit("createTaskList", { title: "New List" });
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~spectre.css/src/variables';

  .navbar {
    border-bottom-color: $primary-color;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    padding: .5rem;
  }
</style>
