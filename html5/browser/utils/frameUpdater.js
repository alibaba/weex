'use strict'

const raf = window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          function (calllback) {
            setTimeout(calllback, 16)
          }

let rafId
const observers = []
let paused = false

const FrameUpdater = {
  start: function () {
    if (rafId) {
      return
    }

    rafId = raf(function runLoop () {
      if (!paused) {
        for (let i = 0; i < observers.length; i++) {
          observers[i]()
        }
        raf(runLoop)
      }
    })
  },

  isActive: function () {
    return !paused
  },

  pause: function () {
    paused = true
    rafId = undefined
  },

  resume: function () {
    paused = false
    this.start()
  },

  addUpdateObserver: function (observeMethod) {
    observers.push(observeMethod)
  }
}

module.exports = FrameUpdater
