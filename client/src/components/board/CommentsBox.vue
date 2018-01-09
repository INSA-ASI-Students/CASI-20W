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
import TaskRessource from '../../ressources/TaskRessource';
import MessageRessource from '../../ressources/MessageRessource';
import MessageObj from '../../../../shared/objects/Message';


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
      let comments = [];
      if (this.task) comments = this.task.commentList;
      else comments = this.$store.state.commentList;
      return comments.sort((a , b) => a.date - b.date);
    },
  },
  props: [
    'task',
  ],
  methods: {
    sendMessage() {
      const message = new MessageObj(
        this.$store.getters.currentUser,
        this.content,
      )

      if (this.task) {
        const update = task;
        update.addComment(message);
        TaskRessource.updateTask(update)
      }
      else MessageRessource.addMessage(message);
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
