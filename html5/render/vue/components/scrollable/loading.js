import LoadingIndicator from './loading-indicator'

export default {
  // name: 'loading',
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
      this.$emit('loading')
      this.height = '1.6rem'
      this.visibility = 'visible'
    },
    reset () {
      this.height = 0
      this.visibility = 'hidden'
      this.$emit('loadingfinish')
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
      ref: 'loading',
      attrs: { 'weex-type': 'loading' },
      style: { height: this.height, visibility: this.visibility },
      staticClass: 'weex-loading'
    }, this.getChildren())
  }
}
