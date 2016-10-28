import packages from './packer'

// install the apis and components as packages.
export default {
  init (Weex) {
    const packagesList = packages && Object.keys(packages)
    if (!packagesList || !packagesList.length) {
      return
    }
    packagesList.forEach(pkgName => Weex.install(packages[pkgName]))
  }
}
