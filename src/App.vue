<template>
  <div id="app">
    <div class="container">
      <Board />
    </div>
  </div>
</template>

<script>
import Board from './components/Board/Board.vue';

export default {
  name: 'app',
  components: {
    Board,
  },
};
</script>
