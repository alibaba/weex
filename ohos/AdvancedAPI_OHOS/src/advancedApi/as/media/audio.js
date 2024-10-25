export function createInnerAudioContext() {
  console.debug('[AdvancedAPI] start createInnerAudioContext')
  const audio = requireAPI('ASAudio')
  return audio.createInnerAudioContext()
}
