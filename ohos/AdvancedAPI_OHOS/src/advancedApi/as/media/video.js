import Result from '../../../base/util/Result'

export function saveVideoToPhotosAlbum(...args) {
  console.debug('[AdvancedAPI] start saveVideoToPhotosAlbum')
  const callback = args.pop()
  const video = requireAPI('ASVideo')
  const params = args[0]
  video.saveVideoToPhotosAlbum(params).then(
    res => {
      callback.invoke(Result.success(res))
    },
    err => {
      callback.invoke(Result.fail(err))
    }
  )
}

export function getVideoInfo(...args) {
  console.debug('[AdvancedAPI] start getVideoInfo')
  const callback = args.pop()
  const video = requireAPI('ASVideo')
  const params = args[0]
  video.getVideoInfo(params).then(
    res => {
      callback.invoke(Result.success(res))
    },
    err => {
      callback.invoke(Result.fail(err))
    }
  )
}
