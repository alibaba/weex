export default {
  name: 'loading-indicator',
  render (createElement) {
    this.weexType = 'loading-indicator'
    return createElement('mark', {
      attrs: { 'weex-type': 'loading-indicator' },
      staticClass: 'weex-loading-indicator'
    })
  }
}
