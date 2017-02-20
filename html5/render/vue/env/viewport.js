const DEFAULT_VIEWPORT_WIDTH = process.env.VIEWPORT_WIDTH

function parseViewportWidth (config) {
  let width = DEFAULT_VIEWPORT_WIDTH
  if (config && config.width) {
    width = Number(config.width) || config.width
  }
  return width
}

export function setViewport (config = {}) {
  const doc = window.document

  if (doc) {
    const viewportWidth = parseViewportWidth(config)

    // set root font-size
    doc.documentElement.style.fontSize = viewportWidth / 10 + 'px'

    /**
     * why not to use window.screen.width to get screenWidth ? Because in some
     * old webkit browser on android system it get the device pixel width, which
     * is the screenWidth multiply by the device pixel ratio.
     */
    const screenWidth = document.documentElement.getBoundingClientRect().width
    const scale = screenWidth / viewportWidth
    const contents = [
      `width=${viewportWidth}`,
      `initial-scale=${scale}`,
      `maximum-scale=${scale}`,
      `minimum-scale=${scale}`,
      `user-scalable=no`
    ]

    let meta = doc.querySelector('meta[name="viewport"]')
    if (!meta) {
      meta = doc.createElement('meta')
      meta.setAttribute('name', 'viewport')
      document.querySelector('head').appendChild(meta)
    }

    meta.setAttribute('content', contents.join(','))
  }
}
