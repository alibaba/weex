import { watchAppear } from '../utils'

const supportedEvents = [
  'click', 'longpress', 'appear', 'disappear'
  // 'touchstart', 'touchmove', 'touchend'
]

export default {
  mounted () {
    watchAppear(this)
  },

  methods: {
    createEventMap (extras = []) {
      const eventMap = {}
      supportedEvents.concat(extras).forEach(name => {
        eventMap[name] = event => this.$emit(name, event)
      })
      return eventMap
    }
  }
}
