<template>
  <div class="task-edition-box">
    <h3 class="text-primary">Edit task #{{self.id}}</h3>
    <div class="edition-block">
      <div class="form-group">
        <label class="form-label text-gray" for="edit-task-title">Title</label>
        <input class="form-input" type="text" id="edit-task-title" v-model="title"/>
      </div>
      <div class="form-group">
        <label class="form-label text-gray" for="edit-task-description">Description</label>
        <textarea class="form-input" type="text" id="edit-task-description" v-model="description" rows="4"/>
      </div>
    </div>
    <button class="btn btn-primary" v-on:click="saveTask">Save</button>
    <button class="btn btn-error dismiss" v-on:click="dismissTask">Dismiss</button>
  </div>
</template>

<script>
import store from '../../store';

export default {
  name: 'task-edition-box',
  store,
  data() {
    return {
      title: '',
      description: '',
    };
  },
  props: [
    'self',
  ],
  mounted() {
    this.title = this.self.title;
    this.description = this.self.description;
  },
  watch: {
    self: function () {
      this.title = this.self.title;
      this.description = this.self.description;
    }
  },
  methods: {
    saveTask() {
      this.$store.commit('saveTask', {
        id: this.self.id,
        title: this.title,
        description: this.description,
      });
    },
    dismissTask() {
      this.$store.commit('unselectTasks');
    },
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

    .dismiss {
      margin-top: .5rem;
    }
  }
</style>
