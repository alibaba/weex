import { extend } from '../utils'

export default {
  methods: {
    /**
     * Create Event.
     * @param {DOMString} type
     * @param {Object} props
     */
    createEvent (context, type, props) {
      const event = new Event(type, { bubbles: false })
      // event.preventDefault()
      event.stopPropagation()

      extend(event, props)

      Object.defineProperty(event, 'target', {
        enumerable: true,
        value: context || null
      })

      return event
    },

    /**
     * Create Custom Event.
     * @param {DOMString} type
     * @param {Object} props
     */
    createCustomEvent (context, type, props) {
      // compatibility: http://caniuse.com/#search=customevent
      // const event = new CustomEvent(type)
      const event = document.createEvent('CustomEvent')
      event.initCustomEvent(type, false, true, {})
      // event.preventDefault()
      event.stopPropagation()

      extend(event, props)

      // TODO: event.target is readonly
      // Object.defineProperty(event, 'target', {
      //   enumerable: true,
      //   value: context || null
      // })

      return event
    },

    /**
     * Check and emit longpress event.
     * @param {Object} event
     */
    handleLongPress (context, event) {
      // TODO: check the condition
      context.$emit('longpress', context.createCustomEvent('longpress'))
    },

    /**
     * Check and emit appear event.
     * @param {Object} event
     */
    handleAppear (context, event) {
      // TODO: check the condition
      context.$emit('appear', context.createCustomEvent('appear'))
    },

    /**
     * Check and emit disappear event.
     * @param {Object} event
     */
    handDisappear (context, event) {
      // TODO: check the condition
      context.$emit('disappear', context.createCustomEvent('disappear'))
    }
  }
}
