const BufferList = require('bl')

const writeDoubleBE = createWriteFunction('writeDoubleBE')
const writeDoubleLE = createWriteFunction('writeDoubleLE')
const writeFloatBE = createWriteFunction('writeFloatBE')
const writeFloatLE = createWriteFunction('writeFloatLE')
const writeInt8 = createWriteFunction('writeInt8')
const writeInt16BE = createWriteFunction('writeInt16BE')
const writeInt16LE = createWriteFunction('writeInt16LE')
const writeInt32BE = createWriteFunction('writeInt32BE')
const writeInt32LE = createWriteFunction('writeInt32LE')
const writeUInt8 = createWriteFunction('writeUInt8')
const writeUInt16BE = createWriteFunction('writeUInt16BE')
const writeUInt16LE = createWriteFunction('writeUInt16LE')
const writeUInt32BE = createWriteFunction('writeUInt32BE')
const writeUInt32LE = createWriteFunction('writeUInt32LE')
const writeIntBE = createWriteFunctionGeneral('writeIntBE')
const writeIntLE = createWriteFunctionGeneral('writeIntLE')
const writeUIntBE = createWriteFunctionGeneral('writeUIntBE')
const writeUIntLE = createWriteFunctionGeneral('writeUIntLE')

class EncodeStream extends BufferList {
  writeBuffer(chunk) {
    this.append(chunk)
  }

  writeDoubleBE(value) {
    this.writeBuffer(writeDoubleBE(value, 8))
  }

  writeDoubleLE(value) {
    this.writeBuffer(writeDoubleLE(value, 8))
  }

  writeFloatBE(value) {
    this.writeBuffer(writeFloatBE(value, 4))
  }

  writeFloatLE(value) {
    this.writeBuffer(writeFloatLE(value, 4))
  }

  writeInt8(value) {
    this.writeBuffer(writeInt8(value, 1))
  }

  writeInt16BE(value) {
    this.writeBuffer(writeInt16BE(value, 2))
  }

  writeInt16LE(value) {
    this.writeBuffer(writeInt16LE(value, 2))
  }

  writeInt32BE(value) {
    this.writeBuffer(writeInt32BE(value, 4))
  }

  writeInt32LE(value) {
    this.writeBuffer(writeInt32LE(value, 4))
  }

  writeUInt8(value) {
    this.writeBuffer(writeUInt8(value, 1))
  }

  writeUInt16BE(value) {
    this.writeBuffer(writeUInt16BE(value, 2))
  }

  writeUInt16LE(value) {
    this.writeBuffer(writeUInt16LE(value, 2))
  }

  writeUInt32BE(value) {
    this.writeBuffer(writeUInt32BE(value, 4))
  }

  writeUInt32LE(value) {
    this.writeBuffer(writeUInt32LE(value, 4))
  }

  writeIntBE(value, size) {
    this.writeBuffer(writeIntBE(value, size))
  }

  writeIntLE(value, size) {
    this.writeBuffer(writeIntLE(value, size))
  }

  writeUIntBE(value, size) {
    this.writeBuffer(writeUIntBE(value, size))
  }

  writeUIntLE(value, size) {
    this.writeBuffer(writeUIntLE(value, size))
  }
}

function createWriteFunction(method) {
  const body = `const buf = Buffer.allocUnsafe(size); buf.${method}(value, 0); return buf;`
  return generateFunction(method, body)
}

function createWriteFunctionGeneral(method) {
  const body = `const buf = Buffer.allocUnsafe(size); buf.${method}(value, 0, size); return buf;`
  return generateFunction(method, body)
}

function generateFunction(name, body) {
  // eslint-disable-next-line no-useless-call
  return Function.call(null, `return (function ${name}(value, size) { ${body} })`).call(null)
}

module.exports = EncodeStream
