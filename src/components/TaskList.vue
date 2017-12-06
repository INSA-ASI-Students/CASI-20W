<template>
  <div class="task-list bg-gray col-3">
    <div class="task-list-header">
      <h4 class="text-primary">{{self.title}}</h4>
      <button type="button" class="btn btn-primary btn-action circle" v-on:click="displayNewTask">
        <i class="icon icon-plus"></i>
      </button>
    </div>

    <new-task
      v-if="newTaskIsDisplayed"
      v-bind:title="'Add a task'"
      v-bind:dismiss="dismissNewTask"
      v-bind:taskListId="self.id"
    />

    <div class="task-list-content">
      <task
        v-for="task in taskList"
        v-bind:self="task"
        v-bind:key="'task'+task.id"
      />
    </div>
  </div>
</template>

<script>
import NewTask from './NewTask.vue';
import Task from './Task.vue';
import store from '../store';

export default {
  name: 'task-list',
  store,
  data () {
    return {
      'newTaskIsDisplayed': false,
    }
  },
  methods: {
    displayNewTask() {
      this.newTaskIsDisplayed = true;
    },
    dismissNewTask() {
      this.newTaskIsDisplayed = false;
    },
  },
  computed: {
    taskList() {
      return this.$store.state.taskList.filter(task => task.taskListId === this.self.id);
    }
  },
  components: {
    Task,
    NewTask,
  },
  props: [
    'self',
  ]
}
</script>

<style lang="scss">
  .task-list {
    flex-grow: 0;
    flex-shrink: 0;
    padding: .5rem;
    overflow-y: auto;

    .task-list-header {
      display: flex;
      justify-content: space-between;
    }
  }

  .task-list + .task-list {
    margin-left: 1rem;
  }
</style>
