'use strict'

var Sender = require('../bridge/sender')

var _data = {}

var animation = {

  /**
   * transition
   * @param  {string} ref        [description]
   * @param  {obj} config     [description]
   * @param  {string} callbackId [description]
   */
  transition: function (ref, config, callbackId) {
    var refData = _data[ref]
    var stylesKey = JSON.stringify(config.styles)
    var weexInstance = this
    // If the same component perform a animation with exactly the same
    // styles in a sequence with so short interval that the prev animation
    // is still in playing, then the next animation should be ignored.
    if (refData && refData[stylesKey]) {
      return
    }
    if (!refData) {
      refData = _data[ref] = {}
    }
    refData[stylesKey] = true
    return this.getComponentManager().transition(ref, config, function () {
      // Remove the stylesKey in refData so that the same animation
      // can be played again after current animation is already finished.
      delete refData[stylesKey]
      weexInstance.sender.performCallback(callbackId)
    })
  }

}

animation._meta = {
  animation: [{
    name: 'transition',
    args: ['string', 'object', 'string']
  }]
}

module.exports = animation
