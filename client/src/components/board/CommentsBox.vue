<template>
  <div class="comments-box">
    <h3 class="text-primary">Comments</h3>
    <div class="comment-list">
      <message
        v-for="(comment, index) in commentList"
        v-bind:self="comment"
        v-bind:key="`generalComment${index}`"
      />
    </div>
    <input
      class="form-input"
      type="text"
      placeholder="Say something ..."
      v-model="content"
      v-on:keyup.enter="sendMessage"
    />
  </div>
</template>

<script>
import store from '../../store';
import Message from './Message.vue';

export default {
  name: 'comments-box',
  store,
  data() {
    return {
      content: '',
    }
  },
  computed: {
    commentList() {
      if (this.task) return this.task.commentList;
      return this.$store.state.commentList;
    },
  },
  props: [
    'task',
  ],
  methods: {
    sendMessage() {
      if (this.task) this.$store.commit('addTaskComment', {
        taskId: this.task.id,
        content: this.content,
      });
      else this.$store.commit('addGeneralComment', this.content);
      this.content = '';
    },
  },
  components: {
    Message,
  },
}
</script>

<style lang="scss" scoped>
  @import '~spectre.css/src/variables';

  .comments-box {
    flex: 1;
    display: flex;
    flex-direction: column;

    .comment-list {
      overflow-y: auto;
      flex: 1;
    }
  }
</style>
