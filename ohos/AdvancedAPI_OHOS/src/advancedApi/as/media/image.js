import Result from '../../../base/util/Result'

export function chooseImage (...args) {
  console.debug('[AdvancedAPI] start chooseImage')
  const callback = args.pop()
  const image = requireAPI('ASImage')
  const params = args[0]
  image.chooseImage(params).then(
    res => {
      callback.invoke(Result.success(res))
    },
    err => {
      callback.invoke(Result.fail(err))
    }
  )
}

export function getImageInfo(...args) {
  console.debug('[AdvancedAPI] start getImageInfo')
  const callback = args.pop()
  const image = requireAPI('ASImage')
  const params = args[0]
  image.getImageInfo(params).then(
    res => {
      callback.invoke(Result.success(res))
    },
    err => {
      callback.invoke(Result.fail(err))
    }
  )
}
export function saveImageToPhotosAlbum(...args) {
  console.debug('[AdvancedAPI] start saveImageToPhotosAlbum')
  const callback = args.pop()
  const image = requireAPI('ASImage')
  const params = args[0]
  image.saveImageToPhotosAlbum(params).then(
    res => {
      callback.invoke(Result.success(res))
    },
    err => {
      callback.invoke(Result.fail(err))
    }
  )
}
export function compressImage(...args) {
  console.debug('[AdvancedAPI] start compressImage')
  const callback = args.pop()
  const image = requireAPI('ASImage')
  const params = args[0]
  image.compressImage(params).then(
    res => {
      callback.invoke(Result.success(res))
    },
    err => {
      callback.invoke(Result.fail(err))
    }
  )
}
