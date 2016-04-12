'use strict'

var Atomic = require('./atomic')
var utils = require('../utils')
require('../styles/video.scss')

// attrs:
//   - autoPlay: true | false (default: false)
//   - playStatus: play | pause | stop
//   - src: {string}
//   - poster: {string}
//   - loop: true | false (default: false)
//   - muted: true | false (default: false)
// events:
//   - start
//   - pause
//   - finish
//   - fail
function Video (data) {
  var autoPlay = data.attr.autoPlay
  var playStatus = data.attr.playStatus
  this.autoPlay = autoPlay === true || autoPlay === 'true'
  if (playStatus !== 'play'
      && playStatus !== 'stop'
      && playStatus !== 'pause') {
    this.playStatus = 'pause'
  } else {
    this.playStatus = playStatus
  }
  Atomic.call(this, data)
}

Video.prototype = Object.create(Atomic.prototype)

Video.prototype.attr = {
  playStatus: function (val) {
    if (val !== 'play' && val !== 'stop' && val !== 'pause') {
      val = 'pause'
    }
    if (this.playStatus === val) {
      return
    }
    this.playStatus = val
    this.node.setAttribute('play-status', val)
    this[this.playStatus]()
  },
  autoPlay: function (val) {
    // DO NOTHING
  }
}

Video.prototype.create = function () {
  var node = document.createElement('video')
  node.classList.add('weex-video')
  node.controls = true
  node.autoplay = this.autoPlay
  node.setAttribute('play-status', this.playStatus)
  this.node = node
  if (this.autoPlay && this.playStatus === 'play') {
    this.play()
  }
  return node
}

Video.prototype.bindEvents = function (evts) {
  Atomic.prototype.bindEvents.call(this, evts)

  // convert w3c-video events to weex-video events.
  var evtsMap = {
    start: 'play',
    finish: 'ended',
    fail: 'error'
  }
  for (var evtName in evtsMap) {
    this.node.addEventListener(evtsMap[evtName], function (type, e) {
      this.dispatchEvent(type, e.data)
    }.bind(this, evtName))
  }
}

Video.prototype.play = function () {
  var src = this.node.getAttribute('src')
  if (!src) {
    src = this.node.getAttribute('data-src')
    src && this.node.setAttribute('src', src)
  }
  this.node.play()
}

Video.prototype.pause = function () {
  this.node.pause()
}

Video.prototype.stop = function () {
  this.node.pause()
  this.node.autoplay = false
  this.node.setAttribute('data-src', this.node.src)
  this.node.src = ''
}

module.exports = Video
