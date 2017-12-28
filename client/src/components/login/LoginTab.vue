<template>
  <div class="login-tab panel-nav">
    <ul class="login-tabs tab tab-block">
      <li
        class="login-tab-item tab-item"
        v-bind:class="{ active: activeTab === 'sign-in' }"
      >
        <a
          v-on:click="() => switchTab('sign-in')"
        >
          Sign In
        </a>
      </li>
      <li
        class="login-tab-item tab-item"
        v-bind:class="{ active: activeTab === 'sign-up' }"
      >
        <a
          v-on:click="() => switchTab('sign-up')"
        >
          Sign Up
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '../../store';

export default {
  name: 'login-tab',
  store,
  methods: {
    switchTab(tab) {
      this.$store.commit('switchLoginTab', { loginTab: tab });
    }
  },
  computed: {
    activeTab: {
      get() {
        return this.$store.state.loginTab;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
