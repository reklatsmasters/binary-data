const { isType, isFunction } = require('../util')

module.exports = when

function when(condition, type) {
  if (!isType(type)) {
    throw new Error('Argument #2 should be a valid type.')
  }

  return {
    encode,
    decode,
    encodingLength
  }

  function encode(value, wstream, context) {
    encode.bytes = 0
    encode.status = false

    encode.status = isFunction(condition) ? Boolean(condition(context)) : Boolean(condition)

    if (!encode.status) {
      return
    }

    type.encode(value, wstream, context)
    encode.bytes += type.encode.bytes
  }

  function decode(rstream) {
    const context = this

    decode.bytes = 0
    decode.status = false

    decode.status = isFunction(condition) ? Boolean(condition(context)) : Boolean(condition)

    if (!decode.status) {
      return null
    }

    const value = type.decode.call(context, rstream)
    decode.bytes += type.decode.bytes

    return value
  }

  function encodingLength(value) {
    return type.encodingLength(value)
  }
}
