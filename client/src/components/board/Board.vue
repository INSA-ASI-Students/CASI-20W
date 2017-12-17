<template>
  <div class="board bg-dark">
    <board-navbar v-bind:title="title" />

    <div class="page">
      <div class="task-list-group">
        <task-list
        v-for="taskList in taskListGroup"
        v-bind:self="taskList"
        v-bind:key="'taskList'+taskList.id"
        />
      </div>
      <toolbar class="toolbar"/>
    </div>
  </div>
</template>

<script>
import BoardNavbar from './Navbar.vue';
import TaskList from './TaskList.vue';
import Toolbar from './Toolbar.vue';
import store from '../../store';

export default {
  name: 'board',
  store,
  props: [
    'title'
  ],
  computed: {
    taskListGroup() {
      return this.$store.state.taskListGroup;
    }
  },
  components: {
    BoardNavbar,
    TaskList,
    Toolbar,
  }
}
</script>

<style lang="scss" scoped>
  $taskListWidth: 80%;

  .board {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .page {
      display: flex;
      flex: 1;

      .task-list-group {
        display: flex;
        overflow-x: auto;
        width: $taskListWidth;
        padding: 1rem;
        margin-right: 1rem;
      }

      .toolbar {
        width: calc(100% - $taskListWidth);
        flex: 1;
      }
    }

  }
</style>