<template>
  <div class="task-edition-box">
    <h3 class="text-primary">Edit task #{{self.id}}</h3>
    <div class="edition-block">
      <div class="form-group">
        <label class="form-label text-gray" for="edit-task-title">Title</label>
        <input class="form-input" type="text" id="edit-task-title" v-bind:value="self.title"/>
      </div>
      <div class="form-group">
        <label class="form-label text-gray" for="edit-task-description">Description</label>
        <input class="form-input" type="text" id="edit-task-description" v-bind:value="self.description"/>
      </div>
    </div>
    <button class="btn btn-primary" v-on:click="saveTask">Save</button>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'task-edition-box',
  store,
  props: [
    'self',
  ],
  methods: {
    saveTask() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~spectre.css/src/variables';

  .task-edition-box {
    flex: 1;
    display: flex;
    flex-direction: column;

    .edition-block {
      flex: 1;
    }
  }
</style>
