<template>
  <header class="navbar">
    <section class="navbar-section">
      <a href="#" class="navbar-brand text-light">{{ title }}</a>
    </section>
    <section class="navbar-section">
      <button type="button" class="btn btn-primary">Add a list</button>
    </section>
  </header>
</template>

<script>
export default {
  name: 'navbar',
  props: [
    'title',
  ],
}
</script>

<style lang="scss" scoped>
</style>
