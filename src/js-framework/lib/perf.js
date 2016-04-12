import log from './log'

var data = {type: 'root', children: []}
var current = data
var stack = [current]

function spaces(num) {
  return Array(num).join(' ')
}

export function start(type, id) {
  var task = {type: type, id: id, children: [], start: Date.now()}
  current.children.push(task)
  stack.push(task)
  current = task
  log('perf:' + spaces(stack.length - 1), 'start', task.type, task.id)
}

export function end(type, id) {
  var task = stack.pop()
  task.end = Date.now()
  current = stack[stack.length - 1]
  log('perf:' + spaces(stack.length), 'end',
    (task.end - task.start) + 'ms', task.type, task.id)
}

export function reset() {
  data.children = []
  current = data
  stack.length = 0
  stack.push(current)
}

export function toJSON() {
  return JSON.parse(JSON.stringify(data))
}
