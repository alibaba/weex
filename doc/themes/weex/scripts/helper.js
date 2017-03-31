'use strict'

hexo.extend.helper.register('url_for_lang', function(path){
  var root = this.config.root || ''
  var langsArr = this.config.language
  var lang = this.page.lang
  var isDefault = lang === langsArr[0]
  var url = this.url_for(path)

  if (!isDefault && url.indexOf(lang) === -1) {
    url = root + lang + url.replace(root, '/')
  }
  return url
})

hexo.extend.helper.register('pick_lang', function(lang){
  var root = this.config.root || ''
  var langsArr = this.config.language
  var currentLang = this.page.lang
  var path = this.page.path
  var url = ''

  if (path.split('/')[0] === currentLang) {
    path = path.substring(currentLang.length)
  }

  if (path[0] !== '/') {
    path = '/' + path
  }

  if (lang === langsArr[0] || lang === '') {
    url = root + path.substring(1)
  } else {
    url = root + lang + path
  }

  return url
})