import { base } from '../mixins'
import { validateStyles } from '../validator'

export default {
  mixins: [base],
  props: {
    checked: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      isChecked: (this.checked !== 'false' && this.checked !== false),
      isDisabled: (this.disabled !== 'false' && this.disabled !== false)
    }
  },
  computed: {
    wrapperClass () {
      const classArray = ['weex-switch']
      this.isChecked && classArray.push('weex-switch-checked')
      this.isDisabled && classArray.push('weex-switch-disabled')
      return classArray.join(' ')
    }
  },
  methods: {
    toggle () {
      // TODO: handle the events
      if (!this.isDisabled) {
        this.isChecked = !this.isChecked
        this.$emit('change', { value: this.isChecked })
      }
    }
  },

  render (createElement) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      validateStyles('switch', this.$vnode.data && this.$vnode.data.staticStyle)
    }

    return createElement('span', {
      attrs: { 'weex-type': 'switch' },
      staticClass: this.wrapperClass,
      on: {
        click: event => {
          this.$emit('click', event)
          this.toggle()
        }
      }
    }, [createElement('small', { staticClass: 'weex-switch-inner' })])
  }
}
