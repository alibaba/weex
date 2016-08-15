'use strict'

import scrollableModule from '../scrollable'

const availableChildrenTypes = ['cell', 'loading', 'refresh']

function getProto (Scrollable) {
  return {
    create () {
      const node = Scrollable.prototype.create.call(this)
      node.classList.add('list-wrap')
      this.scrollElement.classList.add('list-element')
      return node
    },

    createChildren () {
      const children = this.data.children || []
      children.forEach(function (data) {
        const type = data.type
        if (availableChildrenTypes.indexOf(type) === -1) {
          // throw new Error('[h5-render] invalid child type "'
          //   + type + '" for list.')
          console.warn('[h5-render] invalid child type "'
            + type + '" for list.')
        }
      })
      return Scrollable.prototype.createChildren.call(this)
    },

    appendChild (data) {
      const type = data.type
      if (availableChildrenTypes.indexOf(type) === -1) {
        // throw new Error('[h5-render] invalid child type "'
        //   + type + '" for list.')
        console.warn('[h5-render] invalid child type "'
          + type + '" for list.')
      }
      return Scrollable.prototype.appendChild.call(this, data)
    },

    insertBefore (child, before) {
      const type = child.data.type
      if (availableChildrenTypes.indexOf(type) === -1) {
        // throw new Error('[h5-render] invalid child type "'
        //   + type + '" for list.')
        console.warn('[h5-render] invalid child type "'
          + type + '" for list.')
      }
      return Scrollable.prototype.insertBefore.call(this, child, before)
    }
  }
}

function init (Weex) {
  const Scrollable = scrollableModule.init(Weex)
  function List (data, nodeType) {
    Scrollable.call(this, data, nodeType)
  }
  const extend = Weex.utils.extend

  List.prototype = Object.create(Scrollable.prototype)
  extend(List.prototype, getProto(Scrollable))

  return List
}

export default { init }
