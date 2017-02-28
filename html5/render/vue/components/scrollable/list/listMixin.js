export default {
  methods: {
    handleListScroll (event) {
      this.handleScroll(event)
      const scrollTop = this.$el.scrollTop
      const top = this.$el.offsetTop

      const h = this.$children.filter(vm => vm.$refs.header)

      if (h.length <= 0) {
        return
      }

      if (scrollTop < h[0].initTop) {
        return h[0].removeSticky()
      }
      if (scrollTop > h[h.length - 1].initTop) {
        return h[h.length - 1].addSticky(top)
      }
      for (let i = 1; i < h.length; i++) {
        if (h[i - 1].initTop < scrollTop) {
          if (scrollTop < h[i].initTop && scrollTop + h[i - 1].initHeight > h[i].initTop) {
            h[i - 1].moveUp(h[i].$refs.header.offsetTop - h[i - 1].initHeight)
            h[i].removeSticky()
          }
          else if (scrollTop + h[i - 1].initHeight < h[i].initTop) {
            h[i - 1].addSticky(top)
            h[i].removeSticky()
          }
        }
      }
    }
  }
}
