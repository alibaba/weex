import cryptoFramework from '@ohos.security.cryptoFramework'
export class SecurityBase {
  static rsa(algName, blob) {
    return new Promise(async (resolve, reject) => {
      let md
      try {
        md = cryptoFramework.createMd(algName)
        await md.update(blob)
        const mdOutput = await md.digest()
        resolve(mdOutput.data)
      } catch (error) {
        console.error('[QAFAPI]: rsa fail error code: ' + error.code + ', message is: ' + error.message)
        reject(error)
      }
    })
  }
}
