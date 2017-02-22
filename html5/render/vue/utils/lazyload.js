import { isElementVisible } from './component'

function preLoadImg (src, loadCallback, errorCallback) {
  const img = new Image()
  img.src = src
  img.onload = loadCallback ? loadCallback.bind(img) : null
  img.onerror = errorCallback ? errorCallback.bind(img) : null
}

export function applySrc (item, src, placeholderSrc) {
  if (!src) { return }
  function finallCb () {
    item.removeAttribute('img-src')
  }
  const context = item.__vue__
  preLoadImg(src, function () {
    item.style.backgroundImage = `url(${src})`
    const { width: naturalWidth, height: naturalHeight } = this
    context.$emit(context.createEvent(item, 'load', {
      naturalWidth, naturalHeight
    }))
    finallCb()
  }, function () {
    context.$emit(context.createEvent(item, 'error'))
    if (!placeholderSrc) { return }
    preLoadImg(placeholderSrc, function () {
      item.style.backgroundImage = `url(${placeholderSrc})`
    })
    finallCb()
  })
}

export function fireLazyload (container) {
  const ct = container || document.body
  const imgs = ct.querySelectorAll('[img-src]')
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i]
    if (isElementVisible(img, ct)) {
      applySrc(img, img.getAttribute('img-src'), img.getAttribute('img-placeholder'))
    }
  }
}
