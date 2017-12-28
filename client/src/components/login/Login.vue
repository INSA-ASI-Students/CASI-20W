<template>
  <div class="login panel bg-gray">
    <login-tab></login-tab>
    <sign-in v-if="activeTab === 'sign-in'"></sign-in>
    <sign-up v-if="activeTab === 'sign-up'"></sign-up>
  </div>
</template>

<script>
import LoginTab from './LoginTab.vue';
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';
import store from '../../store';

export default {
  name: 'login',
  store,
  computed: {
    activeTab: {
      get() {
        return this.$store.state.loginTab;
      }
    }
  },
  components: {
    LoginTab,
    SignIn,
    SignUp
  }
}
</script>

<style lang="scss" scoped>
  .login {
    color: #454d5d;
    margin: auto;
  }
</style>

