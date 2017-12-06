<template>
  <header class="navbar">
    <section class="navbar-section">
      <a href="#" class="navbar-brand text-light">{{ title }}</a>
    </section>
    <section class="navbar-section">
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
