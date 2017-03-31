<template>
  <scroller>
    <panel title="Clipboard" type="primary">
      <panel title="Copy to clipboard5">
        <text style="line-height: 40px; font-size: 28px">{{textToCopy}}</text>
        <button type="info" size="middle" value="Copy" @click.native="doCopy"></button>
      </panel>

      <panel title="Paste from clipboard">
        <text style="line-height: 40px; font-size: 28px">{{textFromPaste}}</text>
        <button type="info" size="middle" value="Paste" @click.native="doPaste"></button>
      </panel>

      <panel title="Result">
        <tip style="margin-bottom: 20px;" :value="tips"></tip>
      </panel>

    </panel>
  </scroller>
</template>

<script>
  var modal = weex.requireModule('modal')
  var clipboard = weex.requireModule('clipboard')
  module.exports = {
    data: function () {
      return {
        textToCopy : '',
        textFromPaste: '',
        tips : ''
      }
    },
    components: {
      panel: require('../include/panel.vue'),
      tip: require('../include/tip.vue'),
      button: require('../include/button.vue')
    },
    mounted: function() {
      this.tips = "1. Just click COPY button. It will auto generate a string with random text, and copy to system clipboard. \n 2. do copy in another app, then come back and click PASTE button."
    },
    methods: {
      doCopy: function() {
        modal.toast({'message': 'doCopy!', duration: 0.5})
        textToCopy = "autoGenerateTextToCopy" + Math.random()
        clipboard.setString(textToCopy)
        this.textToCopy = textToCopy
        this.tips = "copy done. Now system clipboard has string of '" + textToCopy + "', try PASTE button, or paste in another app."
      },
      doPaste: function() {
        var me = this
        modal.toast({'message': 'doPaste!', duration: 0.5})
        clipboard.getString(function(ret) {
          console.log("paste result is " + JSON.stringify(ret))
          me.textFromPaste = ret.data
          me.tips = "Paste done. Only support native(Android/iOS) NOW. according to security reason, paste in html5 is not supported."
        })
      }
    }
  }
</script>
