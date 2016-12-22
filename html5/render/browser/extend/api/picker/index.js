'use strict'

import './picker.css'
import IScroll from 'iscroll'
let modal, pickerContainer, pickerHeader, pickerBody, pickerConfirm, pickerCancel, pickerBar, pickerScroller

const Picker = function (configs) {
  this.currentIndex = configs.currentIndex || 0
  this.confirmCallback = configs.confirmCallback
  this.cancelCallback = configs.cancelCallback
  this.data = configs.data
  this.sender = configs.sender
  this._init()
}

Picker.prototype = {

  _init: function () {
    this._create()
    this._createItem(this.data)
    this._addEvent()
    this.show()
    this._createScroll()
    this._initIndex()
  },

  _create: function () {
    if (!modal) {
      modal = document.createElement('div')
      modal.className = 'weex-picker weex-picker-fixed'
      pickerContainer = document.createElement('div')
      pickerHeader = document.createElement('div')
      pickerBody = document.createElement('div')

      pickerBar = document.createElement('div')
      pickerBar.className = 'weex-picker-bar'

      pickerContainer.className = 'weex-picker-content'
      pickerHeader.className = 'weex-picker-header'
      pickerBody.className = 'weex-picker-body'
      pickerContainer.appendChild(pickerHeader)
      pickerContainer.appendChild(pickerBody)
      pickerContainer.appendChild(pickerBar)
      modal.appendChild(pickerContainer)
      document.body.appendChild(modal)
    }

    pickerHeader.innerHTML = ''
    pickerConfirm = document.createElement('a')
    pickerCancel = document.createElement('a')
    pickerConfirm.className = 'weex-picker-confirm'
    pickerCancel.className = 'weex-picker-cancel'
    pickerConfirm.innerText = '确定'
    pickerCancel.innerText = '取消'
    pickerHeader.appendChild(pickerCancel)
    pickerHeader.appendChild(pickerConfirm)
  },

  _addEvent: function () {
    const confirmCallback = () => {
      this.confirmCallback && this.sender.performCallback(this.confirmCallback, this.currentIndex)
      this.hide()
    }

    const cancelCallback = () => {
      this.cancelCallback && this.sender.performCallback(this.cancelCallback)
      this.hide()
    }

    pickerConfirm.addEventListener('click', confirmCallback)
    pickerCancel.addEventListener('click', cancelCallback)
  },

  _createItem: function (items) {
    pickerBody.innerHTML = ''
    pickerScroller = document.createElement('div')
    const ui = document.createElement('ul')
    for (let i = -2; i < items.length + 2; i++) {
      const cell = document.createElement('li')
      if (i < 0 || i >= items.length) {
        cell.innerText = ''
      }
      else {
        cell.innerText = items[i]
      }
      ui.appendChild(cell)
    }
    pickerScroller.className = 'weex-picker-scroller'
    pickerScroller.appendChild(ui)
    pickerBody.appendChild(pickerScroller)
  },

  _createScroll: function () {
    const self = this
    self.itemScroll = new IScroll(pickerScroller, {
      snap: 'li',
      mouseWheel: true,
      vScrollbar: false,
      hScrollbar: false,
      hScroll: false
    })

    self.itemScroll.on('scrollEnd', function () {
      const yIndex = Math.abs(Math.round(-1 * this.y / self.itemHeight))
      self.currentIndex = yIndex
      console.log(self.currentIndex)
    })
  },

  _initIndex: function () {
    this.itemHeight = pickerBody.offsetHeight / 5
    this.itemScroll.goToPage(0, -1 * this.currentIndex, 0)
  },

  show: function () {
    modal.className = 'weex-picker weex-picker-fixed weex-picker-open'
  },

  hide: function () {
    modal.className = 'weex-picker weex-picker-fixed weex-picker-close'
  }
}

const pickerModule = {
  pick: function (items, index, confirmCallback, cancelCallback) {
    new Picker({
      data: items,
      currentIndex: index,
      confirmCallback: confirmCallback,
      cancelCallback: cancelCallback,
      sender: this.sender
    })
  }
}

const meta = {
  picker: [{
    name: 'pick',
    args: ['array', 'number', 'function']
  }]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('picker', pickerModule, meta)
  }
}
