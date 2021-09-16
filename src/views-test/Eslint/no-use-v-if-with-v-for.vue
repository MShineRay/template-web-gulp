<template>
  <!-- ✓ GOOD -->
  <!--  <input v-for="todo in todos" v-if="todo.shown" :todo="todo" :key="todo" />-->
  <ul v-if="shown">
    <input v-for="todo in todos" :todo="todo" :key="todo" />
  </ul>

  <!-- ✗ BAD -->
  <!--  <input v-if="complete" v-for="todo in todos" :todo="todo" :key="todo" />-->
</template>
<script>
export default {
  data() {
    return {
      shown: false,
      complete: false,
      todos: [{}],
    }
  },
  methods: {
    switchTest(val) {
      switch (val) {
        case 1:
          break
        case 2:
          break
      }
    },
  },
}
</script>
