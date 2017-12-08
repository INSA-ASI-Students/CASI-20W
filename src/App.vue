<template>
  <div class="app bg-dark">
    <navbar v-bind:title="title" />

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
import Navbar from './components/Navbar.vue';
import TaskList from './components/TaskList.vue';
import Toolbar from './components/Toolbar.vue';
import store from './store';

export default {
  name: 'app',
  store,
  data () {
    return {
      title: 'Project 20W'
    }
  },
  computed: {
    taskListGroup() {
      return this.$store.state.taskListGroup;
    }
  },
  components: {
    Navbar,
    TaskList,
    Toolbar,
  }
}
</script>

<style lang="scss" scoped>
  $taskListWidth: 80%;

  .app {
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
