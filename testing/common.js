const sinon = require('sinon')

module.exports = {
  makeType,
  plug,
  reset
}

function makeType() {
  return {
    encode: sinon.stub(),
    decode: sinon.stub(),
    encodingLength: sinon.stub()
  }
}

function plug(type, bytes = 10) {
  type.encode.throws('encode')
  type.encode.bytes = bytes

  type.decode.throws('decode')
  type.decode.bytes = bytes

  type.encodingLength.throws('encodingLength')
}

function reset(type) {
  type.encode.reset()
  type.decode.reset()
  type.encodingLength.reset()
}
