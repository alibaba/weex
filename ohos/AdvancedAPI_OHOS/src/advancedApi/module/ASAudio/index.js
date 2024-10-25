import media from '@ohos.multimedia.media'
import audio from '@ohos.multimedia.audio'
import fs from '@ohos.file.fs'
import { MediaLibraryBase } from '../../../base/bridge/mediaLibraryBase'
import { switchInternalToHapSandBox } from '../../util/index'

// 音频播放状态
const StateType = {
  // 音频播放空闲
  IDLE: 'idle',
  // 设置播放源
  INITIALIZED: 'initialized',
  // 准备播放
  PREPARED: 'prepared',
  // 音频正在播放
  PLAYING: 'playing',
  // 音频暂停播放
  PAUSED: 'paused',
  // 音频播放完成
  COMPLETED: 'completed',
  // 音频停止播放
  STOPPED: 'stopped',
  // 音频释放
  RELEASED: 'released',
  // 错误状态
  ERROR: 'error',
}

export default class ASAudio {
  createInnerAudioContext() {
    return new InnerAudioContext()
  }
}

class InnerAudioContext {
  count = 0
  stopFlag = false

  constructor() {
    this.tempSrc = ''
    this.startTimeS = 0
    this.autoplayS = false
    this.playbackRateS = 1
    this.bufferedS = 0
    this.volumeS = 1
    this.tempLoop = false
    this.onCanplayCallback = null
    this.onPlayCallback = null
    this.onPauseCallback = null
    this.onStopCallback = null
    this.onEndedCallback = null
    this.onTimeUpdateCallback = null
    this.onErrorCallback = null
    this.onWaitingCallback = null
    this.onSeekedCallback = null
    this.onSeekingCallback = null
    this.init()
  }

  async init() {
    this.avPlayer = await media.createAVPlayer()

    // seek操作结果回调函数
    this.avPlayer.on('seekDone', (seekDoneTime) => {
      console.info(`AVPlayer seek succeeded, seek time is ${seekDoneTime}`)
      if (this.onSeekedCallback) {
        this.onSeekedCallback({})
      }
    })

    // error回调监听函数,当avPlayer在操作过程中出现错误时调用reset接口触发重置流程
    this.avPlayer.on('error', (err) => {
      console.error(`Invoke avPlayer failed, code is ${err.code}, message is ${err.message}`)
      this.avPlayer.reset() // 调用reset重置资源，触发idle状态
      if (this.onErrorCallback) {
        this.onErrorCallback(err)
      }
    })
    // 状态机变化回调函数
    this.avPlayer.on('stateChange', async (state, reason) => {
      switch (state) {
        case 'idle': // 成功调用reset接口后触发该状态机上报
          console.info('AVPlayer state idle called.')
          if (this.stopFlag) {
            this.avPlayer.url = this.tempSrc
            this.stopFlag = false
          }
          break
        case 'initialized': // avplayer 设置播放源后触发该状态上报
          console.info('AVPlayerstate initialized called.')
          this.avPlayer.prepare().then(() => {
            console.info('AVPlayer prepare succeeded.')
            if (this.onCanplayCallback) {
              this.onCanplayCallback({})
            }
          }, (err) => {
            console.error(`Invoke prepare failed, code is ${err.code}, message is ${err.message}`)
          })
          break
        case 'prepared': // prepare调用成功后上报该状态机
          console.info('AVPlayer state prepared called.')
          if (this.count === 0 && this.autoplayS) {
            this.avPlayer.play()
            if (this.onPlayCallback) {
              this.onPlayCallback({})
            }
            if (this.startTimeS) {
              if (this.onSeekingCallback) {
                this.onSeekingCallback({})
              }
              this.avPlayer.seek(this.startTimeS)
            }
          }
          this.count++

          // 处理属性
          this.avPlayer.loop = this.tempLoop
          this.avPlayer.setVolume(this.volumeS)
          this.avPlayer.setSpeed(this.playbackRateS)
          break
        case 'playing': // play成功调用后触发该状态机上报
          console.info('AVPlayer state playing called.')

          // 处理属性
          this.avPlayer.loop = this.tempLoop
          this.avPlayer.setVolume(this.volumeS)
          this.avPlayer.setSpeed(this.playbackRateS)
          break
        case 'paused': // pause成功调用后触发该状态机上报
          console.info('AVPlayer state paused called.')

          // 处理属性
          this.avPlayer.loop = this.tempLoop
          this.avPlayer.setVolume(this.volumeS)
          this.avPlayer.setSpeed(this.playbackRateS)
          break
        case 'completed': // 播放结束后触发该状态机上报
          console.info('AVPlayer state completed called.')
          if (this.onEndedCallback) {
            this.onEndedCallback({})
          }

          // 处理属性
          this.avPlayer.loop = this.tempLoop
          this.avPlayer.setVolume(this.volumeS)
          this.avPlayer.setSpeed(this.playbackRateS)
          break
        case 'stopped': // stop接口成功调用后触发该状态机上报
          console.info('AVPlayer state stopped called.')
          this.avPlayer.reset() // 调用reset接口初始化avplayer状态
          this.stopFlag = true
          break
        case 'released':
          console.info('AVPlayer state released called.')
          break
        default:
          console.info('AVPlayer state unknown called.')
          break
      }
    })

    this.avPlayer.on('timeUpdate', res => {
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(res / 1000)
      }
    })

    this.avPlayer.on('bufferingUpdate', (infoType, value) => {
      console.info(`[AdvancedAPI] avPlayer bufferingUpdate ${infoType} ${value}`)
      if (infoType === 3 && value !== 0) {
        this.bufferedS = value
        // 为缓存百分比
        if ((this.avPlayer.currentTime / 1000) >= (this.avPlayer.duration * value / 100000) && this.onWaitingCallback) {
          this.onWaitingCallback({})
        }
      }
    })

    this.avPlayer.on('audioInterrupt', (InterruptEvent) => {
      console.info('[AdvancedAPI]  audioInterrupt:' + JSON.stringify(InterruptEvent))
      if (InterruptEvent.hintType === audio.InterruptHint.INTERRUPT_HINT_PAUSE) {
        this.avPlayer.pause()
        if (this.onPauseCallback) {
          this.onPauseCallback({})
        }
      }
    })

    this.avPlayer.on('endOfStream', () => {
      console.info('[AdvancedAPI]  rePlay:endOfStream success')
      if (this.avPlayer.loop) {
        this.avPlayer.play()
        if (this.startTimeS) {
          if (this.onSeekingCallback) {
            this.onSeekingCallback({})
          }
          this.avPlayer.seek(this.startTimeS)
        }
      }
    })
  }

  get duration() {
    if (!this.avPlayer) {
      console.error(`[AdvancedAPI] avPlayer is not exist, get duration fail`)
      return 0
    }
    return this.avPlayer.duration / 1000
  }

  get currentTime() {
    if (!this.avPlayer) {
      console.error(`[AdvancedAPI] avPlayer is not exist, get currentTime fail`)
      return 0
    }
    return this.avPlayer.currentTime / 1000
  }

  get paused() {
    if (!this.avPlayer) {
      console.error(`[AdvancedAPI] avPlayer is not exist, get paused fail`)
      return true
    }
    return this.avPlayer.state === StateType.PAUSED
  }

  get loop() {
    return this.tempLoop
  }

  set loop(value) {
    if (typeof (value) !== 'boolean') {
      console.error(`[AdvancedAPI] loop: ${value} is invalid`)
      return
    }
    this.tempLoop = value

    if (this.avPlayer && [StateType.PREPARED, StateType.PLAYING, StateType.PAUSED, StateType.COMPLETED].includes(this.avPlayer.state)) {
      console.info('current state is ' + this.avPlayer.state + ' can set loop')
      this.avPlayer.loop = value
    }
  }

  get volume() {
    return this.volumeS
  }

  set volume(value) {
    if (typeof (value) !== 'number') {
      console.error(`[AdvancedAPI] volume: ${value} is invalid`)
      return
    }
    this.volumeS = value
    if (this.avPlayer && [StateType.PREPARED, StateType.PLAYING, StateType.PAUSED, StateType.COMPLETED].includes(this.avPlayer.state)) {
      console.info('current state is ' + this.avPlayer.state + ' can set volume')
      this.avPlayer.setVolume(value)
    }
  }

  get autoplay() {
    return this.autoplayS
  }

  set autoplay(flag) {
    if (typeof (flag) !== 'boolean') {
      console.error(`[AdvancedAPI] autoplay: ${flag} is invalid`)
      return
    }
    this.autoplayS = flag
  }

  get startTime() {
    return this.startTimeS / 1000
  }

  set startTime(time) {
    if (typeof (time) !== 'number') {
      console.error(`[AdvancedAPI] startTIme: ${time} is invalid`)
      return
    }
    this.startTimeS = time * 1000
  }

  get src() {
    if (!this.avPlayer) {
      console.error(`[AdvancedAPI] avPlayer is not exist, get src fail`)
      return ''
    }
    return this.avPlayer.url
  }

  set src(value) {
    if (typeof (value) !== 'string') {
      console.error(`[AdvancedAPI] src: ${value} is invalid`)
      return
    }
    if (!this.avPlayer) {
      console.error(`[AdvancedAPI] avPlayer is not exist, set src fail`)
      return
    }
    if (!value || !(value.startsWith('http:') || value.startsWith('https:')
      || value.startsWith('datashare:') || value.startsWith('internal://'))) {
      console.error(`[AdvancedAPI] src: ${value} is invalid`)
      return
    }
    if (this.avPlayer.state !== StateType.IDLE) {
      console.error('current state is ' + this.avPlayer.state + ' can not set url')
      return
    }
    let path
    if (value.startsWith('http:') || value.startsWith('https:')) {
      path = value
    } else if (value.startsWith('internal://')) {
      try {
        const uri = switchInternalToHapSandBox(value)
        const file = fs.openSync(uri, fs.OpenMode.READ_ONLY)
        const fd = file.fd
        path = `fd://${fd}`
      } catch (error) {
        console.info(`${JSON.stringify(error)}`)
      }
    } else if (value.startsWith('datashare:')) {
      try {
        const media = MediaLibraryBase.getMedia()
        const fileKeyObj = MediaLibraryBase.getFileKey()
        const audioType = MediaLibraryBase.getMediaType('AUDIO')
        const audiosfetchOp = {
          selections: fileKeyObj.MEDIA_TYPE + '= ?',
          selectionArgs: [audioType.toString()],
          uri: value,
        }
        media.getFileAssets(audiosfetchOp).then(fileResult => {
          fileResult.getFirstObject().then(asset => {
            MediaLibraryBase.getFd(asset).then(fd => {
              path = `fd://${fd}`
              if (this.avPlayer.url && path !== this.avPlayer.url) {
                this.avPlayer.reset()
              }
              this.avPlayer.url = path
            })
          })
        })
        return
      } catch (error) {
        console.error(`[AdvancedAPI] src: ${value} is invalid`)
        return
      }
    }
    if (this.avPlayer.url && path !== this.avPlayer.url) {
      this.avPlayer.reset()
    }
    this.avPlayer.url = path
    this.tempSrc = path
  }

  get buffered() {
    if (!this.avPlayer) {
      console.error(`[AdvancedAPI] avPlayer is not exist, get buffered fail`)
      return 0
    }
    return this.avPlayer.duration * this.bufferedS / 100000
  }

  get playbackRate() {
    return this.playbackRateS
  }

  set playbackRate(value) {
    if (typeof (value) !== 'number') {
      console.error(`[AdvancedAPI] speed: ${value} is invalid`)
      return
    }
    let rate
    if (value <= 0.75) {
      rate = media.PlaybackSpeed.SPEED_FORWARD_0_75_X
    } else if (value > 0.75 && value <= 1) {
      rate = media.PlaybackSpeed.SPEED_FORWARD_1_00_X
    } else if (value > 1 && value <= 1.25) {
      rate = media.PlaybackSpeed.SPEED_FORWARD_1_25_X
    } else if (value > 1.25 && value <= 1.75) {
      rate = media.PlaybackSpeed.SPEED_FORWARD_1_75_X
    } else {
      rate = media.PlaybackSpeed.SPEED_FORWARD_2_00_X
    }
    this.playbackRateS = rate
    if (this.avPlayer && [StateType.PREPARED, StateType.PLAYING, StateType.PAUSED, StateType.COMPLETED].includes(this.avPlayer.state)) {
      console.info('current state is ' + this.avPlayer.state + ' can not set playbackRate')
      this.avPlayer.setSpeed(rate)
    }
  }

  play() {
    if (!this.avPlayer) {
      console.error(`[AdvancedAPI] avPlayer is not exist, play fail`)
      return
    }
    if (![StateType.PREPARED, StateType.PAUSED, StateType.COMPLETED].includes(this.avPlayer.state)) {
      console.error('current state is ' + this.avPlayer.state + ' can not play')
      return
    }
    if (this.tempSrc && this.avPlayer.url === '') {
      this.avPlayer.url = this.tempSrc
    }
    this.avPlayer.play()
    if (this.onPlayCallback) {
      this.onPlayCallback({})
    }
  }

  pause() {
    if (!this.avPlayer) {
      console.error(`[AdvancedAPI] avPlayer is not exist, pause fail`)
      return
    }
    const state = this.avPlayer.state
    if (StateType.PLAYING !== state) {
      console.error('current state is ' + this.avPlayer.state + 'can not pause')
      return
    }
    this.avPlayer.pause()
    if (this.onPauseCallback) {
      this.onPauseCallback({})
    }
  }

  stop() {
    if (!this.avPlayer) {
      console.error(`[AdvancedAPI] avPlayer is not exist, stop fail`)
      return
    }
    // prepared/playing/paused/complete
    if (![StateType.PREPARED, StateType.PLAYING, StateType.PAUSED, StateType.COMPLETED].includes(this.avPlayer.state)) {
      console.error('current state is ' + this.avPlayer.state + ' can not stop')
      return
    }
    this.avPlayer.stop()
    if (this.onStopCallback) {
      this.onStopCallback({})
    }
  }

  seek(position) {
    if (!this.avPlayer) {
      console.error(`[AdvancedAPI] avPlayer is not exist, seek fail`)
      return
    }
    if (![StateType.PREPARED, StateType.PLAYING, StateType.PAUSED, StateType.COMPLETED].includes(this.avPlayer.state)) {
      console.error('current state is ' + this.avPlayer.state + ' can not seek')
      return
    }
    if (this.onSeekingCallback) {
      this.onSeekingCallback({})
    }
    this.avPlayer.seek(position * 1000)
  }

  destroy() {
    if (!this.avPlayer) {
      console.error(`[AdvancedAPI] avPlayer is not exist`)
      return
    }
    this.avPlayer.release()
  }

  onCanplay(callback) {
    this.onCanplayCallback = callback
  }

  offCanplay() {
    this.onCanplayCallback = null
  }

  onPlay(callback) {
    this.onPlayCallback = callback
  }

  offPlay() {
    this.onPlayCallback = null
  }

  onPause(callback) {
    this.onPauseCallback = callback
  }

  offPause() {
    this.onPauseCallback = null
  }

  onStop(callback) {
    this.onStopCallback = callback
  }

  offStop() {
    this.onStopCallback = null
  }

  onEnded(callback) {
    this.onEndedCallback = callback
  }

  offEnded() {
    this.onEndedCallback = null
  }

  onTimeUpdate(callback) {
    this.onTimeUpdateCallback = callback
  }

  offTimeUpdate() {
    this.onTimeUpdateCallback = null
  }

  onError(callback) {
    this.onErrorCallback = callback
  }

  offError() {
    this.onErrorCallback = null
  }

  onPrev(callback) {
    console.info('ios only')
  }

  onNext(callback) {
    console.info('ios only')
  }

  onWaiting(callback) {
    this.onWaitingCallback = callback
  }

  offWaiting() {
    this.onWaitingCallback = null
  }

  onSeeking(callback) {
    this.onSeekingCallback = callback
  }

  offSeeking() {
    this.onSeekingCallback = null
  }

  onSeeked(callback) {
    this.onSeekedCallback = callback
  }

  offSeeked() {
    this.onSeekedCallback = null
  }
}
