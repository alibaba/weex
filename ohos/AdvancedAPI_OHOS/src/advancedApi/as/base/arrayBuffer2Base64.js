export function arrayBufferToBase64 (buf) {
  const buffer = requireAPI('ASBuffer')
  return buffer.arrayBufferToBase64(buf)
}
