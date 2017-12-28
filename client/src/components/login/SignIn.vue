<template>
  <div class="sign-in">
    <div class="form-group">
      <label class="form-label" for="input-username">Username</label>
      <input class="form-input" type="text" id="input-username" placeholder="Username" v-model="username">
      <label class="form-label" for="input-password">Password</label>
      <input class="form-input" type="password" id="input-password" placeholder="Password" v-model="password">
      <div class="btn-sign-in">
        <button
          class="btn btn-primary"
          v-on:click="connect"
          v-bind:disabled="username === '' || password === ''"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store';

export default {
  name: 'sign-in',
  store,
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    connect() {
      // TODO Ask server for connection
      this.$store.commit('switchPage', { page: 'board' }) // To do on success
    }
  }
}
</script>

<style lang="scss" scoped>
  .sign-in {
    padding: 7.5pt;

    .form-group {
      .btn-sign-in {
        padding-top: 25pt;

        .btn {
          width: 100%;
        }
      }
    }
  }
</style>
