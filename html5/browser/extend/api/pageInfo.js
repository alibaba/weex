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

pageInfo._meta = {
  pageInfo: [{
    name: 'setTitle',
    args: ['string']
  }]
}

module.exports = pageInfo
