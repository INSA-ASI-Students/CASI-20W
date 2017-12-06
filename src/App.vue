<template>
  <div class="app bg-dark">
    <navbar v-bind:title="title" />
    <div class="task-list-group">
      <task-list />
      <task-list />
      {{taskList}}
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import TaskList from './components/TaskList.vue';
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
    taskList() {
      return store.state.taskList;
    }
  },
  components: {
    Navbar,
    TaskList,
  }
}
</script>

<style lang="scss" scoped>
 .app {
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;

   .task-list-group {
     padding: 1rem;
     display: flex;
     flex: 1;
   }
 }
</style>
