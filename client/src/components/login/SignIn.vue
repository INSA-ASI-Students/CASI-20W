<template>
  <div class="sign-in bg-gray text-dark">
    <h1>Sign In</h1>
    <div class="sign-in-form form-group">
      <label class="form-label">Username</label>
      <input class="form-text" type="text" v-model="username" placeholder="Username">
      <label class="form-label">Password</label>
      <input class="form-text" type="password" v-model="password" placeholder="Password">
      <div class="sign-in-btn">
        <button type="button" class="btn btn-primary" v-on:click="connect">Sign In</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sing-in',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    connect () {
      console.log(`Connection ${this.username} ${this.password}`);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~spectre.css/src/variables';

  .sign-in {
    margin: auto;
    height: 75%;
    color: $primary-color;
    .sign-in-form {
      height: 100%;

      .sign-in-btn {
        padding-top: 25%;

        .btn {
          width: 100%;
        }
      }
    }
  }
</style>
