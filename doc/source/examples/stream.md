---
title: stream
type: example
layout: example
web_bundle_url: ../js/examples/stream.web.js
---

```html
<template>
  <div class="wrapper">
    <div class="group">
      <text class="title">Weex Star :</text>
      <text class="count">{{weexStar}}</text>
    </div>
    <div class="group">
      <text class="title">Vue Star :</text>
      <text class="count">{{vueStar}}</text>
    </div>
  </div>
</template>

<script>
  var stream = weex.requireModule('stream')
  export default {
    data () {
      return {
        weexStar: 'unknown',
        vueStar: 'unknown'
      }
    },

    methods: {
      getStarCount (repo, callback) {
        return stream.fetch({
          method: 'GET',
          type: 'json',
          url: 'https://api.github.com/repos/' + repo
        }, callback)
      }
    },
    created () {
      this.getStarCount('alibaba/weex', res => {
        this.weexStar = res.ok ? res.data.stargazers_count : '(network error)'
      })
      this.getStarCount('vuejs/vue', res => {
        this.vueStar = res.ok ? res.data.stargazers_count : '(network error)'
      })
    }
  }
</script>


<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .group {
    flex-direction: row;
    justify-content: center;
    margin-bottom: 40px;
  }
  .title {
    font-size: 45px;
    color: #888888;
  }
  .count {
    font-size: 45px;
    font-weight: bold;
    margin-left: 12px;
    color: #41B883;
  }
</style>
```
