# &lt;video&gt;
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

### Summary

Use the &lt;video&gt; component to embed video content in a weex page. The video component use src attribute to specify the source of a video.

### Child Components

This component supports no child components but a text content.

### Attributes

- `src`: &lt;string&gt; The URL of the video to embed.
- `play-status`: &lt;boolean&gt; `play` | `pause`. Use it to control video's play/pause. Default value is `pause`.
- `auto-play`: &lt;boolean&gt; `true` | `false`. Use it to control whether it is playing when the page initialization finished. Defalut value is `false`.

Other attributes please check out the [common attributes](../references/common-attrs.md).

### Styles

**common styles**: check out the [common styles](../references/common-attrs.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

- `start`: triggered when playback state is Playing.
- `pause`: triggered when playback state is Paused.
- `finish`: triggered when playback state is Finished.
- `fail`: triggered when playback state is Failed.

**common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)

### Example

```
<div>
	<video class="video" auto-play="true" play-status="play" src="..." style="width:500;height:500;"></video>
</div>
```


