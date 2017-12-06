<template>
  <header class="navbar">
    <section class="navbar-section">
      <a href="#" class="navbar-brand text-light">{{title}}</a>
    </section>
    <section class="navbar-section">
      <button type="button" class="btn btn-primary" v-on:click="createList">Add a list</button>
    </section>
  </header>
</template>

<script>
import store from '../store';

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
</style>
