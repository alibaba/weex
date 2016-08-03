/* global lib, HTMLElement */

'use strict'

require('lazyimg')

let lazyloadTimer

// fire lazyimg on images.
function fire () {
  lib.img.fire()
}

// we don't know when all images are appended
// just use setTimeout to do delay lazyload
//
// -- actually everytime we add a element or update styles,
// the component manager will call startIfNeed to fire
// lazyload once again in the handleAppend function. so there
// is no way that any image element can miss it. See source
// code in componentMangager.js.

// component is not a dom element but a weex component.
function startIfNeeded (component) {
  if (component.data.type === 'image') {
    if (!lazyloadTimer) {
      lazyloadTimer = setTimeout(function () {
        fire()
        clearTimeout(lazyloadTimer)
        lazyloadTimer = null
      }, 16)
    }
  }
}

// elementScope is a dom element.
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

export function fireLazyload (component) {
  if (component instanceof HTMLElement) {
    loadIfNeeded(component)
  }
  else {
    startIfNeeded(component)
  }
}

