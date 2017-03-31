const TRANSITION_TIME = 200

export default {
  methods: {
    // get standard index
    normalizeIndex (index) {
      const newIndex = (index + this.frameCount) % this.frameCount
      return Math.min(Math.max(newIndex, 0), this.frameCount - 1)
    },

    slideTo (index) {
      const newIndex = this.normalizeIndex(index)
      this.innerOffset += Math.sign(this.currentIndex - index) * this.wrapperWidth

      const inner = this.$refs.inner
      if (inner) {
        // TODO: will-change | set styles together
        inner.style.transition = `transform .2s ease-in-out`
        inner.style.transform = `translate3d(${this.innerOffset}px, 0, 0)`
        setTimeout(() => {
          inner.style.transition = ''
        }, TRANSITION_TIME)
      }

      if (newIndex !== this.currentIndex) {
        this.currentIndex = newIndex
        this.$emit('change', this.createEvent('change', {
          index: this.currentIndex
        }))
        setTimeout(() => { this.reorder() }, TRANSITION_TIME)
      }
    },

    reorder () {
      this.$nextTick(() => {
        const prevIndex = this.normalizeIndex(this.currentIndex - 1)
        const nextIndex = this.normalizeIndex(this.currentIndex + 1)
        // TODO: clone frame when prevIndex === nextIndex
        // if (prevIndex !== nextIndex) {
        // }
        const prevCell = this._cells[prevIndex]
        const nextCell = this._cells[nextIndex]
        if (prevCell && prevCell.elm) {
          const prevOffset = -this.wrapperWidth - this.innerOffset
          prevCell.elm.style.transform = `translate3d(${prevOffset}px, 0, 0)`
        }
        if (nextCell && nextCell.elm) {
          const nextOffset = this.wrapperWidth - this.innerOffset
          nextCell.elm.style.transform = `translate3d(${nextOffset}px, 0, 0)`
        }
      })
    },

    next () {
      this.slideTo(this.currentIndex + 1)
    },

    prev () {
      this.slideTo(this.currentIndex - 1)
    },

    handleTouchStart (event) {
      event.preventDefault()
      event.stopPropagation()
      // console.log('touch start', event)
      const touch = event.changedTouches[0]
      // console.log('touch start', event.target, event.target.pageY)
      // console.log('touches', touch)
      this._touchParams = {
        originalTransform: this.$refs.inner.style.transform,
        startTouchEvent: touch,
        startX: touch.pageX,
        startY: touch.pageY,
        timeStamp: event.timeStamp
      }
    },

    handleTouchMove (event) {
      event.preventDefault()
      event.stopPropagation()
      // console.log('touch move')
      if (this._touchParams) {
        const inner = this.$refs.inner
        const { startX } = this._touchParams
        const touch = event.changedTouches[0]
        const offsetX = touch.pageX - startX
        // console.log('offsetX', offsetX, 'startX', startX, 'pageX', touch.pageX)
        this._touchParams.offsetX = offsetX

        if (inner && offsetX) {
          inner.style.transform = `translate3d(${this.innerOffset + offsetX}px, 0, 0)`
        }
      }
    },

    handleTouchEnd (event) {
      event.preventDefault()
      event.stopPropagation()
      // console.log('touch end')
      const inner = this.$refs.inner
      if (this._touchParams) {
        const { offsetX } = this._touchParams
        if (inner) {
          const reset = Math.abs(offsetX / this.wrapperWidth) < 0.2
          const direction = offsetX > 0 ? 1 : -1
          const newIndex = reset ? this.currentIndex : (this.currentIndex - direction)
          this.slideTo(newIndex)
        }
      }
      delete this._touchParams
    }
  }
}
