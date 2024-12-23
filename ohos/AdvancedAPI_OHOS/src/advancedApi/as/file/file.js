import Result from '../../../base/util/Result'

export function saveFile (...args) {
  const callback = args.pop()
  const params = args.pop() || {}
  const file = requireAPI('ASFile')
  file.saveFile(params).then(data => {
    callback.invoke(Result.success(data))
  }).catch(err => {
    callback.invoke(Result.fail(err))
  })
}

export function getSavedFileList (...args) {
  const callback = args.pop()
  const file = requireAPI('ASFile')
  file.getSavedFileList().then(data => {
    callback.invoke(Result.success(data))
  }).catch(err => {
    callback.invoke(Result.fail(err))
  })
}

export function getSavedFileInfo (...args) {
  const callback = args.pop()
  const params = args.pop() || {}
  const file = requireAPI('ASFile')
  file.getSavedFileInfo(params).then(data => {
    callback.invoke(Result.success(data))
  }).catch(err => {
    callback.invoke(Result.fail(err))
  })
}

export function removeSavedFile (...args) {
  const callback = args.pop()
  const params = args.pop() || {}
  const file = requireAPI('ASFile')
  file.removeSavedFile(params).then(data => {
    callback.invoke(Result.success(data))
  }).catch(err => {
    callback.invoke(Result.fail(err))
  })
}

export function getFileInfo (...args) {
  const callback = args.pop()
  const params = args.pop() || {}
  const file = requireAPI('ASFile')
  file.getFileInfo(params).then(data => {
    callback.invoke(Result.success(data))
  }).catch(err => {
    callback.invoke(Result.fail(err))
  })
}

export function openDocument (...args) {
  const callback = args.pop()
  const params = args.pop() || {}
  const file = requireAPI('ASFile')
  file.openDocument(params).then(data => {
    callback.invoke(Result.success(data))
  }).catch(err => {
    callback.invoke(Result.fail(err))
  })
}

export function getFileSystemManager (...args) {
  const file = requireAPI('ASFile')
  return file.getFileSystemManager()
}
