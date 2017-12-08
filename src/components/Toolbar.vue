<template>
  <div class="toolbar bg-gray">
    <h1 class="text-primary">Title</h1>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'toolbar',
  store,
  props: [
  ],
  methods: {
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
  }
</style>
