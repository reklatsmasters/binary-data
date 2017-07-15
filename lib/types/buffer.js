const { isType, isFunction } = require('../util')

module.exports = function buffer(length) {
  const isnum = typeof length === 'number'
  const istype = isType(length)
  const isfunc = isFunction(length)

  if (!isnum && !istype && !isfunc) {
    throw new TypeError('Unknown type of argument #1.')
  }

  return {
    encode,
    decode,
    encodingLength,
  }

  function encode(buf, wstream, context) {
    checkBuffer(buf)
    encode.bytes = 0

    if (isnum) {
      checkLength(length, buf.length)
    }

    if (istype) {
      length.encode(buf.length, wstream)
      encode.bytes += length.encode.bytes
    }

    if (isfunc) {
      const expectedLength = length(context)

      checkLengthType(expectedLength)
      checkLength(expectedLength, buf.length)
    }

    wstream.writeBuffer(buf)
    encode.bytes += buf.length
  }

  function decode(rstream, context) {
    decode.bytes = 0
    let size = 0

    if (isnum) {
      size = length
    }

    if (istype) {
      size = length.decode(rstream)
      decode.bytes += length.decode.bytes

      checkLengthType(size)
    }

    if (isfunc) {
      size = length(context)

      checkLengthType(size)
    }

    const buf = rstream.readBuffer(size)
    decode.bytes += size

    return buf
  }

  function encodingLength(buf) {
    checkBuffer(buf)
    let size = 0

    if (isnum) {
      return length
    }

    if (istype) {
      size += length.encodingLength(buf.length)
    }

    return size + buf.length
  }
}

function checkBuffer(buf) {
  if (!Buffer.isBuffer(buf)) {
    throw new TypeError('Argument 1 should be a Buffer.')
  }
}

function checkLength(requiredSize, havingSize) {
  if (requiredSize !== havingSize) {
    throw new Error(
      `Buffer required length ${requiredSize} instead of ${havingSize}`
    )
  }
}

function checkLengthType(length) {
  if (typeof length !== 'number') {
    throw new TypeError('Length of a buffer should be a number.')
  }
}
