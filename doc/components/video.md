## &lt;video> Compoent

Use the **&lt;video> compoent** to embed video content in a **WeexPage**.

### Attributes

- `src`: The URL of the video to embed.
- `play_status`: `play` | `pause` Use it control video play/pause.
- `auto_play`: `true` | `false` A Boolean attribute. defalut value is `false`.

### Events

- `start`: Sent when playback state is Playing.
- `pause`: Sent when playback state is Paused.
- `finish`: Sent when playback state is Finished.
- `fail`: Sent when playback state is Failed.

### Children

Can't hava child.

### Example

```html
<container>
	<video class="video" src="..." style="width:500;height:500;"></video>
</container>
```
