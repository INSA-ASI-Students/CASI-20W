<template>
  <header class="login-navbar navbar bg-gray">
    <section class="navbar-section">
      <a href="#" class="navbar-brand text-primary">{{title}}</a>
    </section>
    <section class="navbar-section">
    </section>
  </header>
</template>

<script>
export default {
  name: 'login-navbar',
  props: [
    'title',
  ],
}
</script>
<style lang="scss" scoped>
  @import '~spectre.css/src/variables';

  .login-navbar {
    border-bottom-color: $primary-color;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    padding: .5rem;
  }
</style>
