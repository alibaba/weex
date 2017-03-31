;(function () {
  if (window.ActiveXObject) {
    var ua = navigator.userAgent.toLowerCase()
    var ieVersion = ua.match(/msie ([\d.]+)/)[1]

    if (ieVersion <= 9) {
      alert('Please use Chrome / Safari / Firefox / Edge to access this site.')
    }
  }
})();

;(function() {
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

  // MIT license
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o']
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                || window[vendors[x]+'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime))
      var id = window.setTimeout(function() { callback(currTime + timeToCall) }, 
        timeToCall)
      lastTime = currTime + timeToCall
      return id
    }

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id)
    }
}());

;(function () {
  var BODY = document.body
  /**
   * Toggling sidebar
   */

  function initSidebar () {
    var sidebarEl = document.querySelector('#sidebar')
    var menuBtn = document.querySelector('#header .btn-menu')
    var closeBtn = sidebarEl.querySelector('.btn-close-sidebar')
    var sidebarMenu = sidebarEl.querySelector('.sidebar-menu')

    menuBtn.addEventListener('click', function (e) {
      e.preventDefault()
      e.stopPropagation()
      
      sidebarEl.classList.toggle('open')
    })

    BODY.addEventListener('click', function (e) {
      var target = e.target

      if (sidebarEl.classList.contains('open')) {
        if (target === closeBtn || !sidebarEl.contains(target)) {
          sidebarEl.classList.remove('open')
        }
      }
    })
  }

  initSidebar()

  /**
   * Pick lang
   */
  function initPickLang () {
    var pick = document.querySelector('.pick-lang')
    var elements = document.querySelectorAll('.pick-lang a')

    pick.addEventListener('click', function (e) {
      e.preventDefault()
      e.stopPropagation()

      var target = e.target;
      if (pick.contains(target)) {
        var lang = target.getAttribute('data-lang')

        if (window.sessionStorage) {
          window.sessionStorage.setItem('lang', lang)
        }

        location.href = target.href
      }
    })
  }
  initPickLang()

  /**
   *  Search
   */
  function initSearch() {
    var form = document.querySelector('.search-form')
    var inputElements = document.querySelectorAll('.search-input')

    BODY.addEventListener('click', function (e) {
      var target = e.target,
          resultsPanel = document.querySelectorAll('.results-panel.show')

      Array.prototype.forEach.call(resultsPanel, function (item, index) {
        if (!item.contains(target)) {
          item.classList.remove('show')
        }
      })
    })

    reqwest({
      url: ROOT + 'content.json', 
      type: 'json'
    })
    .then(function (resp) {
      var root = resp.meta.root || '/'

      Array.prototype.forEach.call(inputElements, function (input, index) {
        input.addEventListener('input', function (e) {
          var target = e.target,
              panel = target.parentElement && target.parentElement.nextElementSibling,
              value = target.value.trim()
              keywords = value.split(/[\s\-\，\\/]+/)

          if (value !== '') {
            var matchingPosts = searchFromJSON(resp.pages, keywords)
            var html = ''

            matchingPosts.forEach(function (post, index) {
              var url = root + post.url
              var htmlSnippet = '<div class=\"matching-post\">' +
                                  '<h2>' +
                                    '<a href=\"' + url + '\">' + post.title + '</a>' +
                                  '</h2>' +
                                  '<p>' + post.content + '</p>' +
                                '</div>'
              
              html += htmlSnippet
            })
            if (panel.classList.contains('results-panel')) {
              panel.classList.add('show')
              panel.innerHTML = html ? html : '<p>No Results!</p>'
            }
          } else {
            if (panel.classList.contains('results-panel')) {
              panel.classList.remove('show')
              panel.innerHTML = ''
            }
          }
        })
      })
    })
  }

  function searchFromJSON (data, keywords) {
    var matchingResults = []

    for (var i = 0; i < data.length; i++) {

      var post = data[i]
      var isMatch = false
      var postTitle = post.title && post.title.trim(),
          postContent = post.text && post.text.trim(),
          postUrl = post.path || '',
          postType = post.type
      var matchingNum = 0
      var resultStr = ''

      if(postTitle !== '' && postContent !== '') {
        keywords.forEach(function(keyword, i) {
          var regEx = new RegExp('(' + escapeReg(keyword) + ')', 'gi')
          var indexTitle = -1,
              indexContent = -1,
              indexTitle = postTitle.search(regEx),
              indexContent = postContent.search(regEx)

          if(indexTitle < 0 && indexContent < 0){
            isMatch = false;
          } else {
            isMatch = true
            matchingNum++
            if (indexContent < 0) {
              indexContent = 0;
            }
            
            var start = 0,
                end = 0
            
            start = indexContent < 11 ? 0 : indexContent - 10
            end = start === 0 ? 70 : indexContent + keyword.length + 60
            if (end > postContent.length) {
              end = postContent.length
            }

            var matchContent = '...' + 
              postContent
                .substring(start, end)
                .replace(regEx, '<em class="search-keyword">$1</em>') + 
                '...'

            resultStr += matchContent
          }
        })

        if (isMatch) {
          var matchingPost = {
            title: escapeHtml(postTitle),
            content: resultStr,
            url: postUrl,
            type: postType,
            matchingNum: matchingNum
          }

          matchingResults.push(matchingPost)
        }
      }
    }
    // matchingResults.sort(function (a, b) {
    //   return a.matchingNum > b.matchingNum
    // })

    return matchingResults
  }

  function escapeHtml (string) {
    var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '': '&quot;',
      '': '&#39;',
      '/': '&#x2F;'
    }

    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    })
  }

  function escapeReg (string) {
    var entityMap = {
      '.': '\\.',
      '^': '\\^',
      '$': '\\$',
      '*': '\\*',
      '?': '\\?',
      '|': '\\|',
      '(': '\\(',
      ')': '\\)',
      '[': '\\[',
      ']': '\\]',
      '+': '\\+'
    }

    return String(string).replace(/[\.\^\$\*\?\|\(\)\[\]\+]/g, function (s) {
      return entityMap[s];
    })
  }

  initSearch()
  /*
   * LANDINGPAGE 
   */
  if (PAGE_TYPE === 'index') {
    /**
     * Set index page scene max height
     */
    function setMaxHeight () {
      if(window.innerWidth < 1100 
        && window.innerWidth >= 700
        && window.innerWidth / window.innerHeight >= 0.7) {
        var scenes = document.querySelectorAll('.scene')
        var scenesArr = Array.prototype.slice.call(scenes, 1)

        scenesArr.forEach(function (i) {
          i.style.maxHeight = '600px'
        })
      }
    }

    setMaxHeight()

    /**
     * Index page animation helper: AppearController 
     */
    function AppearController(el, opts) {
      
      this._lastScroll = window.pageYOffset
      this._ticking = false
      this.el = el
      this.offsetTop = el.offsetTop
      this.offsetHeight = el.offsetHeight
      this._optsAppear = opts.appear || null
      this._optsDisappear = opts.disappear || null
      this._optsThreshold = opts.threshold || -10
      this._handler = this._requestScroll.bind(this)
      this._create()
    }

    AppearController.prototype._requestScroll = function() {
      var currentScroll = window.pageYOffset

      // if (currentScroll > this._lastScroll) {
        this._lastScroll = window.pageYOffset
        this._requestTick()
      // }
    }

    AppearController.prototype._create = function() {
      if (this._inViewport()) {
        this._ticking = true
        this.appear()
        window.addEventListener('scroll', this._handler, false)
        window.addEventListener('resize', this._handler, false)
      } else {
        window.addEventListener('scroll', this._handler, false)
        window.addEventListener('resize', this._handler, false)
      }
    }

    AppearController.prototype._destroy = function() {
      window.removeEventListener('scroll', this._handler, false)
      window.removeEventListener('resize', this._handler, false)
    }

    AppearController.prototype._requestTick = function() {

      if(!this._ticking && this._inViewport()) {
        this._ticking = true
        requestAnimationFrame(this.appear.bind(this))
      } else if (this._ticking && !this._inViewport()) {
        this._ticking = false
        requestAnimationFrame(this.disappear.bind(this))
      }
    }

    AppearController.prototype._inViewport = function() {
      var viewportTop = this._lastScroll
      var viewportBottom = viewportTop + window.innerHeight
      var threshold = (this._optsThreshold / 100) * window.innerHeight
      var bottomEdge = viewportBottom + threshold 
      var topEdge = viewportTop - this.offsetHeight - threshold

      return this.offsetTop <= bottomEdge && this.offsetTop >= topEdge
    }

    AppearController.prototype.appear = function() {
      this._optsAppear && this._optsAppear(this.el, this.offsetTop)
    }

    AppearController.prototype.disappear = function() {
      this._optsDisappear && this._optsDisappear(this.el, this.offsetTop)
    }


    /**
     * Index page animation helper: Galaxy anim controller 
     */
    function Galaxy(canvas, orbitColor) {
      var ctx = canvas.getContext("2d")

      this.ctx = ctx
      this.offset = Math.random() * 360
      this.width = canvas.width
      this.height = canvas.height
      this.orbitColor = orbitColor
      this.radius = this.width / 2
      this.x = this.width / 2
      this.y = this.height / 2
      this.orbits = []

      this.bigBang()
    }

    Galaxy.prototype.bigBang = function () {
      var ctx = this.ctx,
          that = this

      for (var i = 1; i <= 8; i++) {
        var color = 'rgba(' + hexToRgb(this.orbitColor) + ',' + i/10 + ')',
            orbit = new Orbit(that.x, that.y, that.radius - i*23, color)

        that.orbits.push(orbit)
        
        if (i < 5) {
          for (var j = 0; j < 4; j++) {
            var size = j === 1 
                      ? Math.floor(Math.random() * 8 + 10) 
                      : Math.floor(Math.random() * 6 + 3),
                velocity = 1 / ((size - 3) * 45),
                planet = new Planet(size, '#fff', velocity)

            orbit.addPlanet(planet)
          }
        }
      }
    }

    Galaxy.prototype.spin = function () {
      var that = this,
          ctx = this.ctx

      ctx.save()
      ctx.clearRect(0, 0, this.width, this.height)

      this.orbits.forEach(function (orbit, index) {
        orbit.draw(ctx)
        orbit.planets.forEach(function (planet) {
          planet.draw.call(planet, ctx)
        })
      })
      ctx.restore()

      that.spinAnim = window.requestAnimationFrame(that.spin.bind(that))
    }

    Galaxy.prototype.pause = function () {
      var that = this,
          ctx = this.ctx
      
      window.cancelAnimationFrame(that.spinAnim)
      ctx.clearRect(0, 0, this.width, this.height)
    }

    function Orbit (x, y, radius, color) {
      this.planets = []
      this.radius = radius
      this.color = color
      this.x = x
      this.y = y
    }

    Orbit.prototype.draw = function (ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.lineWidth = '2'
      ctx.strokeStyle = this.color
      ctx.stroke()
    }

    Orbit.prototype.addPlanet = function (planet) {
      this.planets.push(planet)
      planet.orbit = this
    }

    function Planet (size, color, velocity) {
      this.size = size
      this.color = color
      this.velocity = velocity
      this.offset = Math.random() * 360
    }

    Planet.prototype.draw = function (ctx) {
      this.x = this.orbit.x + this.orbit.radius * Math.cos(this.offset)
      this.y = this.orbit.y + this.orbit.radius * Math.sin(this.offset)

      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.strokeStyle = this.color
      ctx.stroke()

      this.offset += this.velocity
    }

    function hexToRgb(hex) {
      var bigint = parseInt(hex, 16);
      var r = (bigint >> 16) & 255;
      var g = (bigint >> 8) & 255;
      var b = bigint & 255;

      return [r, g, b].join(',')
    }


    /**
     * Index page animation:  screenshot layer
     */
    function initLayerAnim () {
      var featureScene = document.querySelector('.feature')
      var img_level_1 = featureScene.querySelector('.level1')
      var img_level_2 = featureScene.querySelector('.level2')
      var img_level_3 = featureScene.querySelector('.level3')
      var img_level_4 = featureScene.querySelector('.level4')

      var featureScroll = new AppearController(featureScene, {
        threshold: -30,
        appear: function (el, offset) {
          var layerSequence = [
            { e: img_level_1, p: { left: '0px' }, o: { easing: 'ease-out', duration: 700 } },
            { e: img_level_2, p: { left: '15px' }, o: { easing: 'ease-out', duration: 700}},
            { e: img_level_3, p: { left: '15px' }, o: { easing: 'ease-out', duration: 700 } },
            { e: img_level_4, p: { left: '-15px' }, o: { easing: 'ease-out', duration: 700 } }
          ]

          Velocity.RunSequence(layerSequence)
          this._destroy()
        }
      })
    }

    initLayerAnim()


    /**
     * Index page animation:  Galaxy
     */
    function initGalaxy() {
      var leftCanvas = document.getElementById('left-canvas'),
          rightCanvas = document.getElementById('right-canvas'),
          firstScene = BODY.querySelector('.header'),
          bodyWidth = BODY.clientWidth

      if (bodyWidth > 900) {
        var leftGalaxy = new Galaxy(leftCanvas, 'FEEE8E'),
            rightGalaxy = new Galaxy(rightCanvas, '2DFFFE')

        new AppearController(firstScene, {
          appear: function () {
            leftGalaxy.spin()
            rightGalaxy.spin()
          },
          disappear: function () {
            leftGalaxy.pause()
            rightGalaxy.pause()
          }
        })

      }  
    }

    initGalaxy()

    /**
     * Index page back to top
     */
    function initBack2Top () {
      var firstScene = BODY.querySelector('.header'),
          back2top = document.getElementById('back2top')

      new AppearController(firstScene, {
        threshold: -50,
        appear: function () {
          back2top.classList.remove('show')
        },
        disappear: function () {
          back2top.classList.add('show')
        }
      })
      
      back2top.addEventListener('click', function (e) {
        window.scrollTo && window.scrollTo(0, 0)
      })
    }

    initBack2Top()
  } else {}
})();