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
      class="new-task"
    />

    <draggable
      class="task-list-content"
      v-bind:options="{group:'taskList'}"
      v-model="taskList"
    >
      <task
        v-for="task in taskList"
        v-bind:self="task"
        v-bind:key="`task${task.id}`"
        class="task"
      />
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import NewTask from './NewTask.vue';
import Task from './Task.vue';
import store from '../store';

export default {
  name: 'task-list',
  store,
  data () {
    return {
      'dragList': [],
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
    taskList: {
      get() {
        return this.self.taskList.map((taskId) => {
          return this.$store.state.taskList.find(task => task.id === taskId);
        });
      },
      set(state) {
        this.$store.commit('updateTaskPlace', {
          taskListId: this.self.id,
          taskList: state.map(task => task.id),
        });
      },
    },
  },
  components: {
    Task,
    NewTask,
    draggable,
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
    display: flex;
    flex-direction: column;
    padding: $space;

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

    .task-list-content {
      overflow-y: auto;
      flex: 1;

      .task {
        margin-bottom: $space;
      }
    }

    .new-task {
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
