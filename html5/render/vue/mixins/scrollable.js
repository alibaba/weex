import { getThrottleLazyload } from '../utils'

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
      getThrottleLazyload(25, this.$el, 'scroll')()
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
    },

    handleTouchStart (event) {
      // event.preventDefault()
      event.stopPropagation()
      if (this._loading || this._refresh) {
        const touch = event.changedTouches[0]
        this._touchParams = {
          reachTop: this.reachTop(),
          reachBottom: this.reachBottom(),
          startTouchEvent: touch,
          startX: touch.pageX,
          startY: touch.pageY,
          timeStamp: event.timeStamp
        }
      }
    },

    handleTouchMove (event) {
      // event.preventDefault()
      event.stopPropagation()
      if (this._touchParams) {
        const inner = this.$refs.inner
        const { startY, reachTop, reachBottom } = this._touchParams
        if (inner) {
          const touch = event.changedTouches[0]
          const offsetY = touch.pageY - startY
          this._touchParams.offsetY = offsetY
          if (reachTop && this._refresh) {
            this._refresh.child.pullingDown(offsetY)
          }
          else if (reachBottom && this._loading) {
            this._loading.child.pullingUp(-offsetY)
          }
        }
      }
    },

    handleTouchEnd (event) {
      // event.preventDefault()
      event.stopPropagation()
      if (this._touchParams) {
        const inner = this.$refs.inner
        const { reachTop, reachBottom } = this._touchParams
        if (inner) {
          if (reachTop && this._refresh) {
            this._refresh.child.pullingEnd()
          }
          else if (reachBottom && this._loading) {
            this._loading.child.pullingEnd()
          }
        }
      }
      delete this._touchParams
    }
  }
}
