'use strict'

const proto = {
  create () {
    const node = document.createElement('div')
    node.classList.add('weex-container')
    node.style.overflow = 'hidden'
    // fix page shaking during slider's playing
    node.style.webkitTransform = 'translate3D(0,0,0)'
    node.addEventListener('webkitTransitionEnd', this.end.bind(this), false)
    return node
  },

  createChildren () {
    // first run:
    // - create each child
    // - append to parentNode
    // - find current and next
    // - set current and next shown and others hidden
    const children = this.data.children
    const parentRef = this.data.ref
    const instanceId = this.data.instanceId
    const items = []
    const componentManager = this.getComponentManager()

    let fragment, isFlex, child, i

    if (children && children.length) {
      fragment = document.createDocumentFragment()
      isFlex = false
      for (i = 0; i < children.length; i++) {
        children[i].instanceId = instanceId
        child = componentManager.createElement(children[i])
        child.parentRef = parentRef
        this.initChild(child)
        // append and push
        items.push(child)
        fragment.appendChild(child.node)
        if (!isFlex && child.data.style.hasOwnProperty('flex')) {
          isFlex = true
        }
      }
      this.node.appendChild(fragment)
    }

    // set items
    this.items = items

    // reset the clock for first transition
    this.reset()
  },

  appendChild (data) {
    // dom + items
    const componentManager = this.getComponentManager()
    // const componentManager = ComponentManager.getInstance(this.data.instanceId)
    const child = componentManager.createElement(data)
    this.initChild(child)
    this.node.appendChild(child.node)
    this.items.push(child)
    this.reset()
    return child // @todo redesign Component#appendChild(component)
  },

  insertBefore (child, before) {
    // dom + items
    const index = this.items.indexOf(before)
    this.items.splice(index, 0, child)
    this.initChild(child)
    this.node.insertBefore(child.node, before.node)
    this.reset()
  },

  removeChild (child) {
    // dom + items
    const index = this.items.indexOf(child)
    this.items.splice(index, 1)
    this.node.removeChild(child.node)
    this.reset()
  },

  initChild (child) {
    const node = child.node
    node.style.position = 'absolute'
    node.style.top = '0'
    node.style.left = '0'
  },

  /**
   * status: {
   *   current: {translateY: 0, shown: true},
   *   next: {translateY: height, shown: true},
   *   others[]: {shown: false}
   *   index: index
   * }
   */
  reset () {
    const interval = this.interval - 0
    const delay = this.delay - 0
    const items = this.items
    const self = this

    const loop = function () {
      self.next()
      self.timerId = setTimeout(loop, self.interval)
    }

    // reset display and transform
    items.forEach(function (item, index) {
      const node = item.node
      // set non-current(0)|next(1) item hidden
      node.style.display = index > 1 ? 'none' : ''
      // set next(1) item translateY
      // TODO: it supposed to use item.data.style
      // but somehow the style object is empty.
      // This problem relies on jsframework's bugfix.

      // node.style.transform = index === 1
      //     ? 'translate3D(0,' + item.data.style.height + 'px,0)'
      //     : ''
      // node.style.webkitTransform = index === 1
      //     ? 'translate3D(0,' + item.data.style.height + 'px,0)'
      //     : ''
      node.style.transform = index === 1
          ? 'translate3D(0,' + self.data.style.height + 'px,0)'
          : ''
      node.style.webkitTransform = index === 1
          ? 'translate3D(0,' + self.data.style.height + 'px,0)'
          : ''
    })

    setTimeout(function () {
      // reset current, next, index
      self.currentItem = items[0]
      self.nextItem = items[1]
      self.currentIndex = 0

      items.forEach(function (item, index) {
        const node = item.node
        // set transition
        node.style.transition = 'transform '
            + self.transitionDuration
            + 'ms ease'
        node.style.webkitTransition = '-webkit-transform '
            + self.transitionDuration
            + 'ms ease'
      })

      clearTimeout(self.timerId)

      if (items.length > 1) {
        self.timerId = setTimeout(loop, delay + interval)
      }
    }, 13)
  },

  /**
   * next:
   * - current: {translateY: -height}
   * - next: {translateY: 0}
   */
  next () {
    // - update state
    //   - set current and next transition
    //   - hide current when transition end
    //   - set next to current
    //   - find new next
    const next = this.nextItem.node
    const current = this.currentItem.node
    this.transitionIndex = this.currentIndex

    // Use setTimeout to fix the problem that when the
    // page recover from backstage, the slider will
    // not work any longer.
    setTimeout(function () {
      next.style.transform = 'translate3D(0,0,0)'
      next.style.webkitTransform = 'translate3D(0,0,0)'
      current.style.transform = 'translate3D(0,-'
          + this.data.style.height
          + 'px,0)'
      current.style.webkitTransform = 'translate3D(0,-'
          + this.data.style.height
          + 'px,0)'
      this.fireEvent('change')
    }.bind(this), 300)
  },

  fireEvent (type) {
    const length = this.items.length
    const nextIndex = (this.currentIndex + 1) % length
    const evt = document.createEvent('HTMLEvents')
    evt.initEvent(type, false, false)
    evt.data = {
      prevIndex: this.currentIndex,
      index: nextIndex
    }
    this.node.dispatchEvent(evt)
  },

  /**
   * end:
   * - old current: {shown: false}
   * - old current: {translateY: 0}
   * - index++ % length
   * - new current = old next
   * - new next = items[index+1 % length]
   * - new next: {translateY: height}
   * - new next: {shown: true}
   */
  end (e) {
    const items = this.items
    const length = items.length
    let currentIndex

    currentIndex = this.transitionIndex

    if (isNaN(currentIndex)) {
      return
    }
    delete this.transitionIndex

    const current = this.currentItem.node
    current.style.display = 'none'
    current.style.webkitTransform = ''

    currentIndex = (currentIndex + 1) % length
    const nextIndex = (currentIndex + 1) % length

    this.currentIndex = currentIndex
    this.currentItem = this.nextItem
    this.nextItem = items[nextIndex]

    setTimeout(function () {
      const next = this.nextItem.node
      // TODO: it supposed to use this.nextItem.data.style
      // but somehow the style object is empty.
      // This problem relies on jsframework's bugfix.

      next.style.webkitTransform = 'translate3D(0,'
          + this.data.style.height
          + 'px,0)'
      next.style.display = ''
      this.fireLazyload(next)
    }.bind(this))
  },

  clearAttr () {
    this.interval = 5 * 1000
    this.transitionDuration = 500
    this.delay = 0
  }
}

const attr = {
  interval: function (value) {
    this.interval = value
  },
  transitionDuration: function (value) {
    this.transitionDuration = value
  },
  delay: function (value) {
    this.delay = value
  }
}

function init (Weex) {
  const Component = Weex.Component
  const extend = Weex.utils.extend

  function Marquee (data) {
    this.interval = Number(data.attr.interval) || 5 * 1000
    this.transitionDuration = Number(data.attr.transitionDuration) || 500
    this.delay = Number(data.attr.delay) || 0
    Component.call(this, data)
  }
  Marquee.prototype = Object.create(Component.prototype)
  extend(Marquee.prototype, proto)
  extend(Marquee.prototype, { attr })

  Weex.registerComponent('marquee', Marquee)
}

export default { init }
