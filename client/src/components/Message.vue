<template>
  <div class="">
    {{self.content}}
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'message',
  store,
  props: [
    'self',
  ],
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
