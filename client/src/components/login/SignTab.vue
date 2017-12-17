<template>
  <div class="sign-tab bg-gray">
    <sign-in v-if="activeTab === 'sign-in'"></sign-in>
  </div>
</template>

<script>
import SignIn from './SignIn.vue'

export default {
  name: 'sign-tab',
  data() {
    return {
      activeTab: 'sign-in',
    }
  },
  components: {
    SignIn,
  }
}
</script>

<style lang="scss" scoped>
  .sign-tab {
    display: flex;
    flex-direction: column;
    width: 25%;
    height: 50%;
    margin: auto;
  }
</style>
