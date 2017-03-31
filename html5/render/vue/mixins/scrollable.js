
export default {
  methods: {
    updateLayout () {
      const wrapper = this.$refs.wrapper
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect()
        this.wrapperWidth = rect.width
        this.wrapperHeight = rect.height
      }
    },

    handleScroll (event) {
      if (this.reachBottom()) {
        this.$emit('loadmore', event)
      }
    },

    reachTop () {
      const wrapper = this.$refs.wrapper
      return (!!wrapper) && (wrapper.scrollTop <= 0)
    },

    reachBottom () {
      const wrapper = this.$refs.wrapper
      const inner = this.$refs.inner
      const offset = Number(this.loadmoreoffset) || 0

      if (wrapper && inner) {
        const innerHeight = inner.getBoundingClientRect().height
        const wrapperHeight = wrapper.getBoundingClientRect().height
        return wrapper.scrollTop >= innerHeight - wrapperHeight - offset
      }
      return false
    }
  }
}
