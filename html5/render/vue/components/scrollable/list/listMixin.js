export default {
  methods: {
    moveTo (offsetY = 0, done) {
      const inner = this.$refs.inner
      if (inner) {
        inner.style.willChange = `transform`
        inner.style.transition = `transform .2s ease-in-out`
        inner.style.transform = `translate3d(0, ${offsetY}, 0)`
        setTimeout(() => {
          inner.style.transition = ''
          inner.style.willChange = ''
          done && done()
        }, 200)
      }
    },

    done () {
      this.moveTo(0)
      this._refresh && this._refresh.child.reset()
      this._loading && this._loading.child.reset()
    },

    showRefresh () {
      this.moveTo('1.6rem')
      if (this._refresh && this._refresh.child) {
        this._refresh.child.show()
      }
    },

    showLoading () {
      this.moveTo('-1.6rem')
      if (this._loading && this._loading.child) {
        this._loading.child.show()
      }
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
        if (inner && (reachTop && this._refresh || reachBottom && this._loading)) {
          const touch = event.changedTouches[0]
          const offsetY = touch.pageY - startY
          this._touchParams.offsetY = offsetY
          if (offsetY) {
            inner.style.transform = `translate3d(0, ${offsetY}px, 0)`
          }
        }
      }
    },

    handleTouchEnd (event) {
      // event.preventDefault()
      event.stopPropagation()
      if (this._touchParams) {
        const inner = this.$refs.inner
        const { offsetY, reachTop, reachBottom } = this._touchParams
        if (inner && (reachTop && this._refresh || reachBottom && this._loading)) {
          if (offsetY > 120) {
            this.showRefresh()
          }
          else if (offsetY < -120) {
            this.showLoading()
          }
          else {
            this.done(0)
          }
        }
      }
      delete this._touchParams
    },

    handleListScroll (event) {
      this.handleScroll(event)
      const scrollTop = this.$el.scrollTop
      const top = this.$el.offsetTop

      const h = this.$children.filter(vm => vm.$refs.header)
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
