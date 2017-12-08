<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5 text-gray">#{{self.id}} - {{self.title}}</div>
      <div class="card-subtitle text-gray">{{self.information}}</div>
    </div>
    <div class="card-body text-primary">{{self.description}}</div>
    <div class="card-footer">
      <button class="btn btn-primary" v-on:click="selectTask">Edit</button>
    </div>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'task',
  store,
  data() {
    return {}
  },
  methods: {
    selectTask() {
      this.$store.commit('selectTask', this.self.id);
    },
  },
  props: [
    'self',
  ]
}
</script>

<style lang="scss" scoped>
</style>
