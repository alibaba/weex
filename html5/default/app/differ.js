export default class Differ {
  constructor (id) {
    this.id = id
    this.map = []
    this.hooks = []
  }
  isEmpty () {
    return this.map.length === 0
  }
  append (type, depth, ref, handler) {
    if (!this.hasTimer) {
      this.hasTimer = true
      setTimeout(() => {
        this.hasTimer = false
        this.flush(true)
      }, 0)
    }
    const map = this.map
    if (!map[depth]) {
      map[depth] = {}
    }
    const group = map[depth]
    if (!group[type]) {
      group[type] = {}
    }
    if (type === 'element') {
      if (!group[type][ref]) {
        group[type][ref] = []
      }
      group[type][ref].push(handler)
    }
    else {
      group[type][ref] = handler
    }
  }
  flush (isTimeout) {
    const map = this.map.slice()
    this.map.length = 0
    map.forEach((group) => {
      callTypeMap(group, 'repeat')
      callTypeMap(group, 'shown')
      callTypeList(group, 'element')
    })

    const hooks = this.hooks.slice()
    this.hooks.length = 0
    hooks.forEach((fn) => {
      fn()
    })

    if (!this.isEmpty()) {
      this.flush()
    }
  }
  then (fn) {
    this.hooks.push(fn)
  }
}

function callTypeMap (group, type) {
  const map = group[type]
  for (const ref in map) {
    map[ref]()
  }
}

function callTypeList (group, type) {
  const map = group[type]
  for (const ref in map) {
    const list = map[ref]
    list.forEach((handler) => { handler() })
  }
}
