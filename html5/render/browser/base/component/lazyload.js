/* global lib, HTMLElement */

'use strict'

import 'lazyimg'

let lazyloadTimer

// fire lazyimg on images.
function fire () {
  setTimeout(() => lib.img.fire(), 0)
}

// we don't know when all images are appended
// just use setTimeout to do delay lazyload
//
// -- actually everytime we add a element or update styles,
// the component manager will call startIfNeed to fire
// lazyload once again in the handleAppend function. so there
// is no way that any image element can miss it. See source
// code in componentMangager.js.

// just for the image component to start lazyload.
function startIfNeeded (target) {
  if (!lazyloadTimer) {
    lazyloadTimer = setTimeout(function () {
      fire()
      clearTimeout(lazyloadTimer)
      lazyloadTimer = null
    }, 16)
  }
}

// for a scope of element, not for a image.
function loadIfNeeded (elementScope) {
  const notPreProcessed = elementScope.querySelectorAll('[img-src]')
  // image elements which have attribute 'i-lazy-src' were elements
  // that had been preprocessed by lib-img-core, but not loaded yet, and
  // must be loaded when 'appear' events were fired. It turns out the
  // 'appear' event was not fired correctly in the css-translate-transition
  // situation, so 'i-lazy-src' must be checked and lazyload must be
  // fired manually.
  const preProcessed = elementScope.querySelectorAll('[i-lazy-src]')
  if (notPreProcessed.length > 0 || preProcessed.length > 0) {
    fire()
  }
}

export function makeImageLazy (image, src) {
  image.removeAttribute('img-src')
  image.removeAttribute('i-lazy-src')
  image.removeAttribute('src')
  image.setAttribute('img-src', src)
  fire()
}

export function fireLazyload (target) {
  if (typeof target === 'object' && !(target instanceof HTMLElement)) {
    target = target.node
  }
  if (!target) {
    return
  }
  if (target.tagName.toLowerCase() === 'image') {
    return startIfNeeded(target)
  }
  return loadIfNeeded(target)
}
