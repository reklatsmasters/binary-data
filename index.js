const EncodeStream = require('./lib/stream/encode')
const DecodeStream = require('./lib/stream/decode')

const array = require('./lib/types/array')
const buffer = require('./lib/types/buffer')
const bool = require('./lib/types/bool')
const reserved = require('./lib/types/reserved')
const string = require('./lib/types/string')
const numbers = require('./lib/types/numbers')
const when = require('./lib/types/when')

const encode = require('./lib/encode')
const decode = require('./lib/decode')
const encodingLength = require('./lib/encoding-length')

const types = {
  array,
  bool,
  buffer,
  reserved,
  string,
  when
}

for (const type of Object.keys(numbers)) {
  types[type] = numbers[type]
}

function createEncodeStream() {
  return new EncodeStream()
}

function createDecodeStream(buf) {
  if (!Buffer.isBuffer(buf)) {
    throw new TypeError('Argument #1 should be a Buffer.')
  }

  return new DecodeStream(buf)
}

module.exports = {
  /* Main api */
  createEncodeStream,
  createDecodeStream,
  encode,
  decode,
  encodingLength,

  /* Data types */
  types,

  /* Re-export utils */
  EncodeStream,
  DecodeStream
}
