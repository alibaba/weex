'use strict'

var event = {
  /**
   * openUrl
   * @param  {string} url
   */
  openURL: function (url) {
    location.href = url
  }

}

event._meta = {
  event: [{
    name: 'openURL',
    args: ['string']
  }]
}

module.exports = event