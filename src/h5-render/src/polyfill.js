'use strict'

if (!window.Promise) {
  console.warn('native Promise is missing, using polyfill instead.')
  require('es6-promise').Promise
}