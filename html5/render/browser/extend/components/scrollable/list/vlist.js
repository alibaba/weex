'use strict'

import listModule from './list'

function init (Weex) {
  const List = listModule.init(Weex)

  function Vlist (data, nodeType) {
    data.attr.direction = 'v'
    List.call(this, data, nodeType)
  }
  Vlist.prototype = Object.create(List.prototype)

  Weex.registerComponent('list', Vlist)
  Weex.registerComponent('vlist', Vlist)
}

export default { init }
