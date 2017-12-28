<template>
  <div class="sign-up">
    <div class="form-group">
      <label class="form-label" for="input-username">Username</label>
      <input class="form-input" type="text" id="input-username" placeholder="Username" v-model="username">
      <label class="form-label" for="input-password">Password</label>
      <input
        class="form-input"
        v-bind:class="{ 'is-success': samePassword, 'is-error': !emptyPassword && !emptyConfirmPassword && !samePassword }"
        type="password"
        id="input-password"
        placeholder="Password"
        v-model="password"
      >
      <label class="form-label" for="input-confirm-password">Confirm password</label>
      <input
        class="form-input"
        v-bind:class="{ 'is-success': samePassword, 'is-error': !emptyConfirmPassword && !samePassword }"
        type="password"
        id="input-confirm-password"
        placeholder="Password"
        v-model="confirmPassword"
      >
      <p class="form-input-hint" v-if="!emptyConfirmPassword && !samePassword">Passwords are different</p>
      <div class="btn-sign-up">
        <button
          class="btn btn-primary"
          v-bind:disabled="!samePassword || username === ''"
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store';

export default {
  name: 'sign-up',
  store,
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    emptyPassword() {
      return this.password === '';
    },
    emptyConfirmPassword() {
      return this.confirmPassword === '';
    },
    samePassword () {
      return (
        this.password !== '' && 
        this.confirmPassword !== '' &&
        this.password === this.confirmPassword
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  .sign-up {
    padding: 7.5pt;

    .form-group {
      .btn-sign-up {
        padding-top: 25pt;

        .btn {
          width: 100%;
        }
      }
    }
  }
</style>
