<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5 text-gray">{{title}}</div>
      <div class="card-subtitle text-gray">
        <input class="form-input" type="text" placeholder="title" v-model="taskTitle" />
      </div>
    </div>
    <div class="card-body">
      <textarea class="form-input" type="text" placeholder="description" rows="3" v-model="taskDescription" />
    </div>
    <div class="card-footer">
      <button class="btn btn-success btn-action circle" v-on:click="createTask">
        <i class="icon icon-check"></i>
      </button>
      <button class="btn btn-error btn-action circle" v-on:click="dismiss">
        <i class="icon icon-cross"></i>
      </button>
    </div>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'new-task',
  store,
  data () {
    return {
      'taskTitle': '',
      'taskDescription': '',
    }
  },
  methods: {
    createTask() {
      store.commit('createTask', {
        title: this.taskTitle,
        description: this.taskDescription,
        taskListId: this.taskListId,
      });
    },
  },
  props: [
    'taskListId',
    'title',
    'dismiss',
  ]
}
</script>

<style lang="scss">
</style>
