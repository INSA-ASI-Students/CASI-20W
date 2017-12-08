<template>
  <div class="task-edition-box">
    <h3 class="text-primary">Edit task: xxx</h3>
    <div class="edition-block">

    </div>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'task-edition-box',
  store,
  props: [
  ],
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import '~spectre.css/src/variables';

  .comments-box {
    flex: 1;
    display: flex;
    flex-direction: column;

    .edition-block {
      flex: 1;
    }
  }
</style>
