<template>
  <div class="task-list bg-gray col-3">
    <div class="task-list-header">
      <h4 class="text-primary">{{title}}</h4>
      <button type="button" class="btn btn-primary btn-action circle">
        <i class="icon icon-plus"></i>
      </button>
    </div>

    <div class="task-list-content">
      <!-- <task
        v-bind:title="taskList[0].title"
        v-bind:description="taskList[0].description"
        v-bind:information="taskList[0].information"
      /> -->
    </div>
  </div>
</template>

<script>
import Task from './Task.vue';

export default {
  name: 'task-list',
  data () {
    return {}
  },
  components: {
    Task,
  },
  props: [
    'title',
    'taskList',
  ]
}
</script>

<style lang="scss">
  .task-list {
    flex-grow: 0;
    flex-shrink: 0;
    padding: .5rem;

    .task-list-header {
      display: flex;
      justify-content: space-between;
    }
  }

  .task-list + .task-list {
    margin-left: 1rem;
  }
</style>
