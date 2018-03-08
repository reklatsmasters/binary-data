const BufferList = require('bl')

const temporary = Buffer.alloc(8 /* maximal size */)

class DecodeStream extends BufferList {
  constructor(buf) {
    super()

    if (Buffer.isBuffer(buf)) {
      this.append(buf)
    }
  }

  readBuffer(size) {
    assertSize(size, this.length)

    const buf = this.slice(0, size)
    this.consume(size)

    return buf
  }

  readDoubleBE() {
    fastread(this, 8)
    return temporary.readDoubleBE(0)
  }

  readDoubleLE() {
    fastread(this, 8)
    return temporary.readDoubleLE(0)
  }

  readFloatBE() {
    fastread(this, 4)
    return temporary.readFloatBE(0)
  }

  readFloatLE() {
    fastread(this, 4)
    return temporary.readFloatLE(0)
  }

  readInt8() {
    fastread(this, 1)
    return temporary.readInt8(0)
  }

  readUInt8() {
    fastread(this, 1)
    return temporary.readUInt8(0)
  }

  readInt16BE() {
    fastread(this, 2)
    return temporary.readInt16BE(0)
  }

  readUInt16BE() {
    fastread(this, 2)
    return temporary.readUInt16BE(0)
  }

  readInt16LE() {
    fastread(this, 2)
    return temporary.readInt16LE(0)
  }

  readUInt16LE() {
    fastread(this, 2)
    return temporary.readUInt16LE(0)
  }

  readInt32BE() {
    fastread(this, 4)
    return temporary.readInt32BE(0)
  }

  readInt32LE() {
    fastread(this, 4)
    return temporary.readInt32LE(0)
  }

  readUInt32BE() {
    fastread(this, 4)
    return temporary.readUInt32BE(0)
  }

  readUInt32LE() {
    fastread(this, 4)
    return temporary.readUInt32LE(0)
  }

  readIntBE(size) {
    fastread(this, size)
    return temporary.readIntBE(0, size)
  }

  readIntLE(size) {
    fastread(this, size)
    return temporary.readIntLE(0, size)
  }

  readUIntBE(size) {
    fastread(this, size)
    return temporary.readUIntBE(0, size)
  }

  readUIntLE(size) {
    fastread(this, size)
    return temporary.readUIntLE(0, size)
  }
}

module.exports = DecodeStream

function assertSize(size, length) {
  if (size > length) {
    throw new Error(
      `Not enough data: requested ${size} bytes but only ${length} available.`
    )
  }
}

function fastread(that, size) {
  assertSize(size, that.length)
  that.copy(temporary, 0, 0, size)
  that.consume(size)
}
