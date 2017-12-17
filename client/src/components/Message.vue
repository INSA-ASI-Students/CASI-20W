<template>
  <div class="tile bg-primary">
    <div class="tile-icon">
      <avatar v-bind:self="self.user"/>
    </div>
    <div class="tile-content">
      <p class="tile-title">{{self.user.name}}</p>
      <p class="tile-subtitle text-gray">{{self.content}}</p>
    </div>
  </div>
</template>

<script>
import store from '../store';
import Avatar from './Avatar.vue';

export default {
  name: 'message',
  store,
  props: [
    'self',
  ],
  methods: {
  },
  components: {
    Avatar,
  }
}
</script>
<style lang="scss" scoped>

</style>
