import scanCore from '@hms.core.scan.scanCore'
import scanBarcode from '@hms.core.scan.scanBarcode'
import { ErrorCode } from '../../../base/util/ErrorCode'
import { isBoolean } from '../../../base/util/checkDataType'
import { Base64 } from 'js-base64'

const SCAN_TYPE_AS_TO_HM = {
  'barCode': scanCore?.ScanType.ONE_D_CODE,
  'qrCode': scanCore?.ScanType.TWO_D_CODE,
  'datamatrix': scanCore?.ScanType.DATAMATRIX_CODE,
  'pdf417': scanCore?.ScanType.PDF417_CODE
}

export default class ASScan {
  scanCode(params = {}) {
    return new Promise((resolve, reject) => {
      const { onlyFromCamera = false, hideAlbum = false, scanType = [] } = params
      const scanTypes = []
      for (let i = 0; i < scanType.length; i++) {
        if (SCAN_TYPE_AS_TO_HM[scanType[i]]) {
          scanTypes.push(SCAN_TYPE_AS_TO_HM[scanType[i]])
        } else {
          reject(['Parameter scanType invalid!', ErrorCode.PARAMETER_ERROR])
          return
        }
      }
      if (!isBoolean(onlyFromCamera)) {
        reject(['Parameter onlyFromCamera invalid!', ErrorCode.PARAMETER_ERROR])
        return
      }
      if (!isBoolean(hideAlbum)) {
        reject(['Parameter hideAlbum invalid!', ErrorCode.PARAMETER_ERROR])
        return
      }
      if (scanTypes.length === 0) {
        scanTypes.push(scanCore.ScanType.ALL)
      }
      const options = { scanTypes, enableMultiMode: false, enableAlbum: (!onlyFromCamera && !hideAlbum) }
      try {
        scanBarcode.startScan(options).then((result) => {
          resolve({
            result: result.originalValue,
            scanType: this.scanTypeHmToAs(result.scanType),
            rawData: Base64.btoa(result.originalValue),
            charSet: 'utf-8'
          })
        }).catch((failResult) => {
          reject(['scanCode fail!', ErrorCode.COMMON_ERROR])
        })
      } catch (error) {
        reject(['scanCode fail!', ErrorCode.COMMON_ERROR])
      }
    })
  }

  scanTypeHmToAs(type) {
    let asType = 'UNKNOWN'
    switch (type) {
      case scanCore.ScanType.DATAMATRIX_CODE:
        asType = 'DATA_MATRIX'
        break
      case scanCore.ScanType.PDF417_CODE:
        asType = 'PDF_417'
        break
      case scanCore.ScanType.AZTEC_CODE:
        asType = 'AZTEC'
        break
      case scanCore.ScanType.CODABAR_CODE:
        asType = 'CODABAR'
        break
      case scanCore.ScanType.CODE39_CODE:
        asType = 'CODE_39'
        break
      case scanCore.ScanType.CODE93_CODE:
        asType = 'CODE_93'
        break
      case scanCore.ScanType.CODE128_CODE:
        asType = 'CODE_128'
        break
      case scanCore.ScanType.EAN8_CODE:
        asType = 'EAN_8'
        break
      case scanCore.ScanType.EAN13_CODE:
        asType = 'EAN_13'
        break
      case scanCore.ScanType.ITF14_CODE:
        asType = 'ITF'
        break
      case scanCore.ScanType.QR_CODE:
        asType = 'QR_CODE'
        break
      case scanCore.ScanType.UPC_A_CODE:
        asType = 'UPC_A'
        break
      case scanCore.ScanType.UPC_E_CODE:
        asType = 'UPC_E'
        break
      case scanCore.ScanType.MULTIFUNCTIONAL_CODE:
        asType = 'MULTIFUNCTIONAL'
        break
      case scanCore.ScanType.ONE_D_CODE:
        asType = 'CODABAR'
        break
      case scanCore.ScanType.TWO_D_CODE:
        asType = 'QR_CODE'
        break
      default:
        break
    }
    return asType
  }
}
