<template>
  <div class="toolbar bg-gray">
    <comments-box v-if="isCommentsBox" />
    <task-edition-box v-else v-bind:self="task"/>
  </div>
</template>

<script>
import CommentsBox from './CommentsBox.vue';
import TaskEditionBox from './TaskEditionBox.vue';
import store from '../store';

export default {
  name: 'toolbar',
  store,
  data() {
    return {};
  },
  computed: {
    isCommentsBox() {
      return this.$store.state.editTask <= 0;
    },
    task() {
      const taskId = this.$store.state.editTask;
      return this.$store.state.taskList.find(task => task.id === taskId);
    },
  },
  props: [
  ],
  methods: {
  },
  components: {
    CommentsBox,
    TaskEditionBox,
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
  }
</style>
