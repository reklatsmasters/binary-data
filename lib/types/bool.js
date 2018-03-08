const { isType } = require('../util')

module.exports = bool

function bool(type) {
  if (!isType(type)) {
    throw new TypeError('Argument #1 should be valid type.')
  }

  function decode(rstream) {
    const context = this

    const value = Boolean(type.decode.call(context, rstream))
    decode.bytes = type.decode.bytes

    return value
  }

  function encode(value, wstream) {
    type.encode(value ? 1 : 0, wstream)
    encode.bytes = type.encode.bytes
  }

  return {
    encode,
    decode,
    encodingLength: type.encodingLength
  }
}
