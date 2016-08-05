let nextNodeRef = 1

export const instanceMap = {}

export function getNextNodeRef () {
  return nextNodeRef++
}
