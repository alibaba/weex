import Modal from './modal'

const CONTENT_CLASS = 'content'
const MSG_CLASS = 'content-msg'
const BUTTON_GROUP_CLASS = 'btn-group'
const BUTTON_CLASS = 'btn'

export default function Alert (config) {
  this.msg = config.message || ''
  this.callback = config.callback
  this.okTitle = config.okTitle || 'OK'
  Modal.call(this)
  this.node.classList.add('weex-alert')
}

Alert.prototype = Object.create(Modal.prototype)

Alert.prototype.createNodeContent = function () {
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
  const button = document.createElement('div')
  button.classList.add(BUTTON_CLASS, 'alert-ok')
  button.appendChild(document.createTextNode(this.okTitle))
  buttonGroup.appendChild(button)
}

Alert.prototype.bindEvents = function () {
  Modal.prototype.bindEvents.call(this)
  const button = this.node.querySelector('.' + BUTTON_CLASS)
  button.addEventListener('click', function () {
    this.destroy()
    this.callback && this.callback()
  }.bind(this))
}
