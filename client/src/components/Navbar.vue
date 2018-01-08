<template>
  <header class="navbar bg-gray">
    <section class="navbar-section">
      <a href="#" class="navbar-brand text-primary">{{title}}</a>
    </section>
    <section class="navbar-section">
      <button type="button" class="btn btn-primary" v-if="activeTools === 'board'" v-on:click="createList">Add a list</button>
      <button type="button" class="btn btn-primary" v-if="activeTools === 'board-list'" v-on:click="createBoard">Add a board</button>
    </section>
  </header>
</template>

<script>
import store from '../store';
import TaskListRessource from '../ressources/TaskListRessource';

export default {
  name: 'navbar',
  store,
  props: [
    'title',
    'activeTools'
  ],
  methods: {
    createList() {
      TaskListRessource.addTaskList(this.$store, { title: "New List" });
    },
    createBoard() {
      this.$store.commit("addBoard", { title: "New Board" });
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
