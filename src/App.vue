<template>
  <div class="app bg-dark">
    <navbar v-bind:title="title" />
    <div class="task-list-group">
      <task-list
        v-for="taskList in taskListGroup"
        v-bind:self="taskList"
        v-bind:key="'taskList'+taskList.id"
      />
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
    taskListGroup() {
      console.log(this.$store.state.taskListGroup);
      return this.$store.state.taskListGroup;
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
     display: flex;
     overflow-x: auto;
     flex: 1;
     padding: 1rem;
     margin-right: 1rem;
   }
 }
</style>
