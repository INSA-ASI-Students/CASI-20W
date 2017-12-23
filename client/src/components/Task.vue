<template>
  <div
    class="card bg-secondary"
    v-bind:class="{ isSelected: isSelected }"
    v-on:click="selectTask"
  >
    <div class="card-header">
      <div class="card-title h5 text-gray">#{{self.id}} - {{self.title}}</div>
      <div class="card-subtitle text-gray">{{self.information}}</div>
    </div>
    <div class="card-body text-primary">{{self.description}}</div>
    <div class="card-footer text-gray">
      {{self.lastUpdate.toLocaleString()}}
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
  computed: {
    isSelected() {
      return this.$store.getters.currentUser.selectedTask === this.self.id;
    },
  },
  methods: {
    selectTask() {
      this.$store.commit('selectTask', this.self.id);
    },
  },
  props: [
    'self',
  ],
}
</script>

<style lang="scss" scoped>
  @import '~spectre.css/src/variables';

  .card {
    cursor: pointer;
  }

  .isSelected {
    border-color: $primary-color;
  }
</style>
