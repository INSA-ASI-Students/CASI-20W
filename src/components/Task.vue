<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5 text-gray">{{self.title}}</div>
      <div class="card-subtitle text-gray">{{self.information}}</div>
    </div>
    <div class="card-body text-primary">{{self.description}}</div>
    <div class="card-footer">
      <button class="btn btn-primary">Done</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  data() {
    return {}
  },
  props: [
    'self',
  ]
}
</script>

<style lang="scss" scoped>
</style>
