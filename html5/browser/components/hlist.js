const List = require('./list')

function Hlist (data, nodeType) {
  data.attr.direction = 'h'
  List.call(this, data, nodeType)
}

Hlist.prototype = Object.create(List.prototype)

module.exports = Hlist
