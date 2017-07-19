const decode = require('../decode')
const encode = require('../encode')
const encodingLength = require('../encoding-length')
const { isType, isFunction } = require('../util')

class Reserved {
  constructor(type, size) {
    this.type = type
    this.size = size
  }

  encode(_, wstream, context) {
    this.encode.bytes = 0

    const size = isFunction(this.size) ? this.size(context) : this.size

    if (size === 0) {
      return
    }

    for (let i = size; i > 0; --i) {
      encode(0, wstream, this.type)
      this.encode.bytes += encode.bytes
    }
  }

  decode(rstream, context) {
    this.decode.bytes = 0

    const size = isFunction(this.size) ? this.size(context) : this.size

    if (size === 0) {
      return
    }

    for (let i = size; i > 0; --i) {
      decode(rstream, this.type)
      this.decode.bytes += decode.bytes
    }
  }

  encodingLength(value) {
    return encodingLength(value, this.type) * this.size
  }
}

module.exports = function reserved(type, size = 1) {
  if (!isType(type)) {
    throw new TypeError('Invalid data type.')
  }

  if (!Number.isInteger(size) && !isFunction(size)) {
    throw new TypeError('Argument #2 should be a valid integer or function.')
  }

  return new Reserved(type, size)
}

module.exports.Reserved = Reserved
