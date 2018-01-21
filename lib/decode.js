// We need export here to avoid cyclic requires error.
module.exports = decodeCommon

const { Reserved } = require('./types/reserved')
const { isType, isUserType, isDecodeType } = require('./util')

function decode(rstream, schema) {
  decode.bytes = 0

  if (!isUserType(schema)) {
    throw new TypeError('Argument #2 should be a plain object.')
  }

  const result = {}

  const context = {
    node: result
  }

  let bytes = 0

  for (const key of Object.keys(schema)) {
    const type = schema[key]

    if (isUserType(type) && !isDecodeType(type)) {
      result[key] = decode(rstream, type)
      bytes += decode.bytes

      continue
    }

    if (!isDecodeType(type)) {
      throw new TypeError(`Field '${key}' has an unknown type.`)
    }

    const value = type.decode(rstream, context)
    bytes += type.decode.bytes

    // Skip `reserved` field
    if (type instanceof Reserved) {
      continue
    }

    result[key] = value
  }

  decode.bytes = bytes
  context.node = null // Unref
  return result
}

function decodeCommon(rstream, type) {
  let v
  let bytes = 0

  if (isType(type)) {
    v = type.decode(rstream)
    bytes = type.decode.bytes
  } else {
    v = decode(rstream, type)
    bytes = decode.bytes
  }

  decodeCommon.bytes = bytes
  return v
}
