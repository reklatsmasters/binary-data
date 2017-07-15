const BufferList = require('bl')

class EncodeStream extends BufferList {
  writeBuffer(chunk) {
    this.append(chunk)
  }

  writeDoubleBE(value) {
    this.writeBuffer(writeNumber('writeDoubleBE', value, 8))
  }

  writeDoubleLE(value) {
    this.writeBuffer(writeNumber('writeDoubleLE', value, 8))
  }

  writeFloatBE(value) {
    this.writeBuffer(writeNumber('writeFloatBE', value, 4))
  }

  writeFloatLE(value) {
    this.writeBuffer(writeNumber('writeFloatLE', value, 4))
  }

  writeInt8(value) {
    this.writeBuffer(writeNumber('writeInt8', value, 1))
  }

  writeInt16BE(value) {
    this.writeBuffer(writeNumber('writeInt16BE', value, 2))
  }

  writeInt16LE(value) {
    this.writeBuffer(writeNumber('writeInt16LE', value, 2))
  }

  writeInt32BE(value) {
    this.writeBuffer(writeNumber('writeInt32BE', value, 4))
  }

  writeInt32LE(value) {
    this.writeBuffer(writeNumber('writeInt32LE', value, 4))
  }

  writeUInt8(value) {
    this.writeBuffer(writeNumber('writeUInt8', value, 1))
  }

  writeUInt16BE(value) {
    this.writeBuffer(writeNumber('writeUInt16BE', value, 2))
  }

  writeUInt16LE(value) {
    this.writeBuffer(writeNumber('writeUInt16LE', value, 2))
  }

  writeUInt32BE(value) {
    this.writeBuffer(writeNumber('writeUInt32BE', value, 4))
  }

  writeUInt32LE(value) {
    this.writeBuffer(writeNumber('writeUInt32LE', value, 4))
  }

  writeIntBE(value, size) {
    this.writeBuffer(writeNumber('writeIntBE', value, size))
  }

  writeIntLE(value, size) {
    this.writeBuffer(writeNumber('writeIntLE', value, size))
  }

  writeUIntBE(value, size) {
    this.writeBuffer(writeNumber('writeUIntBE', value, size))
  }

  writeUIntLE(value, size) {
    this.writeBuffer(writeNumber('writeUIntLE', value, size))
  }
}

function writeNumber(method, value, size) {
  const buf = Buffer.allocUnsafe(size)
  buf[method](value, 0)

  return buf
}

module.exports = EncodeStream
