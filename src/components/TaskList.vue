<template>
  <div class="task-list bg-gray col-3">
    <div class="task-list-header">
      <h4 class="text-primary">title</h4>
      <button type="button" class="btn btn-primary btn-action circle">
        <i class="icon icon-plus"></i>
      </button>
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
  }
}
</script>

<style lang="scss">
  .task-list {
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
