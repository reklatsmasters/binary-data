
const pSize = Symbol('size')

class AbstractBinaryDataNumber {
  constructor(size) {
    this[pSize] = size
  }

  encode() {
    this.encode.bytes = this[pSize]
  }

  decode() {
    this.decode.bytes = this[pSize]
  }

  encodingLength() {
    return this[pSize]
  }
}

class BinaryDataDoubleBE extends AbstractBinaryDataNumber {
  constructor() {
    super(8)
  }

  encode(value, wstream) {
    wstream.writeDoubleBE(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readDoubleBE()
    super.decode()

    return value
  }
}

class BinaryDataDoubleLE extends AbstractBinaryDataNumber {
  constructor() {
    super(8)
  }

  encode(value, wstream) {
    wstream.writeDoubleLE(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readDoubleLE()
    super.decode()

    return value
  }
}

class BinaryDataFloatBE extends AbstractBinaryDataNumber {
  constructor() {
    super(4)
  }

  encode(value, wstream) {
    wstream.writeFloatBE(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readFloatBE()
    super.decode()

    return value
  }
}

class BinaryDataFloatLE extends AbstractBinaryDataNumber {
  constructor() {
    super(4)
  }

  encode(value, wstream) {
    wstream.writeFloatLE(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readFloatLE()
    super.decode()

    return value
  }
}

class BinaryDataInt8 extends AbstractBinaryDataNumber {
  constructor() {
    super(1)
  }

  encode(value, wstream) {
    wstream.writeInt8(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readInt8()
    super.decode()

    return value
  }
}

class BinaryDataUInt8 extends AbstractBinaryDataNumber {
  constructor() {
    super(1)
  }

  encode(value, wstream) {
    wstream.writeUInt8(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readUInt8()
    super.decode()

    return value
  }
}

class BinaryDataInt16BE extends AbstractBinaryDataNumber {
  constructor() {
    super(2)
  }

  encode(value, wstream) {
    wstream.writeInt16BE(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readInt16BE()
    super.decode()

    return value
  }
}

class BinaryDataInt16LE extends AbstractBinaryDataNumber {
  constructor() {
    super(2)
  }

  encode(value, wstream) {
    wstream.writeInt16LE(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readInt16LE()
    super.decode()

    return value
  }
}

class BinaryDataUInt16BE extends AbstractBinaryDataNumber {
  constructor() {
    super(2)
  }

  encode(value, wstream) {
    wstream.writeUInt16BE(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readUInt16BE()
    super.decode()

    return value
  }
}

class BinaryDataUInt16LE extends AbstractBinaryDataNumber {
  constructor() {
    super(2)
  }

  encode(value, wstream) {
    wstream.writeUInt16LE(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readUInt16LE()
    super.decode()

    return value
  }
}

class BinaryDataInt32BE extends AbstractBinaryDataNumber {
  constructor() {
    super(4)
  }

  encode(value, wstream) {
    wstream.writeInt32BE(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readInt32BE()
    super.decode()

    return value
  }
}

class BinaryDataInt32LE extends AbstractBinaryDataNumber {
  constructor() {
    super(4)
  }

  encode(value, wstream) {
    wstream.writeInt32LE(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readInt32LE()
    super.decode()

    return value
  }
}

class BinaryDataUInt32BE extends AbstractBinaryDataNumber {
  constructor() {
    super(4)
  }

  encode(value, wstream) {
    wstream.writeUInt32BE(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readUInt32BE()
    super.decode()

    return value
  }
}

class BinaryDataUInt32LE extends AbstractBinaryDataNumber {
  constructor() {
    super(4)
  }

  encode(value, wstream) {
    wstream.writeUInt32LE(value)
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readUInt32LE()
    super.decode()

    return value
  }
}

class BinaryDataIntBE extends AbstractBinaryDataNumber {
  encode(value, wstream) {
    wstream.writeIntBE(value, this[pSize])
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readIntBE(this[pSize])
    super.decode()

    return value
  }
}

class BinaryDataUIntBE extends AbstractBinaryDataNumber {
  encode(value, wstream) {
    wstream.writeUIntBE(value, this[pSize])
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readUIntBE(this[pSize])
    super.decode()

    return value
  }
}

class BinaryDataIntLE extends AbstractBinaryDataNumber {
  encode(value, wstream) {
    wstream.writeIntLE(value, this[pSize])
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readIntLE(this[pSize])
    super.decode()

    return value
  }
}

class BinaryDataUIntLE extends AbstractBinaryDataNumber {
  encode(value, wstream) {
    wstream.writeUIntLE(value, this[pSize])
    super.encode()
  }

  decode(rstream) {
    const value = rstream.readUIntLE(this[pSize])
    super.decode()

    return value
  }
}

/** General types */

exports.doublebe = new BinaryDataDoubleBE()
exports.doublele = new BinaryDataDoubleLE()
exports.floatbe = new BinaryDataFloatBE()
exports.floatle = new BinaryDataFloatLE()
exports.int8 = new BinaryDataInt8()
exports.uint8 = new BinaryDataUInt8()
exports.int16be = new BinaryDataInt16BE()
exports.uint16be = new BinaryDataUInt16BE()
exports.int16le = new BinaryDataInt16LE()
exports.uint16le = new BinaryDataUInt16LE()
exports.int32be = new BinaryDataInt32BE()
exports.uint32be = new BinaryDataUInt32BE()
exports.int32le = new BinaryDataInt32LE()
exports.uint32le = new BinaryDataUInt32LE()

/** Secondary types */

exports.int24be = new BinaryDataIntBE(3)
exports.uint24be = new BinaryDataUIntBE(3)
exports.int24le = new BinaryDataIntLE(3)
exports.uint24le = new BinaryDataUIntLE(3)

exports.int40be = new BinaryDataIntBE(5)
exports.uint40be = new BinaryDataUIntBE(5)
exports.int40le = new BinaryDataIntLE(5)
exports.uint40le = new BinaryDataUIntLE(5)

exports.int48be = new BinaryDataIntBE(6)
exports.uint48be = new BinaryDataUIntBE(6)
exports.int48le = new BinaryDataIntLE(6)
exports.uint48le = new BinaryDataUIntLE(6)
