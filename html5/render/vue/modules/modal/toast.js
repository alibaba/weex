const queue = []
let isProcessing = false
let toastWin
const TOAST_WIN_CLASS_NAME = 'weex-toast'

const DEFAULT_DURATION = 0.8

function showToastWindow (msg, callback) {
  const handleTransitionEnd = function () {
    toastWin.removeEventListener('transitionend', handleTransitionEnd)
    toastWin.removeEventListener('webkitTransitionEnd', handleTransitionEnd)
    callback && callback()
  }
  if (!toastWin) {
    toastWin = document.createElement('div')
    toastWin.classList.add(TOAST_WIN_CLASS_NAME, 'hide')
    document.body.appendChild(toastWin)
  }
  toastWin.textContent = msg
  toastWin.addEventListener('transitionend', handleTransitionEnd)
  toastWin.addEventListener('webkitTransitionEnd', handleTransitionEnd)
  setTimeout(function () {
    toastWin.classList.remove('hide')
  }, 0)
}

function hideToastWindow (callback) {
  const handleTransitionEnd = function () {
    toastWin.removeEventListener('transitionend', handleTransitionEnd)
    toastWin.removeEventListener('webkitTransitionEnd', handleTransitionEnd)
    callback && callback()
  }
  if (!toastWin) {
    return
  }
  toastWin.addEventListener('transitionend', handleTransitionEnd)
  toastWin.addEventListener('webkitTransitionEnd', handleTransitionEnd)
  setTimeout(function () {
    toastWin.classList.add('hide')
  }, 0)
}

export default {
  push: function (msg, duration) {
    queue.push({
      msg: msg,
      duration: duration || DEFAULT_DURATION
    })
    this.show()
  },

  show: function () {
    const that = this

    // All messages had been toasted already, so remove the toast window,
    if (!queue.length) {
      toastWin && toastWin.parentNode.removeChild(toastWin)
      toastWin = null
      return
    }

    // the previous toast is not ended yet.
    if (isProcessing) {
      return
    }
    isProcessing = true

    const toastInfo = queue.shift()
    showToastWindow(toastInfo.msg, function () {
      setTimeout(function () {
        hideToastWindow(function () {
          isProcessing = false
          that.show()
        })
      }, toastInfo.duration * 1000)
    })
  }
}
