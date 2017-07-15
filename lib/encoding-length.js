const { isUserType, isType } = require('./util')
const isPlainObject = require('is-plain-object')

module.exports = encodingLengthCommon

function encodingLength(obj, schema) {
  if (!isPlainObject(obj)) {
    throw new TypeError('Argument #1 should be a plain object.')
  }

  if (!isUserType(schema)) {
    throw new TypeError('Argument #2 should be a plain object.')
  }

  return Object.keys(schema).reduce(
    (counter, key) => counter + encodingLengthCommon(obj[key], schema[key]),
    0
  )
}

function encodingLengthCommon(item, type) {
  return isType(type) ? type.encodingLength(item) : encodingLength(item, type)
}
