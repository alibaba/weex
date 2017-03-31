import LoadingIndicator from './loading-indicator'

export default {
  // name: 'refresh',
  components: { LoadingIndicator },
  props: {
    display: {
      type: String,
      default: 'show',
      validator (value) {
        return ['show', 'hide'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      height: 0
    }
  },
  methods: {
    show () {
      // TODO: no fixed height
      this.$emit('refresh')
      this.height = '1.6rem'
      this.visibility = 'visible'
    },
    reset () {
      this.height = 0
      this.visibility = 'hidden'
      this.$emit('refreshfinish')
    },
    getChildren () {
      const children = this.$slots.default || []
      if (this.display === 'show') {
        return children
      }
      return children.filter(vnode => {
        return vnode.componentOptions
          && vnode.componentOptions.tag !== 'loading-indicator'
      })
    }
  },
  render (createElement) {
    return createElement('aside', {
      ref: 'refresh',
      attrs: { 'weex-type': 'refresh' },
      style: { height: this.height, visibility: this.visibility },
      staticClass: 'weex-refresh'
    }, this.getChildren())
  }
}
