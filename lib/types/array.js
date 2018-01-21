const decodeCommon = require('../decode')
const encodeCommon = require('../encode')
const encodingLengthCommon = require('../encoding-length')
const { isType, isUserType, isFunction } = require('../util')

module.exports = array

function array(type, length, lengthType = 'count') {
  if (!isType(type) && !isUserType(type)) {
    throw new TypeError('Argument #1 should be a valid type.')
  }

  const isLengthInBytes = lengthType === 'bytes'
  const isnum = typeof length === 'number'
  const istype = isType(length)
  const isfunc = isFunction(length)

  if (!isnum && !istype && !isfunc) {
    throw new TypeError('Unknown type of argument #1.')
  }

  return {
    encode,
    decode,
    encodingLength
  }

  function encode(items, wstream, context) {
    checkArray(items)

    encode.bytes = 0
    let expectedSize = 0

    if (istype) {
      expectedSize = items.length
    } else if (isnum) {
      expectedSize = length
    } else if (isfunc) {
      expectedSize = length(context)

      checkArraySizeType(expectedSize)
    }

    if (!isLengthInBytes) {
      checkArraySize(expectedSize, items.length)
    }

    if (isLengthInBytes) {
      const requiredLength = items.reduce(
        (counter, item) => counter + encodingLengthCommon(item, type),
        0
      )

      if (istype) {
        expectedSize = requiredLength
      }

      checkArraySize(requiredLength, expectedSize)
    }

    if (istype) {
      length.encode(expectedSize, wstream)
      encode.bytes += length.encode.bytes
    }

    items.forEach(item => {
      encodeCommon(item, wstream, type)
      encode.bytes += encodeCommon.bytes
    })
  }

  function decode(rstream, context) {
    decode.bytes = 0
    let expectedSize = 0

    if (isnum) {
      expectedSize = length
    } else if (istype) {
      expectedSize = length.decode(rstream)
      decode.bytes += length.decode.bytes
    } else if (isfunc) {
      expectedSize = length(context)
    }

    checkArraySizeType(expectedSize)

    const result = isLengthInBytes ?
      decodeBytes(type, expectedSize, rstream) :
      decodeCount(type, expectedSize, rstream)

    decode.bytes += result.bytes
    return result.items
  }

  function encodingLength(items) {
    checkArray(items)

    let size = 0

    if (isnum && isLengthInBytes) {
      return length
    }

    if (istype && !isLengthInBytes) {
      size = length.encodingLength(items.length)
    }

    size = items.reduce(
      (counter, item) => counter + encodingLengthCommon(item, type),
      size
    )

    if (istype && isLengthInBytes) {
      size += length.encodingLength(size)
    }

    return size
  }
}

function checkArray(items) {
  if (!Array.isArray(items)) {
    throw new TypeError('Argument #1 should be an Array.')
  }
}

function checkArraySizeType(length) {
  if (typeof length !== 'number') {
    throw new TypeError('Length of an array should be a number.')
  }
}

function checkArraySize(requiredSize, havingSize) {
  if (requiredSize !== havingSize) {
    throw new Error(
      `Argument #1 required length ${requiredSize} instead of ${havingSize}`
    )
  }
}

function decodeBytes(type, lengthBytes, rstream, items = []) {
  let bytes = 0

  while (bytes < lengthBytes) {
    items.push(decodeCommon(rstream, type))
    bytes += decodeCommon.bytes
  }

  if (bytes > lengthBytes) {
    throw new Error('Incorrect length of an array.')
  }

  return {
    bytes,
    items
  }
}

function decodeCount(type, length, rstream) {
  let bytes = 0

  const items = Array.from(new Array(length)).map(() => {
    const item = decodeCommon(rstream, type)
    bytes += decodeCommon.bytes

    return item
  })

  return {
    bytes,
    items
  }
}
