import { base, event } from '../../mixins'
import { validateStyles } from '../../validator'
import { throttle, bind, extend } from '../../utils'
import indicator from './indicator'
import slideMixin from './slideMixin'

export default {
  mixins: [base, event, slideMixin],
  props: {
    'auto-play': {
      type: [String, Boolean],
      default: false
    },
    interval: {
      type: [String, Number],
      default: 3000
    }
  },

  data () {
    return {
      currentIndex: 0,
      frameCount: 0
    }
  },

  methods: {
    computeWrapperSize () {
      const wrapper = this.$refs.wrapper
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect()
        this.wrapperWidth = rect.width
        this.wrapperHeight = rect.height
      }
    },

    updateLayout () {
      this.computeWrapperSize()
      const inner = this.$refs.inner
      if (inner) {
        inner.style.width = this.wrapperWidth * this.frameCount + 'px'
      }
    },

    formatChildren (createElement) {
      const children = this.$slots.default || []
      let indicatorVnode
      const cells = children.filter(vnode => {
        if (!vnode.tag) return false
        if (vnode.componentOptions && vnode.componentOptions.tag === 'indicator') {
          indicatorVnode = vnode
          return false
        }
        return true
      }).map(vnode => {
        return createElement('li', {
          ref: 'cells',
          staticClass: 'weex-slider-cell'
        }, [vnode])
      })
      this._indicator = createElement(indicator, {
        staticClass: indicatorVnode.data.staticClass,
        staticStyle: indicatorVnode.data.staticStyle,
        attrs: {
          count: cells.length,
          active: this.currentIndex
        }
      })
      return cells
    }
  },

  created () {
    this.weexType = 'slider'
    this.currentIndex = 0
    this.innerOffset = 0
    this._indicator = null
    this.$nextTick(() => {
      this.updateLayout()
    })
  },

  beforeUpdate () {
    this.updateLayout()
    this.reorder()
  },

  mounted () {
    if (this.autoPlay && this.autoPlay !== 'false') {
      const interval = Number(this.interval)
      this._lastSlideTime = Date.now()

      const autoPlayFn = bind(function () {
        clearTimeout(this._autoPlayTimer)
        const now = Date.now()
        let nextTick = interval - now + this._lastSlideTime
        nextTick = nextTick > 100 ? nextTick : interval

        this.next()
        this._lastSlideTime = now
        this._autoPlayTimer = setTimeout(autoPlayFn, nextTick)
      }, this)

      this._autoPlayTimer = setTimeout(autoPlayFn, interval)
    }

    this.reorder()
  },

  render (createElement) {
    this.prerender()
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      validateStyles('slider', this.$vnode.data && this.$vnode.data.staticStyle)
    }

    this._cells = this.formatChildren(createElement)
    this.frameCount = this._cells.length

    return createElement(
      'nav',
      {
        ref: 'wrapper',
        attrs: { 'weex-type': 'slider' },
        staticClass: 'weex-slider weex-slider-wrapper',
        on: extend(this.createEventMap(), {
          touchstart: this.handleTouchStart,
          touchmove: throttle(bind(this.handleTouchMove, this), 25),
          touchend: this.handleTouchEnd
        })
      },
      [
        createElement('ul', {
          ref: 'inner',
          staticClass: 'weex-slider-inner'
        }, this._cells),
        this._indicator
      ]
    )
  }
}
