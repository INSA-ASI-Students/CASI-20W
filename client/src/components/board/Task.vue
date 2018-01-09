<template>
  <div
    class="card bg-secondary"
    v-bind:class="{ isSelected: isSelected }"
    v-on:click="selectTask"
  >
    <div class="card-header">
      <div class="card-title h5 text-gray">#{{self.id}} - {{self.title}}</div>
      <div class="card-subtitle text-gray">{{self.information}}</div>
    </div>
    <div class="card-body text-primary">{{self.description}}</div>
    <div class="card-footer text-gray">
      {{self.lastUpdate.toLocaleString()}}
    </div>
    <div class="card-footer">
      <avatar class="avatar" v-bind:key="`taskAvatar${user.id}`" v-bind:self="user" v-for="user in users"/>
    </div>
  </div>
</template>

<script>
import store from '../../store';
import Avatar from '../Avatar.vue';
import UserRessource from '../../ressources/UserRessource';

export default {
  name: 'task',
  store,
  data() {
    return {}
  },
  computed: {
    isSelected() {
      return this.$store.getters.currentUser.selectedTask === this.self.id;
    },
    users() {
      return this.$store.state.userList.filter(obj => obj.selectedTask === this.self.id);
    },
  },
  methods: {
    selectTask() {
      const user = this.$store.getters.currentUser;
      user.selectedTask = this.self.id;
      UserRessource.updateUser(user);
    },
  },
  props: [
    'self',
  ],
  components: {
    Avatar
  },
}
</script>

<style lang="scss" scoped>
  @import '~spectre.css/src/variables';

  .avatar {
    float: right;
  }

  .card {
    cursor: pointer;
  }

  .isSelected {
    border-color: $primary-color;
  }
</style>
