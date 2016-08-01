'use strict'


/**

AUCTION:

Clipboard.setString() works in Chrome Firefox Opera. but not in Safari. 
@see https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_compatibility

Clipboard.getString() unimplemented. There is no easy way to do paste from clipboard to js variable.

So look out your app behavior, when downgrade to html5 render. 
Any idea is welcome.
**/

const SUCCESS = 'success'
const FAILED = 'failed'
const WEEX_CLIPBOARD_ID = "__weex_clipboard_id__";

const clipboard = {

  getString: function (callbackId) {
    // not supported in html5
  },

  setString: function (text) {
    // not support safari
    if(typeof text === 'string' && '' != text) {
      var tempInput = element();
      tempInput.value = text;

      tempInput.select();
      document.execCommand('copy');
      tempInput.value = "";
      tempInput.blur(); 
    }else {
      console.log("not string input");
    }
  }

}

function element() {
  var tempInput = document.getElementById(WEEX_CLIPBOARD_ID);
  if(tempInput == undefined) {
      tempInput = document.createElement("input");
      tempInput.setAttribute("id", WEEX_CLIPBOARD_ID);
      tempInput.style.cssText = "height:1px;width:1px;border:none;"
      document.body.appendChild(tempInput);
  }
  return tempInput;
}

clipboard._meta = {
  clipboard: [{
    name: 'getString',
    args: ['function']
  }, {
    name: 'setString',
    args: ['string']
  }]
}

module.exports = clipboard
