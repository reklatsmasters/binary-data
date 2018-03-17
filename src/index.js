const EncodeStream = require('streams/encode')
const DecodeStream = require('streams/decode')
const array = require('types/array')
const buffer = require('types/buffer')
const bool = require('types/bool')
const reserved = require('types/reserved')
const string = require('types/string')
const numbers = require('types/numbers')
const when = require('types/when')
const select = require('types/select')

const encode = require('lib/encode')
const { decode } = require('lib/decode')
const encodingLength = require('lib/encoding-length')

const types = {
  array,
  bool,
  buffer,
  reserved,
  string,
  when,
  select
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
