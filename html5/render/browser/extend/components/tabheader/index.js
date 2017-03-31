'use strict'

// TODO: refactor this scss code since this is strongly
// dependent on lib.flexible other than the value of
// scale.
import './tabheader.css'

function initFoldBtn (tabheader) {
  const node = tabheader.node
  const btn = document.createElement('span')
  btn.className = 'fold-toggle iconfont'
  btn.innerHTML = '&#xe661;'
  node.appendChild(btn)

  btn.addEventListener('click', function () {
    if (tabheader.unfolding) {
      folding(tabheader)
    }
    else {
      unfolding(tabheader)
    }
  })
}

function initMask (tabheader) {
  const mask = document.createElement('div')
  mask.className = 'tabheader-mask'
  tabheader.mask = mask
  // stop default behavior: page moving.
  mask.addEventListener('touchmove', function (evt) {
    evt.preventDefault()
  })
  // click to unfold.
  mask.addEventListener('click', function () {
    folding(tabheader)
  })

  document.body.appendChild(mask)
}

function unfolding (tabheader) {
  // mark the initial posiiton of tabheader
  if (!tabheader.flag) {
    const flag = document.createComment('tabheader')
    tabheader.flag = flag
    tabheader.node.parentNode.insertBefore(flag, tabheader.node)
  }
  if (!tabheader.mask) {
    initMask(tabheader)
  }

  // record the scroll position.
  tabheader._scrollVal = tabheader._body.scrollLeft
  // record the position in document.
  tabheader._topVal = tabheader.node.getBoundingClientRect().top
  tabheader._styleTop = tabheader.node.style.top

  document.body.appendChild(tabheader.node)
  tabheader.node.classList.add('unfold-header')
  tabheader.node.style.height = 'auto'
  // recalc the position when it is unfolded.
  const thHeight = tabheader.node.getBoundingClientRect().height
  if (thHeight + tabheader._topVal > window.innerHeight) {
    tabheader._topVal = tabheader._topVal
        + (window.innerHeight - thHeight - tabheader._topVal)
  }

  tabheader.node.style.top = tabheader._topVal + 'px'
  // process mask style
  tabheader.mask.classList.add('unfold-header')
  tabheader.mask.style.height = window.innerHeight + 'px'
  tabheader.unfolding = true
}

function folding (tabheader) {
  if (tabheader.unfolding !== true) {
    return
  }

  tabheader.mask.classList.remove('unfold-header')
  tabheader.node.classList.remove('unfold-header')

  tabheader.node.style.height = ''
  tabheader.node.style.top = tabheader._styleTop

  // recover the position of tabheader.
  tabheader.flag.parentNode.insertBefore(tabheader.node, tabheader.flag)
  // recover the position of scoller.
  tabheader._body.scrollLeft = tabheader._scrollVal

  scrollToView(tabheader)
  tabheader.unfolding = false
}

function initEvent (tabheader) {
  initClickEvent(tabheader)
  initSelectEvent(tabheader)
}

// init events.
function initClickEvent (tabheader) {
  const box = tabheader.box

  box.addEventListener('click', function (evt) {
    let target = evt.target
    if (target.nodeName === 'UL') {
      return
    }

    if (target.parentNode.nodeName === 'LI') {
      target = target.parentNode
    }

    const floor = target.getAttribute('data-floor')
    /* eslint-disable eqeqeq */
    if (tabheader.data.attr.selectedIndex == floor) {
      // Duplicated clicking, not to trigger select event.
      return
    }
    /* eslint-enable eqeqeq */

    fireEvent(target, 'select', { index: floor })
  })
}

function initSelectEvent (tabheader) {
  const node = tabheader.node
  node.addEventListener('select', function (evt) {
    let index
    if (evt.index !== undefined) {
      index = evt.index
    }
    else if (evt.data && evt.data.index !== undefined) {
      index = evt.data.index
    }

    if (index === undefined) {
      return
    }

    tabheader.attr.selectedIndex.call(tabheader, index)
  })
}

function scrollToView (tabheader, node) {
  if (!node) {
    const attr = tabheader.data.attr
    node = tabheader.node.querySelector('[data-floor="' + attr.selectedIndex + '"]')
  }
  if (!node) {
    return
  }

  // const defaultVal = tabheader._body.scrollLeft
  // const leftVal = defaultVal - node.offsetLeft + 300

  const scrollVal = getScrollVal(tabheader._body.getBoundingClientRect(), node)
  doScroll(tabheader._body, scrollVal)
}

// scroll the tabheader.
// positive val means to scroll right.
// negative val means to scroll left.
function doScroll (node, val, finish) {
  if (!val) {
    return
  }
  if (finish === undefined) {
    finish = Math.abs(val)
  }

  if (finish <= 0) {
    return
  }

  setTimeout(function () {
    if (val > 0) {
      node.scrollLeft += 2
    }
    else {
      node.scrollLeft -= 2
    }
    finish -= 2

    doScroll(node, val, finish)
  })
}

// get scroll distance.
function getScrollVal (rect, node) {
  const left = node.previousSibling
  const right = node.nextSibling
  let scrollVal

  // process left-side element first.
  if (left) {
    const leftRect = left.getBoundingClientRect()
    // only need to compare the value of left.
    if (leftRect.left < rect.left) {
      scrollVal = leftRect.left
      return scrollVal
    }
  }

  if (right) {
    const rightRect = right.getBoundingClientRect()
    // compare the value of right.
    if (rightRect.right > rect.right) {
      scrollVal = rightRect.right - rect.right
      return scrollVal
    }
  }

  // process current node, from left to right.
  const nodeRect = node.getBoundingClientRect()
  if (nodeRect.left < rect.left) {
    scrollVal = nodeRect.left
  }
  else if (nodeRect.right > rect.right) {
    scrollVal = nodeRect.right - rect.right
  }

  return scrollVal
}

// trigger and broadcast events.
function fireEvent (element, type, data) {
  const evt = document.createEvent('Event')
  evt.data = data
  for (const k in data) {
    if (data.hasOwnProperty(k)) {
      evt[k] = data[k]
    }
  }
  // need bubble.
  evt.initEvent(type, true, true)

  element.dispatchEvent(evt)
}

function createHighlightIcon (code) {
  const html = '<i class="hl-icon iconfont">' + '&#xe650' + '</i>'
  return html
}

function isValidColor (color) {
  if (!color) {
    return false
  }

  if (color.charAt(0) !== '#') {
    return false
  }

  if (color.length !== 7) {
    return false
  }

  return true
}

const proto = {
  create () {
    // outside container.
    const node = document.createElement('div')
    node.className = 'tab-header'
    // tip on the top.
    const bar = document.createElement('div')
    bar.className = 'header-bar'
    bar.textContent = 'CHANGE FLOOR'
    // middle layer.
    const body = document.createElement('div')
    body.className = 'header-body'
    const box = document.createElement('ul')
    box.className = 'tabheader'

    body.appendChild(box)
    node.appendChild(bar)
    node.appendChild(body)
    this._bar = bar
    this._body = body
    this.box = box
    this.node = node
    // init events.
    initFoldBtn(this)
    initEvent(this)
    return node
  }
}

const attr = {
  highlightIcon () {
    return createHighlightIcon()
  },

  data () {
    const attr = this.data.attr
    // Ensure there is a default selected value.
    if (attr.selectedIndex === undefined) {
      attr.selectedIndex = 0
    }

    const list = attr.data || []
    const curItem = attr.selectedIndex

    const ret = []
    const itemTmpl = '<li class="th-item" data-floor="{{floor}}">'
        + '{{hlIcon}}{{floorName}}</li>'

    list.forEach(function (item, idx) {
      let html = itemTmpl.replace('{{floor}}', idx)
      /* eslint-disable eqeqeq */
      if (curItem == idx) {
        html = html.replace('{{hlIcon}}', createHighlightIcon())
      }
      else {
        html = html.replace('{{hlIcon}}', '')
      }
      /* eslint-enable eqeqeq */

      html = html.replace('{{floorName}}', item)

      ret.push(html)
    }, this)

    this.box.innerHTML = ret.join('')
  },

  selectedIndex (val) {
    const attr = this.data.attr

    if (val === undefined) {
      val = 0
    }

    // if (val == attr.selectedIndex) {
    //   return
    // }

    attr.selectedIndex = val

    this.attr.data.call(this)

    folding(this)
    this.style.textHighlightColor.call(this, this.textHighlightColor)
  }
}

const style = {
  opacity (val) {
    if (val === undefined || val < 0 || val > 1) {
      val = 1
    }

    this.node.style.opacity = val
  },

  textColor (val) {
    if (!isValidColor(val)) {
      return
    }

    this.node.style.color = val
  },

  textHighlightColor (val) {
    if (!isValidColor(val)) {
      return
    }
    this.textHighlightColor = val
    const attr = this.data.attr

    const node = this.node.querySelector('[data-floor="'
        + attr.selectedIndex + '"]')
    if (node) {
      node.style.color = val
      scrollToView(this, node)
    }
  }
}

function init (Weex) {
  const Atomic = Weex.Atomic
  const extend = Weex.utils.extend

  function TabHeader (data) {
    Atomic.call(this, data)
  }
  TabHeader.prototype = Object.create(Atomic.prototype)
  extend(TabHeader.prototype, proto)
  extend(TabHeader.prototype, { attr })
  extend(TabHeader.prototype, {
    style: extend(Object.create(Atomic.prototype.style), style)
  })

  Weex.registerComponent('tabheader', TabHeader)
}

export default { init }
