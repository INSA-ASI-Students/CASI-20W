<template>
  <div class="message bg-secondary" v-bind:class="{isAuthor}">
    <avatar v-bind:self="self.user" />
    <div class="content text-primary">{{self.content}}</div>
  </div>
</template>

<script>
import store from '../../store';
import Avatar from '../Avatar.vue';

export default {
  name: 'message',
  store,
  props: [
    'self',
  ],
  computed: {
    isAuthor() {
      return this.self.user.id === this.$store.getters.currentUser.id;
    },
  },
  methods: {
  },
  components: {
    Avatar,
  }
}
</script>
<style lang="scss" scoped>
  $space: .25rem;

  .message {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    padding: $space;
    margin-bottom: 2*$space;

    .content {
      flex: 1;
      padding-right: $space;
    }
  }

  .isAuthor {
    flex-direction: row;

    .content {
      padding-right: 0;
      padding-left: $space;
    }
  }
</style>
