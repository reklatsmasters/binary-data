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

const { encode } = require('lib/encode')
const { decode } = require('lib/decode')
const { encodingLength } = require('lib/encoding-length')
const Transaction = require('lib/transaction')
const NotEnoughDataError = require('lib/not-enough-data-error')

const types = {
  array,
  bool,
  buffer,
  reserved,
  string,
  when,
  select,
}

for (const type of Object.keys(numbers)) {
  types[type] = numbers[type]
}

/**
 * Creates transform stream for encode objects
 * into buffer.
 * @param {object} [schema]
 * @returns {EncodeStream}
 */
function createEncodeStream(schema) {
  return new EncodeStream({
    schema,
    transform: transformEncode,
  })
}

/**
 * Creates transform stream for decode binary data.
 * @param {Buffer|Object} [bufOrSchema]
 * @returns {DecodeStream}
 */
function createDecodeStream(bufOrSchema) {
  let schema = null
  const isBuffer = Buffer.isBuffer(bufOrSchema)

  if (!isBuffer) {
    schema = bufOrSchema
  }

  const stream = new DecodeStream({
    schema,
    transform: transformDecode,
  })

  if (isBuffer) {
    stream.append(bufOrSchema)
  }

  return stream
}

function transformEncode(chunk, encoding, cb) {
  /* eslint-disable no-invalid-this */
  try {
    encode(chunk, this, this._schema)

    const buf = this.slice()
    this.consume(buf.length)

    cb(null, buf)
  } catch (err) {
    cb(err)
  }
  /* eslint-enable no-invalid-this */
}

function transformDecode(chunk, encoding, cb) {
  /* eslint-disable no-invalid-this */
  this.append(chunk)

  try {
    while (this.length > 0) {
      const transaction = new Transaction(this)
      const data = decode(transaction, this._schema)

      transaction.commit()
      this.push(data)
    }

    cb()
  } catch (err) {
    if (err instanceof NotEnoughDataError) {
      cb()
    } else {
      cb(err)
    }
  }
  /* eslint-enable no-invalid-this */
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
  DecodeStream,
}
