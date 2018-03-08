const decodeCommon = require('../decode')
const encodeCommon = require('../encode')
const encodingLengthCommon = require('../encoding-length')
const { isType, isFunction } = require('../util')
const symbols = require('../internal/symbols')

module.exports = reserved

function reserved(type, size = 1) {
  if (!isType(type)) {
    throw new TypeError('Invalid data type.')
  }

  if (!Number.isInteger(size) && !isFunction(size)) {
    throw new TypeError('Argument #2 should be a valid integer or function.')
  }

  return {
    [symbols.skip]: true,
    encodingLength,
    decode,
    encode
  }

  function encodingLength(value, context) {
    const count = isFunction(size) ? size(context) : size

    return encodingLengthCommon(value, type, context) * count
  }

  function decode(rstream) {
    const context = this
    decode.bytes = 0

    const count = isFunction(size) ? size(context) : size

    if (count === 0) {
      return
    }

    for (let i = count; i > 0; --i) {
      decodeCommon(rstream, type)
      decode.bytes += decodeCommon.bytes
    }
  }

  function encode(value, wstream, context) {
    encode.bytes = 0

    const count = isFunction(size) ? size(context) : size

    if (count === 0) {
      return
    }

    for (let i = count; i > 0; --i) {
      encodeCommon(0, wstream, type)
      encode.bytes += encodeCommon.bytes
    }
  }
}
