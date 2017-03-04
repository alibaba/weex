import { isElementVisible } from './component'
import { createEvent, dispatchEvent } from './event'
import { throttle } from './func'
import { isArray } from './type'

function preLoadImg (src, loadCallback, errorCallback) {
  const img = new Image()
  img.onload = loadCallback ? loadCallback.bind(img) : null
  img.onerror = errorCallback ? errorCallback.bind(img) : null
  img.src = src
}

export function applySrc (item, src, placeholderSrc) {
  if (!src) { return }
  function finallCb () {
    item.removeAttribute('img-src')
  }
  preLoadImg(src, function () {
    item.style.backgroundImage = `url(${src})`
    const { width: naturalWidth, height: naturalHeight } = this
    dispatchEvent(item, createEvent(item, 'load', { naturalWidth, naturalHeight }))
    finallCb()
  }, function () {
    dispatchEvent(item, createEvent(item, 'error'))
    if (placeholderSrc) {
      preLoadImg(placeholderSrc, function () {
        item.style.backgroundImage = `url(${placeholderSrc})`
      })
    }
    finallCb()
  })
}

export function fireLazyload (el) {
  if (isArray(el)) {
    return el.forEach(ct => fireLazyload(ct))
  }
  const imgs = (el || document.body).querySelectorAll('[img-src]')
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i]
    if (isElementVisible(img, el)) {
      applySrc(img, img.getAttribute('img-src'), img.getAttribute('img-placeholder'))
    }
  }
}

/**
 * cache a throttle lazyload function for every container element
 * once for different wait times separate.
 *   the architecture of this cache:
 *      cache: {
 *        el.id: {
 *          wait: throttledFunction () { ... }
 *        }
 *      }
 */
const cache = {}
let _uid = 0
export function getThrottleLazyload (wait = 16, el = document.body, tag) {
  let id = el.dataset.throttleId
  if (!id) {
    id = _uid++
    el.setAttribute('data-throttle-id', id)
  }

  !cache[id] && (cache[id] = {})
  const throttled = cache[id][wait] ||
    (cache[id][wait] = throttle(
      fireLazyload.bind(this, el),
      parseFloat(wait),
      // true for callLastTime.
      // to trigger once more time after the last throttled function called with a little more delay.
      true)
    )
  return throttled
}
