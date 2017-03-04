import { throttle } from './func'

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
        context._visible = isComponentVisible(context)
        if (context._visible) {
          // TODO: create custom event object
          on.appear && on.appear({})
        }
        const handler = throttle(event => {
          const visible = isComponentVisible(context)
          if (visible !== context._visible) {
            context._visible = visible
            const listener = visible ? on.appear : on.disappear
            if (listener) {
              listener(event)
            }
          }
        }, 10)

        // TODO: more reliable
        const scroller = getParentScroller(context)
        const element = (scroller && scroller.$el) || window
        element.addEventListener('scroll', handler, false)
      }
    }
  })
}
