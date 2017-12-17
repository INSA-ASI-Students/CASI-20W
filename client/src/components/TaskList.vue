<template>
  <div class="task-list bg-gray col-3">
    <div class="task-list-header" v-if="isEditTitle">
      <input
        class="form-input task-list-group-title"
        type="text"
        v-model="taskListTitle"
        v-on:keyup.enter="updateTitle"
      />
      <button type="button" class="btn btn-primary btn-action circle" v-on:click="updateTitle">
        <i class="icon icon-check"></i>
      </button>
    </div>

    <div class="task-list-header" v-else>
      <h4 class="text-primary title task-list-group-title" v-on:click="editTitle">{{self.title}}</h4>
      <button type="button" class="btn btn-primary btn-action circle" v-on:click="displayNewTask">
        <i class="icon icon-plus"></i>
      </button>
    </div>

    <new-task
      v-if="newTaskIsDisplayed"
      v-bind:title="'Add a task'"
      v-bind:dismiss="dismissNewTask"
      v-bind:taskListId="self.id"
      class="task"
    />

    <div class="task-list-content">
      <task
        v-for="task in taskList"
        v-bind:self="task"
        v-bind:key="'task'+task.id"
        class="task"
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
      'isEditTitle': true,
      'taskListTitle': 'New List',
    }
  },
  methods: {
    displayNewTask() {
      this.newTaskIsDisplayed = true;
    },
    dismissNewTask() {
      this.newTaskIsDisplayed = false;
    },
    editTitle() {
      this.isEditTitle = true;
    },
    updateTitle() {
      this.$store.commit('updateTaskListTitle', {
        id: this.self.id,
        title: this.taskListTitle,
      });
      this.isEditTitle = false;
    },
  },
  mounted() {
    this.isEditTitle = this.self.title === null;
    if (!this.isEditTitle) this.taskListTitle = this.self.title;
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
  $space: .5rem;

  .task-list {
    flex-grow: 0;
    flex-shrink: 0;
    padding: $space;
    overflow-y: auto;

    .task-list-header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      h4 {
        margin: 0;
      }

      .task-list-group-title {
        flex: 1;
        margin-right: $space;
        margin-bottom: 2*$space;
      }
    }

    .task {
      margin-bottom: $space;
    }

    .title:hover {
      cursor: pointer;
      opacity: 0.75;
    }
  }

  .task-list + .task-list {
    margin-left: 2*$space;
  }
</style>
