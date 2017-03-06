import { throttle } from './func'
import { createEvent } from '../utils'

export function getParentScroller (vnode) {
  if (!vnode) return null
  if (vnode.weexType === 'scroller' || vnode.weexType === 'list') {
    return vnode
  }
  return getParentScroller(vnode.$parent)
}

export function hasIntersection (rect, ctRect) {
  return (rect.left < ctRect.right && rect.right > ctRect.left)
    && (rect.top < ctRect.bottom && rect.bottom > ctRect.top)
}

/**
 * [isElementVisible description]
 * @param  {HTMLElement}  el    a dom element.
 * @param  {HTMLElement}  container  optional, the container of this el.
 */
export function isElementVisible (el, container) {
  const ctRect = container && container.getBoundingClientRect()
    || {
      top: 0,
      left: 0,
      bottom: window.innerHeight,
      right: window.innerWidth
    }
  return hasIntersection(
    el.getBoundingClientRect(),
    ctRect)
}

export function isComponentVisible (component) {
  if (component.$el) {
    const scroller = getParentScroller(component)
    if (scroller && scroller.$el) {
      return hasIntersection(
        component.$el.getBoundingClientRect(),
        scroller.$el.getBoundingClientRect()
      )
    }
  }
  return false
}

// TODO: improve the efficiency
export function watchAppear (context) {
  if (!context) return null

  context.$nextTick(() => {
    if (context.$options && context.$options._parentListeners) {
      const on = context.$options._parentListeners
      if (on.appear || on.disappear) {
        const scroller = getParentScroller(context)
        const element = (scroller && scroller.$el) || window
        let lastScrollTop = element.scrollTop

        context._visible = isComponentVisible(context)
        if (context._visible && on.appear) {
          if (on.appear.fn) {
            on.appear = on.appear.fn
          }
          on.appear(createEvent(context.$el, 'appear', { direction: 'down' }))
        }
        const handler = throttle(event => {
          const visible = isComponentVisible(context)
          let listener = null
          let type = null
          if (visible !== context._visible) {
            context._visible = visible
            if (visible) {
              listener = on.appear
              type = 'appear'
            }
            else {
              listener = on.disappear
              type = 'disappear'
            }
            if (listener.fn) {
              listener = listener.fn
            }
            listener(createEvent(context.$el, type, {
              direction: element.scrollTop > lastScrollTop ? 'down' : 'up'
            }))
            lastScrollTop = element.scrollTop
          }
        }, 10)

        element.addEventListener('scroll', handler, false)
      }
    }
  })
}
