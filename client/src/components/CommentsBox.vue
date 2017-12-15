<template>
  <div class="comments-box">
    <h3 class="text-primary">Comments</h3>
    <div class="comment-list">

    </div>
    <input class="form-input" type="text" placeholder="Say something ...">
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'comments-box',
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

    .comment-list {
      flex: 1;
    }
  }
</style>
