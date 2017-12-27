<template>
  <div class="toolbar bg-gray">
    <div class="user-list">
      <avatar
        class="avatar"
        v-for="user in userList"
        v-bind:self="user"
        v-bind:key="`user${user.id}`"
      />
    </div>
    <comments-box v-if="isCommentsBox" />
    <task-edition-box v-else v-bind:self="task"/>
  </div>
</template>

<script>
import Avatar from '../Avatar.vue';
import CommentsBox from './CommentsBox.vue';
import TaskEditionBox from './TaskEditionBox.vue';
import store from '../../store';

export default {
  name: 'toolbar',
  store,
  data() {
    return {};
  },
  computed: {
    isCommentsBox() {
      return !this.task;
    },
    task() {
      const taskId = this.$store.getters.currentUser.selectedTask;
      return this.$store.state.taskList.find(task => taskId === task.id);
    },
    userList() {
      return this.$store.state.userList;
    },
  },
  props: [
  ],
  methods: {
  },
  components: {
    CommentsBox,
    TaskEditionBox,
    Avatar,
  }
}
</script>

<style lang="scss" scoped>
  @import '~spectre.css/src/variables';

  .toolbar {
    border-left-color: $primary-color;
    border-left-width: 1px;
    border-left-style: solid;
    padding: .5rem;
    display: flex;
    flex-direction: column;

    .user-list {
      text-align: right;
      overflow-x: scroll;

      .avatar {
        margin-left: .25rem;
        margin-bottom: .25rem;
      }
    }
  }
</style>
