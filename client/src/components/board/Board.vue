<template>
  <div class="board">
    <draggable
      class="task-list-group"
      v-bind:options="{group:'taskListGroup'}"
      v-model="taskListGroup"
    >
      <task-list
        v-for="taskList in taskListGroup"
        v-bind:self="taskList"
        v-bind:key="`taskList${taskList.id}`"
      />
    </draggable>
    <toolbar class="toolbar"/>
  </div>
</template>


<script>
import TaskList from './TaskList.vue';
import Toolbar from './Toolbar.vue';
import draggable from 'vuedraggable';
import store from '../../store';

export default {
  name: 'board',
  store,
  computed: {
    taskListGroup: {
      get() {
        return this.$store.state.taskListGroup;
      },
      set(state) {
        this.$store.commit('updateTaskListPlace', state);
      },
    },
  },
  beforeCreate() {
    this.$store.dispatch('retrieveData');
  },
  components: {
    TaskList,
    Toolbar,
    draggable
  }
}
</script>

<style lang="scss" scoped>
  $taskListWidth: 80%;

  .board {
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
</style>
