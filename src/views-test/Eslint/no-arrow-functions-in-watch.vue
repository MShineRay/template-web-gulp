<template>
  <div class="test">
    test page
    <van-button @click="testAjax"> ajax </van-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  watch: {
    /* ✓ GOOD */
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    b: 'someMethod',
    c: {
      handler: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
      },
      deep: true,
    },
    d: {
      handler: 'someMethod',
      immediate: true,
    },
    e: [
      'handle1',
      function handle2(val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
      },
      {
        handler: function handle3(val, oldVal) {
          console.log('new: %s, old: %s', val, oldVal)
        },
        /* ... */
      },
    ],
    'e.f': function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    /* ✗ BAD */
    // foo: (val, oldVal) => {
    //   console.log('new: %s, old: %s', val, oldVal)
    // },
  },
}
</script>

<style lang="less" scoped>
.home {
}
</style>
