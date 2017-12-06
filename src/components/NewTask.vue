<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5 text-gray">{{title}}</div>
      <div class="card-subtitle text-gray">
        <input class="form-input" type="text" id="input-example-1" placeholder="title" />
      </div>
    </div>
    <div class="card-body">
      <textarea class="form-input" type="text" placeholder="description" rows="3" />
    </div>
    <div class="card-footer">
      <button class="btn btn-success btn-action circle">
        <i class="icon icon-check"></i>
      </button>
      <button class="btn btn-error btn-action circle" v-on:click="dismiss">
        <i class="icon icon-cross"></i>
      </button>
    </div>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'new-task',
  store,
  data () {
    return {}
  },
  props: [
    'title',
    'dismiss',
  ]
}
</script>

<style lang="scss">
</style>
