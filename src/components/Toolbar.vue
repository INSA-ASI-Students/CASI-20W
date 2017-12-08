<template>
  <div class="toolbar bg-gray">
    <comments-box />
  </div>
</template>

<script>
import CommentsBox from './CommentsBox.vue';
import store from '../store';

export default {
  name: 'toolbar',
  store,
  props: [
  ],
  methods: {
  },
  components: {
    CommentsBox,
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
