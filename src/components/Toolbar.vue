<template>
  <div class="toolbar bg-gray">
    <comments-box v-if="isCommentsBox" />
    <task-edition-box v-else />
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
    return {
      isCommentsBox: true,
    };
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
