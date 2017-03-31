'use strict'

/**

AUCTION:
taskQueue
Clipboard.setString()  NOW not works, facing to user-act lose of taskQueue.

works in Chrome Firefox Opera. but not in Safari.
@see https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_compatibility

Clipboard.getString() unimplemented. There is no easy way to do paste from clipboard to js variable.

So look out your app behavior, when downgrade to html5 render.
Any idea is welcome.
**/

const WEEX_CLIPBOARD_ID = '__weex_clipboard_id__'

const clipboard = {

  getString: function (callbackId) {
    // not supported in html5
    console.log('clipboard.getString() is not supported now.')
  },

  setString: function (text) {
    // not support safari
    if (typeof text === 'string' && text !== '' && document.execCommand) {
      const tempInput = element()
      tempInput.value = text

      tempInput.select()
      document.execCommand('copy')
      // var out = document.execCommand('copy');
      // console.log("execCommand out is " + out);
      tempInput.value = ''
      tempInput.blur()
    }
    else {
      console.log('only support string input now')
    }
  }

}

function element () {
  let tempInput = document.getElementById(WEEX_CLIPBOARD_ID)
  if (!tempInput) {
    tempInput = document.createElement('input')
    tempInput.setAttribute('id', WEEX_CLIPBOARD_ID)
    tempInput.style.cssText = 'height:1px;width:1px;border:none;'
    // tempInput.style.cssText = "height:40px;width:300px;border:solid;"
    document.body.appendChild(tempInput)
  }
  return tempInput
}

const meta = {
  clipboard: [{
    name: 'getString',
    args: ['function']
  }, {
    name: 'setString',
    args: ['string']
  }]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('clipboard', clipboard, meta)
  }
}
