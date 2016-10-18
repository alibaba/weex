import packages from './packer'

// install the apis and components as packages.
export default {
  init (Weex) {
    if (!packages || !packages.length) {
      return
    }
    packages.forEach(pkg => Weex.install(pkg))
  }
}
