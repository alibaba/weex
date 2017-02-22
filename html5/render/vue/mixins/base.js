import { watchAppear, fireLazyload } from '../utils'

const supportedEvents = [
  'click', 'longpress', 'appear', 'disappear'
  // 'touchstart', 'touchmove', 'touchend'
]

const scrollableTypes = ['scroller', 'list']

// function watchLazyload (context) {
//   [
//     'scroll',
//     'transitionend',
//     'webkitTransitionEnd',
//     'animationend',
//     'webkitAnimationEnd',
//     'resize'
//   ].forEach(evt => {
//     fireLazyload(document.body)
//   })
// }

function _getParentScroller (vnode) {
  if (!vnode) return null
  if (scrollableTypes.indexOf(vnode.weexType) > -1) {
    return vnode
  }
  return _getParentScroller(vnode.$parent)
}

export default {
  mounted () {
    watchAppear(this)
    // watchLazyload(this)
  },

  methods: {
    createEventMap (extras = []) {
      const eventMap = {}
      supportedEvents.concat(extras).forEach(name => {
        eventMap[name] = event => this.$emit(name, event)
      })
      return eventMap
    },

    getParentScroller () {
      return _getParentScroller(this.$vnode)
    },

    fireLazyload () {
      const scroller = this.getParentScroller()
      fireLazyload(scroller && scroller.$el || document.body)
    }
  }
}
