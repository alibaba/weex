'use strict'

import './video.css'

function getProto (Weex) {
  const Atomic = Weex.Atomic
  return {
    create () {
      const node = document.createElement('video')
      node.classList.add('weex-video')
      node.classList.add('weex-element')
      node.controls = true
      node.autoplay = this.autoPlay
      node.setAttribute('playsinline', '')
      node.setAttribute('webkit-playsinline', '')
      node.setAttribute('play-status', this.playStatus)
      this.node = node
      if (this.autoPlay && this.playStatus === 'play') {
        // set timer to avoid error: uncaught DOM exception: the play() request
        // was interrupted by a new load request.
        setTimeout(() => {
          this.play()
        }, 0)
      }
      return node
    },

    bindEvents (evts) {
      Atomic.prototype.bindEvents.call(this, evts)

      // convert w3c-video events to weex-video events.
      const evtsMap = {
        start: 'play',
        finish: 'ended',
        fail: 'error'
      }
      for (const evtName in evtsMap) {
        this.node.addEventListener(evtsMap[evtName], function (type, e) {
          this.dispatchEvent(type, e.data)
        }.bind(this, evtName))
      }
    },

    play () {
      let src = this.node.getAttribute('src')
      if (!src) {
        src = this.node.getAttribute('data-src')
        src && this.node.setAttribute('src', src)
      }
      try {
        this.node.play()
      }
      catch (err) {
        // DO NOTHING.
      }
    },

    pause () {
      this.node.pause()
    },

    stop () {
      this.node.pause()
      this.node.autoplay = false
      this.node.setAttribute('data-src', this.node.src)
      this.node.src = ''
    }
  }
}

const attr = {
  playStatus (val) {
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

  autoPlay (val) {
    // DO NOTHING
  }
}

function init (Weex) {
  const Atomic = Weex.Atomic
  const extend = Weex.utils.extend

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
    const autoPlay = data.attr.autoPlay
    const playStatus = data.attr.playStatus
    this.autoPlay = autoPlay === true || autoPlay === 'true'
    if (playStatus !== 'play'
        && playStatus !== 'stop'
        && playStatus !== 'pause') {
      this.playStatus = 'pause'
    }
    else {
      this.playStatus = playStatus
    }
    Atomic.call(this, data)
  }
  Video.prototype = Object.create(Atomic.prototype)
  extend(Video.prototype, getProto(Weex))
  extend(Video.prototype, { attr })

  Weex.registerComponent('video', Video)
}

export default { init }

