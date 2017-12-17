<<template>
  <div class="app">
    <board v-if="view === 'board'" v-bind:title="title"></board>
    <login v-else-if="view=='login'" v-bind:title="title"></login>
  </div>
</template>


<script>
import Board from './components/board/Board.vue';
import Login from './components/login/Login.vue';

export default {
  name: 'app',
  data() {
    return {
      title: 'Project 20W',
      view: 'login',
    }
  },
  components: {
    Board,
    Login,
  }
}
</script>

<style>
  .app {
      height: 100%;
      width: 100%;
  }
</style>
