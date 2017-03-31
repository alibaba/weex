import Modal from './modal'

const CONTENT_CLASS = 'content'
const MSG_CLASS = 'content-msg'
const BUTTON_GROUP_CLASS = 'btn-group'
const BUTTON_CLASS = 'btn'
const INPUT_WRAP_CLASS = 'input-wrap'
const INPUT_CLASS = 'input'

export default function Prompt (config) {
  this.msg = config.message || ''
  this.defaultMsg = config.default || ''
  this.callback = config.callback
  this.okTitle = config.okTitle || 'OK'
  this.cancelTitle = config.cancelTitle || 'Cancel'
  Modal.call(this)
  this.node.classList.add('weex-prompt')
}

Prompt.prototype = Object.create(Modal.prototype)

Prompt.prototype.createNodeContent = function () {
  const content = document.createElement('div')
  content.classList.add(CONTENT_CLASS)
  this.node.appendChild(content)

  const msg = document.createElement('div')
  msg.classList.add(MSG_CLASS)
  msg.appendChild(document.createTextNode(this.msg))
  content.appendChild(msg)

  const inputWrap = document.createElement('div')
  inputWrap.classList.add(INPUT_WRAP_CLASS)
  content.appendChild(inputWrap)
  const input = document.createElement('input')
  input.classList.add(INPUT_CLASS)
  input.type = 'text'
  input.autofocus = true
  input.placeholder = this.defaultMsg
  inputWrap.appendChild(input)

  const buttonGroup = document.createElement('div')
  buttonGroup.classList.add(BUTTON_GROUP_CLASS)
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

Prompt.prototype.bindEvents = function () {
  Modal.prototype.bindEvents.call(this)
  const btnOk = this.node.querySelector('.' + BUTTON_CLASS + '.btn-ok')
  const btnCancel = this.node.querySelector('.' + BUTTON_CLASS + '.btn-cancel')
  const that = this
  btnOk.addEventListener('click', function () {
    const val = document.querySelector('input').value
    this.destroy()
    this.callback && this.callback({
      result: that.okTitle,
      data: val
    })
  }.bind(this))
  btnCancel.addEventListener('click', function () {
    const val = document.querySelector('input').value
    this.destroy()
    this.callback && this.callback({
      result: that.cancelTitle,
      data: val
    })
  }.bind(this))
}
