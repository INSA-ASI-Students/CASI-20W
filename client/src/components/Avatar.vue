<template>
  <figure
    class="avatar badge bg-secondary"
    v-bind:data-initial="initial"
    v-bind:style="style"
  />
</template>

<script>
import store from '../store';
import ColorHash from 'color-hash';

export default {
  name: 'avatar',
  store,
  props: [
    'self',
  ],
  data() {
    return {
      colorHash: new ColorHash(),
    };
  },
  computed: {
    initial() {
      return this.self.name[0];
    },
    backgroundColor() {
      return this.colorHash.hex(this.self.name);
    },
    fontColor() {
      return this.colorHash.hex(this.self.name.split('').reverse().join(''));
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
        fontColor: this.fontColor,
      };
    },
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>

</style>
