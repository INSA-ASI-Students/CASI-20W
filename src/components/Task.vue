<template>
  <div class="task card">
    <div class="card-header">
      <div class="card-title h5 text-gray">{{title}}</div>
      <div class="card-subtitle text-gray">{{information}}</div>
    </div>
    <div class="card-body">{{description}}</div>
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
    'id',
    'title',
    'description',
  ]
}
</script>

<style lang="scss" scoped>
</style>
