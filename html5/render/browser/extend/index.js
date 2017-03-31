import packages from './packer'

// install the apis and components as packages.
export default {
  init (Weex) {
    if (typeof packages !== 'object') {
      return
    }
    for (const k in packages) {
      Weex.install(packages[k])
    }
    // packages.forEach(pkg => Weex.install(pkg))
  }
}
