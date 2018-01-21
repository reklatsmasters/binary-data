const isPlainObject = require('is-plain-object')
const { isUserType, isEncodeType, isType } = require('./util')

module.exports = encodeCommon

function encode(obj, wstream, schema) {
  encode.bytes = 0

  if (!isPlainObject(obj)) {
    throw new TypeError('Argument #1 should be a plain object.')
  }

  if (!isUserType(schema)) {
    throw new TypeError('Argument #3 should be a plain object.')
  }

  const context = {
    node: obj
  }

  let bytes = 0

  for (const key of Object.keys(schema)) {
    const value = obj[key]
    const type = schema[key]

    if (isUserType(type) && !isEncodeType(type)) {
      encode(value, wstream, type)
      bytes += encode.bytes

      continue
    }

    if (!isEncodeType(type)) {
      throw new TypeError(`Field '${key}' has an unknown type.`)
    }

    type.encode(value, wstream, context)
    bytes += type.encode.bytes
  }

  encode.bytes = bytes
  context.node = null // Unref
}

function encodeCommon(item, wstream, type) {
  let bytes = 0

  if (isType(type)) {
    type.encode(item, wstream)
    bytes = type.encode.bytes
  } else {
    encode(item, wstream, type)
    bytes = encode.bytes
  }

  encodeCommon.bytes = bytes
}
