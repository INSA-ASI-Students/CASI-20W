<template>
  <div class='login bg-dark'>
    <login-navbar v-bind:title="title"></login-navbar>
    <sign-tab></sign-tab>
  </div>
</template>

<<script>
import LoginNavbar from './Navbar.vue';
import SignTab from './SignTab.vue';

export default {
  name: 'login',
  props: [
    'title'
  ],
  components: {
    LoginNavbar,
    SignTab,
  },
}
</script>

<style lang="scss" scoped>
  .login {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
  }
</style>
