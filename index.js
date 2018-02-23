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

/**
 * Creates duplex stream for encode objects
 * into binary data.
 * @returns {EncodeStream}
 */
function createEncodeStream() {
  return new EncodeStream()
}

/**
 * Creates duplex stream for decode binary data.
 * @param {Buffer} [buf]
 * @returns {DecodeStream}
 */
function createDecodeStream(buf) {
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
