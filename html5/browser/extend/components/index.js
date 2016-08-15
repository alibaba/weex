import Image from './image'
import Text from './text'
// import Vlist from './vlist'
// import Hlist from './hlist'
import Scrollable from './scrollable'   // TODO
// import Countdown from './countdown'
// import Marquee from './marquee'
import Slider from './slider'
import Indicator from './indicator'
import Tabheader from './tabheader'     // TODO
// import Scroller from './scroller'
import Input from './input'
// import Select from './select'
// import Datepicker from './datepicker'
// import Timepicker from './timepicker'
import Video from './video'
import Switch from './switch'
import A from './a'
import Embed from './embed'
// import Refresh from './refresh'
// import Loading from './loading'
import Spinner from './spinner'
import Web from './web'

export default {
  init: function (Weex) {
    Weex.install(Image)
    Weex.install(Text)
    Weex.install(Scrollable)    // TODO
    // Weex.install(Countdown)
    // Weex.install(Marquee)
    Weex.install(Slider)
    Weex.install(Indicator)
    Weex.install(Tabheader)     // TODO
    Weex.install(Input)
    // Weex.registerComponent('list', Vlist)
    // Weex.registerComponent('vlist', Vlist)
    // Weex.registerComponent('hlist', Hlist)
    // Weex.registerComponent('scroller', Scroller)
    // Weex.registerComponent('select', Select)
    // Weex.registerComponent('datepicker', Datepicker)
    // Weex.registerComponent('timepicker', Timepicker)
    Weex.install(Video)
    Weex.install(Switch)
    Weex.install(A)
    Weex.install(Embed)
    // Weex.install(Refresh)
    // Weex.install(Loading)
    Weex.install(Spinner)
    Weex.install(Web)
  }
}
