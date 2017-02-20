import Modal from './modal'

const CONTENT_CLASS = 'content'
const MSG_CLASS = 'content-msg'
const BUTTON_GROUP_CLASS = 'btn-group'
const BUTTON_CLASS = 'btn'

export default function Confirm (config) {
  this.msg = config.message || ''
  this.callback = config.callback
  this.okTitle = config.okTitle || 'OK'
  this.cancelTitle = config.cancelTitle || 'Cancel'
  Modal.call(this)
  this.node.classList.add('weex-confirm')
}

Confirm.prototype = Object.create(Modal.prototype)

Confirm.prototype.createNodeContent = function () {
  const content = document.createElement('div')
  content.classList.add(CONTENT_CLASS)
  this.node.appendChild(content)

  const msg = document.createElement('div')
  msg.classList.add(MSG_CLASS)
  msg.appendChild(document.createTextNode(this.msg))
  content.appendChild(msg)

  const buttonGroup = document.createElement('div')
  buttonGroup.classList.add(BUTTON_GROUP_CLASS)
  this.node.appendChild(buttonGroup)
  const btnOk = document.createElement('div')
  btnOk.appendChild(document.createTextNode(this.okTitle))
  btnOk.classList.add('btn-ok', BUTTON_CLASS)
  const btnCancel = document.createElement('div')
  btnCancel.appendChild(document.createTextNode(this.cancelTitle))
  btnCancel.classList.add('btn-cancel', BUTTON_CLASS)
  buttonGroup.appendChild(btnOk)
  buttonGroup.appendChild(btnCancel)
  this.node.appendChild(buttonGroup)
}

Confirm.prototype.bindEvents = function () {
  Modal.prototype.bindEvents.call(this)
  const btnOk = this.node.querySelector('.' + BUTTON_CLASS + '.btn-ok')
  const btnCancel = this.node.querySelector('.' + BUTTON_CLASS + '.btn-cancel')
  btnOk.addEventListener('click', function () {
    this.destroy()
    this.callback && this.callback(this.okTitle)
  }.bind(this))
  btnCancel.addEventListener('click', function () {
    this.destroy()
    this.callback && this.callback(this.cancelTitle)
  }.bind(this))
}
