import { base, event, scrollable } from '../../../mixins'
import { validateStyles } from '../../../validator'
import { extend } from '../../../utils'
import * as shared from '../shared'
import listMixin from './listMixin'

export default {
  mixins: [base, event, scrollable, listMixin],
  props: {
    loadmoreoffset: {
      type: [String, Number],
      default: 0
    }
  },

  computed: {
    wrapperClass () {
      const classArray = ['weex-list', 'weex-list-wrapper']
      this._refresh && classArray.push('with-refresh')
      this._loading && classArray.push('with-loading')
      return classArray.join(' ')
    }
  },

  methods: {
    createChildren (h) {
      const slots = this.$slots.default || []
      this._cells = slots.filter(vnode => {
        if (!vnode.tag || !vnode.componentOptions) return false
        switch (vnode.componentOptions.tag) {
          case 'loading': this._loading = shared.createLoading(this, h, vnode); return false
          case 'refresh': this._refresh = shared.createRefresh(this, h, vnode); return false
        }
        return true
      })
      return [
        this._refresh,
        h('html:div', {
          ref: 'inner',
          staticClass: 'weex-list-inner'
        }, this._cells),
        this._loading
      ]
    }
  },

  render (createElement) {
    this.weexType = 'list'

    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      validateStyles('list', this.$vnode.data && this.$vnode.data.staticStyle)
    }

    this.$nextTick(() => {
      this.updateLayout()
    })

    return createElement('main', {
      ref: 'wrapper',
      attrs: { 'weex-type': 'list' },
      staticClass: this.wrapperClass,
      on: extend(this.createEventMap(), {
        scroll: this.handleListScroll,
        touchstart: this.handleTouchStart,
        touchmove: this.handleTouchMove,
        touchend: this.handleTouchEnd
      })
    }, this.createChildren(createElement))
  }
}
