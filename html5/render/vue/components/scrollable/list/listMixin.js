import { supportSticky } from '../../../utils/style'

export default {
  methods: {
    handleListScroll (event) {
      this.handleScroll(event)

      if (supportSticky()) {
        return
      }

      const scrollTop = this.$el.scrollTop
      const h = this.$children.filter(vm => vm.$refs.header)

      if (h.length <= 0) {
        return
      }

      for (let i = 0; i < h.length; i++) {
        if (h[i].initTop < scrollTop) {
          h[i].addSticky()
        }
        else {
          h[i].removeSticky()
        }
      }
    }
  }
}
