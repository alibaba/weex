import avSession from '@ohos.multimedia.avsession'
import wantAgent from '@ohos.app.ability.wantAgent'
import media from '@ohos.multimedia.media'
import backgroundTaskManager from '@ohos.resourceschedule.backgroundTaskManager'
import { isFileUri, getFdFromUriOrSandBoxPath, isSandboxPath } from '../../util/index'
import audio from '@ohos.multimedia.audio'
import { AbilityBase, context } from '../../../base/bridge/abilityBase'

// 音频播放状态
const StateType = {
  // 音频播放空闲
  IDLE: 'idle',
  // 音频正在播放
  PLAYING: 'playing',
  // 音频暂停播放
  PAUSED: 'paused',
  // 音频停止播放
  STOPPED: 'stopped',
  // 错误状态
  ERROR: 'error'
}
function createAVSession(backgroundAudioManager) {
  console.debug('[AdvancedAPI] createAVSession begin')
  avSession.createAVSession(context, 'player', 'audio').then((data) => {
    console.debug('[AdvancedAPI] createAVSession succeed')
    backgroundAudioManager.avSession = data
  })
}
function destroyAVSession(backgroundAudioManager) {
  console.debug('[AdvancedAPI] destroyAVSession begin')
  if (backgroundAudioManager.avSession === null) {
    console.debug('[AdvancedAPI] avSession is null')
    return
  }
  backgroundAudioManager.avSession.destroy()
}
function startBackgroundTask() {
  AbilityBase.getAbilityInfo().then(abilityInfo => {
    const wantAgentInfo = {
      wants: [
        {
          bundleName: abilityInfo.bundleName,
          abilityName: abilityInfo.name
        }
      ],
      operationType: wantAgent.OperationType.START_ABILITY,
      requestCode: 0,
      wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
    }
    // use WantAgent to notify
    wantAgent.getWantAgent(wantAgentInfo).then((wantAgentObj) => {
      return backgroundTaskManager.startBackgroundRunning(context, backgroundTaskManager.BackgroundMode.AUDIO_PLAYBACK, wantAgentObj)
    }).then(() => {
      console.debug('[AdvancedAPI]  start bg operation succeeded')
    }).catch((err) => {
      console.error('[AdvancedAPI]  start bg operation failed Cause: ' + err)
    })
  })
}
function stopBackgroundTask() {
  backgroundTaskManager.stopBackgroundRunning(context).then(() => {
    console.debug('[AdvancedAPI]  stop operation succeeded')
  }).catch((err) => {
    console.error('[AdvancedAPI]  stop operation fail cause: ' + JSON.stringify(err))
  })
}
export default class ASBGAudio {
  constructor() {
    this.backgroundAudioManager = new BackgroundAudioManager()
  }
}
class BackgroundAudioManager {
  constructor() {
    this.bufferedS = 0
    this.avSession = null
    this.startTimeS = 0
    this.onWaitingCallback = null
    this.titleS = null
    this.epnameS = null
    this.singerS = null
    this.coverImgUrlS = null
    this.webUrlS = null
    this.protocolS = 'http'
    this.onFinishCallback = null
    this.tempSrc = ''
    this.onCanplayCallback = null
    this.onPlayCallback = null
    this.onPauseCallback = null
    this.onStopCallback = null
    this.onTimeUpdateCallback = null
    this.onErrorCallback = null
    this.init()
  }
  init() {
    this.audioPlayer = media.createAudioPlayer()
    this.audioPlayer.on('finish', () => {
      destroyAVSession(this)
      stopBackgroundTask()
      if (this.onFinishCallback) {
        this.onFinishCallback({})
      }
    })
    this.audioPlayer.on('dataLoad', () => {
      if (this.onCanplayCallback) {
        this.onCanplayCallback({})
      }
    })
    this.audioPlayer.on('bufferingUpdate', (infoType, value) => {
      console.info(`[AdvancedAPI] bgAudio bufferingUpdate ${infoType} ${value}`)
      if (infoType === 3 && value !== 0) {
        this.bufferedS = value
        if ((this.audioPlayer.currentTime / 1000) >= (this.audioPlayer.duration * value / 100000) && this.onWaitingCallback) {
          this.onWaitingCallback({})
        }
      }
    })
    this.audioPlayer.on('audioInterrupt', (InterruptEvent) => {
      console.info('[AdvancedAPI]  audioInterrupt:' + JSON.stringify(InterruptEvent))
      if (InterruptEvent.hintType === audio.InterruptHint.INTERRUPT_HINT_PAUSE) {
        this.audioPlayer.pause()
      }
      if (InterruptEvent.hintType === audio.InterruptHint.INTERRUPT_HINT_RESUME) {
        this.audioPlayer.play()
      }
    })

    this.audioPlayer.on('play', () => {
      if (this.onPlayCallback) {
        this.onPlayCallback({})
      }
    })

    this.audioPlayer.on('pause', () => {
      if (this.onPauseCallback) {
        this.onPauseCallback({})
      }
    })

    this.audioPlayer.on('timeUpdate', res => {
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(res / 1000)
      }
    })

    this.audioPlayer.on('error', (err) => {
      if (this.onErrorCallback) {
        this.onErrorCallback(err)
      }
    })
  }
  get duration() {
    return this.audioPlayer.duration / 1000
  }
  get currentTime() {
    return this.audioPlayer.currentTime / 1000
  }
  get paused() {
    return this.audioPlayer.state === StateType.PAUSED
  }
  get src() {
    return this.audioPlayer.src
  }
  set src(value) {
    if (typeof (value) !== 'string') {
      console.error(`[AdvancedAPI] src: ${value} is invalid`)
      return
    }
    if (!value || !(value.startsWith('http:') || value.startsWith('https:')
            || isFileUri(value) || isSandboxPath(value))) {
      console.error(`[AdvancedAPI] src: ${value} is invalid`)
      return
    }
    let path
    if (value.startsWith('http:') || value.startsWith('https:')) {
      path = value
    } else if (isFileUri(value) || isSandboxPath(value)) {
      try {
        const fd = getFdFromUriOrSandBoxPath(value)
        path = `fd://${fd}`
      } catch (error) {
        console.info(`${JSON.stringify(error)}`)
      }
    }
    if (this.audioPlayer.src && path !== this.audioPlayer.src) {
      this.audioPlayer.reset()
    }
    this.audioPlayer.src = path
    this.tempSrc = value
    this.audioPlayer.play()
    if (this.startTimeS) {
      this.audioPlayer.seek(this.startTimeS)
    }
    startBackgroundTask()
    createAVSession(this)
  }
  get startTime() {
    return this.startTimeS / 1000
  }
  set startTime(time) {
    this.startTimeS = time * 1000
  }
  get buffered() {
    return this.audioPlayer.duration * this.bufferedS / 100000
  }
  get title() {
    return this.titleS
  }
  set title(titleName) {
    this.titleS = titleName
  }
  get epname() {
    return this.epnameS
  }
  set epname(epName) {
    this.epnameS = epName
  }
  get singer() {
    return this.singerS
  }
  set singer(singerName) {
    this.singerS = singerName
  }
  get coverImgUrl() {
    return this.coverImgUrlS
  }
  set coverImgUrl(url) {
    this.coverImgUrlS = url
  }
  get webUrl() {
    return this.webUrlS
  }
  set webUrl(url) {
    this.webUrlS = url
  }
  get protocol() {
    return this.protocolS
  }
  set protocol(protocolType) {
    this.protocolS = protocolType
  }
  play() {
    const state = this.audioPlayer.state
    if (![StateType.PAUSED, StateType.STOPPED, StateType.IDLE].includes(state)) {
      return
    }
    if (this.tempSrc && this.audioPlayer.src === '') {
      this.src = this.tempSrc
    }
    this.audioPlayer.play()
    startBackgroundTask()
    createAVSession(this)
  }
  pause() {
    const state = this.audioPlayer.state
    if (StateType.PLAYING !== state) {
      return
    }
    this.audioPlayer.pause()
  }
  stop() {
    const state = this.audioPlayer.state
    if (![StateType.PAUSED, StateType.PLAYING].includes(state)) {
      return
    }
    this.audioPlayer.stop()
    if (this.onStopCallback) {
      this.onStopCallback({})
    }
    this.audioPlayer.release()
    this.init()
    destroyAVSession(this)
    stopBackgroundTask()
  }
  seek(position) {
    const state = this.audioPlayer.state
    if (![StateType.PAUSED, StateType.PLAYING].includes(state)) {
      return
    }
    this.audioPlayer.seek(position * 1000)
  }
  onCanplay(callback) {
    this.onCanplayCallback = callback
  }
  onPlay(callback) {
    this.onPlayCallback = callback
  }
  onPause(callback) {
    this.onPauseCallback = callback
  }
  onStop(callback) {
    this.onStopCallback = callback
  }
  onEnded(callback) {
    this.onFinishCallback = callback
  }
  onTimeUpdate(callback) {
    this.onTimeUpdateCallback = callback
  }
  onError(callback) {
    this.onErrorCallback = callback
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
}
