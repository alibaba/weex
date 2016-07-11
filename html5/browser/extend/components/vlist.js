const List = require('./list')

function Vlist (data, nodeType) {
  data.attr.direction = 'v'
  List.call(this, data, nodeType)
}

Vlist.prototype = Object.create(List.prototype)

module.exports = Vlist
