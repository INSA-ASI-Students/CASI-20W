<template>
  <div class="task-edition-box">
    <h3 class="text-primary">Edit task #{{self.id}}</h3>
    <div class="edition-block">
      <div class="form-group">
        <label class="form-label text-gray" for="edit-task-title">Title</label>
        <input
          class="form-input"
          type="text"
          id="edit-task-title"
          v-model="title"
          v-on:keyup.enter="saveTask"
        />
      </div>
      <div class="form-group">
        <label class="form-label text-gray" for="edit-task-description">Description</label>
        <textarea
          class="form-input"
          type="text" id="edit-task-description"
          v-model="description"
          v-on:keyup.enter="saveTask"
          rows="4"
        />
      </div>
    </div>
    <button class="btn btn-primary" v-on:click="saveTask">Save</button>
    <button class="btn btn-error" v-on:click="dismissTask">Dismiss</button>
    <comment-box class="comment-box" v-bind:task="self"/>
  </div>
</template>

<script>
import store from '../../store';
import CommentBox from './CommentsBox.vue';
import TaskRessource from '../../ressources/TaskRessource';
import UserRessource from '../../ressources/UserRessource';

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
    self: function() {
      this.title = this.self.title;
      this.description = this.self.description;
    }
  },
  methods: {
    saveTask() {
      const task = this.self;
      task.updateContent(this.title, this.description);
      TaskRessource.updateTask(task);
      this.dismissTask();
    },
    dismissTask() {
      const user = this.$store.getters.currentUser;
      user.selectedTask = -1;
      UserRessource.updateUser(user);
    },
  },
  components: {
    CommentBox,
  },
}
</script>

<style lang="scss" scoped>
  @import '~spectre.css/src/variables';
  $space: .5rem;

  .task-edition-box {
    flex: 1;
    display: flex;
    flex-direction: column;


    .btn {
      margin-top: $space;
    }

    .comment-box {
      flex: 1;
      margin-top: $space;
      padding-top: $space;
      border-top: 1px solid $primary-color;
    }
  }
</style>
