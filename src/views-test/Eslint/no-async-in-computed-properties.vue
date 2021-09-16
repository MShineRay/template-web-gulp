<script>
export default {
  computed: {
    /* ✓ GOOD */
    foo() {
      var bar = 0
      try {
        bar = bar / this.a
      } catch (e) {
        return 0
      } /*finally {
      }*/
      return bar
    },

    /* ✗ BAD */
    // pro() {
    //   return Promise.all([new Promise((resolve, reject) => {})])
    // },
    // foo1: async function () {
    //   return await someFunc()
    // },
    // bar() {
    //   return fetch(url).then(response => {})
    // },
    // tim() {
    //   setTimeout(() => {}, 0)
    // },
    // inter() {
    //   setInterval(() => {}, 0)
    // },
    // anim() {
    //   requestAnimationFrame(() => {})
    // },
  },
}
</script>
