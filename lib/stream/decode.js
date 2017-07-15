const BufferList = require('bl')

class DecodeStream extends BufferList {
  constructor(buf) {
    super()

    if (Buffer.isBuffer(buf)) {
      this.append(buf)
    }
  }

  readBuffer(size) {
    if (size > this.length) {
      throw new Error(
        `Not enough data: requested ${size} bytes but only ${this
          .length} available.`
      )
    }

    const buf = this.slice(0, size)
    this.consume(size)

    return buf
  }

  readDoubleBE() {
    return this.readBuffer(8).readDoubleBE(0)
  }

  readDoubleLE() {
    return this.readBuffer(8).readDoubleLE(0)
  }

  readFloatBE() {
    return this.readBuffer(4).readFloatBE(0)
  }

  readFloatLE() {
    return this.readBuffer(4).readFloatLE(0)
  }

  readInt8() {
    return this.readBuffer(1).readInt8(0)
  }

  readUInt8() {
    return this.readBuffer(1).readUInt8(0)
  }

  readInt16BE() {
    return this.readBuffer(2).readInt16BE(0)
  }

  readUInt16BE() {
    return this.readBuffer(2).readUInt16BE(0)
  }

  readInt16LE() {
    return this.readBuffer(2).readInt16LE(0)
  }

  readUInt16LE() {
    return this.readBuffer(2).readUInt16LE(0)
  }

  readInt32BE() {
    return this.readBuffer(4).readInt32BE(0)
  }

  readInt32LE() {
    return this.readBuffer(4).readInt32LE(0)
  }

  readUInt32BE() {
    return this.readBuffer(4).readUInt32BE(0)
  }

  readUInt32LE() {
    return this.readBuffer(4).readUInt32LE(0)
  }

  readIntBE(size) {
    return this.readBuffer(size).readIntBE(0, size)
  }

  readIntLE(size) {
    return this.readBuffer(size).readIntLE(0, size)
  }

  readUIntBE(size) {
    return this.readBuffer(size).readUIntBE(0, size)
  }

  readUIntLE(size) {
    return this.readBuffer(size).readUIntLE(0, size)
  }
}

module.exports = DecodeStream
