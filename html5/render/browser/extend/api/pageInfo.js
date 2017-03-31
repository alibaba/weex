'use strict'

const pageInfo = {

  setTitle: function (title) {
    title = title || 'Weex HTML5'
    try {
      title = decodeURIComponent(title)
    }
    catch (e) {}
    document.title = title
  }
}

const meta = {
  pageInfo: [{
    name: 'setTitle',
    args: ['string']
  }]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('pageInfo', pageInfo, meta)
  }
}
