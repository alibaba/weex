
/**
 * Validate the CSS color value.
 */
export function isCSSColor (value) {
  return /^[a-z]+$/i.test(value) // match color name
    || /^#([a-f0-9]{3}){1,2}$/i.test(value) // match #ABCDEF
    || /^rgb\s*\((\s*[0-9.]+\s*,){2}\s*[0-9.]+\s*\)/i.test(value) // match rgb(0,0,0)
    || /^rgba\s*\((\s*[0-9.]+\s*,){3}\s*[0-9.]+\s*\)/i.test(value) // match rgba(0,0,0,0)
}

export function isCSSLength (value) {
  return /^[+-]?[0-9]+.?([0-9]+)?(px|%)?$/.test(String(value))
}

export function position (value) {
  return ['absolute', 'relative', 'fixed', 'sticky'].indexOf(value) !== -1
}

export function opacity (value) {
  const count = parseFloat(value)
  return count >= 0 && count <= 1
}

export function display (value) {
  return ['flex'].indexOf(value) !== -1
}

export function flexDirection (value) {
  return ['row', 'column'].indexOf(value) !== -1
}

export function justifyContent (value) {
  return ['flex-start', 'flex-end', 'center', 'space-between'].indexOf(value) !== -1
}

export function alignItems (value) {
  return ['stretch', 'flex-start', 'flex-end', 'center'].indexOf(value) !== -1
}

export function flex (value) {
  return /^\d{1,3}$/.test(String(value))
}

export function fontStyle (value) {
  return ['normal', 'italic', 'oblique'].indexOf(value) !== -1
}

export function fontWeight (value) {
  return ['normal', 'bold', 'light', 'bolder', 'lighter'].indexOf(value) !== -1
}

export function textDecoration (value) {
  return ['none', 'underline', 'line-through'].indexOf(value) !== -1
}

export function textAlign (value) {
  return ['left', 'center', 'right'].indexOf(value) !== -1
}

export function overflow (value) {
  return ['visible', 'hidden'].indexOf(value) !== -1
}

export function textOverflow (value) {
  return ['clip', 'ellipsis'].indexOf(value) !== -1
}

/**
 * Common style validator.
 * @param {any} value
 * @param {String} key
 */
export function common (value, key) {
  if (/^[\w-]*color$/.test(String(key))) {
    return isCSSColor(value)
  }

  // check width and height
  if (/^(width|height)$/.test(String(key))) {
    return isCSSLength(value)
  }

  // check postions
  if (/^(top|right|bottom|left)$/.test(String(key))) {
    return isCSSLength(value)
  }

  // checkout border-radius
  if (/^border-((top|right|bottom|left)-){0,2}(width|radius)$/.test(String(key))) {
    return isCSSLength(value)
  }

  // check border-style
  if (/border-((top|right|bottom|left)-)?style/.test(String(key))) {
    return ['solid', 'dashed', 'dotted'].indexOf(value) !== -1
  }

  // check margins and paddings
  if (/^((margin|padding)-)?(top|right|bottom|left)/.test(String(key))) {
    return isCSSLength(value)
  }

  switch (String(key)) {
    case 'font-size': return isCSSLength(value)
  }

  return true
}
