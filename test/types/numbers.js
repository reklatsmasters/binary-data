const sinon = require('sinon')
const types = require('types/numbers')

describe('doublebe', () => {
  it('write', () => {
    const num = 8800555.3535
    const writeDoubleBE = sinon.stub()

    writeDoubleBE.withArgs(num).returns(1)
    writeDoubleBE.throws('writeDoubleBE')

    types.doublebe.encode(num, { writeDoubleBE })
    expect(writeDoubleBE.callCount).toEqual(1)
    expect(types.doublebe.encode.bytes).toEqual(8)
  })

  it('read', () => {
    const num = 8800555.3535
    const readDoubleBE = sinon.stub()
    readDoubleBE.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.doublebe.decode({ readDoubleBE }, meta)
    expect(readDoubleBE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(8)
  })

  it('size', () => {
    expect(types.doublebe.encodingLength()).toEqual(8)
  })
})

describe('doublele', () => {
  it('write', () => {
    const num = 8800555.3535
    const writeDoubleLE = sinon.stub()

    writeDoubleLE.withArgs(num).returns(1)
    writeDoubleLE.throws('writeDoubleLE')

    types.doublele.encode(num, { writeDoubleLE })
    expect(writeDoubleLE.callCount).toEqual(1)
    expect(types.doublele.encode.bytes).toEqual(8)
  })

  it('read', () => {
    const num = 8800555.3535
    const readDoubleLE = sinon.stub()
    readDoubleLE.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.doublele.decode({ readDoubleLE }, meta)
    expect(readDoubleLE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(8)
  })

  it('size', () => {
    expect(types.doublele.encodingLength()).toEqual(8)
  })
})

describe('floatbe', () => {
  it('write', () => {
    const num = 880.35
    const writeFloatBE = sinon.stub()

    writeFloatBE.withArgs(num).returns(1)
    writeFloatBE.throws('writeDoubleBE')

    types.floatbe.encode(num, { writeFloatBE })
    expect(writeFloatBE.callCount).toEqual(1)
    expect(types.floatbe.encode.bytes).toEqual(4)
  })

  it('read', () => {
    const num = 880.35
    const readFloatBE = sinon.stub()
    readFloatBE.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.floatbe.decode({ readFloatBE }, meta)
    expect(readFloatBE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(4)
  })

  it('size', () => {
    expect(types.floatbe.encodingLength()).toEqual(4)
  })
})

describe('floatle', () => {
  it('write', () => {
    const num = 880.35
    const writeFloatLE = sinon.stub()

    writeFloatLE.withArgs(num).returns(1)
    writeFloatLE.throws('writeDoubleBE')

    types.floatle.encode(num, { writeFloatLE })
    expect(writeFloatLE.callCount).toEqual(1)
    expect(types.floatle.encode.bytes).toEqual(4)
  })

  it('read', () => {
    const num = 880.35
    const readFloatLE = sinon.stub()
    readFloatLE.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.floatle.decode({ readFloatLE }, meta)
    expect(readFloatLE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(4)
  })

  it('size', () => {
    expect(types.floatle.encodingLength()).toEqual(4)
  })
})

describe('int8', () => {
  it('write', () => {
    const num = 1
    const writeInt8 = sinon.stub()

    writeInt8.withArgs(num).returns(1)
    writeInt8.throws('writeDoubleBE')

    types.int8.encode(num, { writeInt8 })
    expect(writeInt8.callCount).toEqual(1)
    expect(types.int8.encode.bytes).toEqual(1)
  })

  it('read', () => {
    const num = 1
    const readInt8 = sinon.stub()
    readInt8.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.int8.decode({ readInt8 }, meta)
    expect(readInt8.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(1)
  })

  it('size', () => {
    expect(types.int8.encodingLength()).toEqual(1)
  })
})

describe('uint8', () => {
  it('write', () => {
    const num = 1
    const writeUInt8 = sinon.stub()

    writeUInt8.withArgs(num).returns(1)
    writeUInt8.throws('writeDoubleBE')

    types.uint8.encode(num, { writeUInt8 })
    expect(writeUInt8.callCount).toEqual(1)
    expect(types.uint8.encode.bytes).toEqual(1)
  })

  it('read', () => {
    const num = 1
    const readUInt8 = sinon.stub()
    readUInt8.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.uint8.decode({ readUInt8 }, meta)
    expect(readUInt8.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(1)
  })

  it('size', () => {
    expect(types.uint8.encodingLength()).toEqual(1)
  })
})

describe('int16be', () => {
  it('write', () => {
    const num = 1
    const writeInt16BE = sinon.stub()

    writeInt16BE.withArgs(num).returns(1)
    writeInt16BE.throws('writeDoubleBE')

    types.int16be.encode(num, { writeInt16BE })
    expect(writeInt16BE.callCount).toEqual(1)
    expect(types.int16be.encode.bytes).toEqual(2)
  })

  it('read', () => {
    const num = 1
    const readInt16BE = sinon.stub()
    readInt16BE.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.int16be.decode({ readInt16BE }, meta)
    expect(readInt16BE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(2)
  })

  it('size', () => {
    expect(types.int16be.encodingLength()).toEqual(2)
  })
})

describe('uint16be', () => {
  it('write', () => {
    const num = 1
    const writeUInt16BE = sinon.stub()

    writeUInt16BE.withArgs(num).returns(1)
    writeUInt16BE.throws('writeDoubleBE')

    types.uint16be.encode(num, { writeUInt16BE })
    expect(writeUInt16BE.callCount).toEqual(1)
    expect(types.uint16be.encode.bytes).toEqual(2)
  })

  it('read', () => {
    const num = 1
    const readUInt16BE = sinon.stub()
    readUInt16BE.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.uint16be.decode({ readUInt16BE }, meta)
    expect(readUInt16BE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(2)
  })

  it('size', () => {
    expect(types.uint16be.encodingLength()).toEqual(2)
  })
})

describe('int16le', () => {
  it('write', () => {
    const num = 1
    const writeInt16LE = sinon.stub()

    writeInt16LE.withArgs(num).returns(1)
    writeInt16LE.throws('writeDoubleBE')

    types.int16le.encode(num, { writeInt16LE })
    expect(writeInt16LE.callCount).toEqual(1)
    expect(types.int16le.encode.bytes).toEqual(2)
  })

  it('read', () => {
    const num = 1
    const readInt16LE = sinon.stub()
    readInt16LE.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.int16le.decode({ readInt16LE }, meta)
    expect(readInt16LE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(2)
  })

  it('size', () => {
    expect(types.int16le.encodingLength()).toEqual(2)
  })
})

describe('uint16le', () => {
  it('write', () => {
    const num = 1
    const writeUInt16LE = sinon.stub()

    writeUInt16LE.withArgs(num).returns(1)
    writeUInt16LE.throws('writeDoubleBE')

    types.uint16le.encode(num, { writeUInt16LE })
    expect(writeUInt16LE.callCount).toEqual(1)
    expect(types.uint16le.encode.bytes).toEqual(2)
  })

  it('read', () => {
    const num = 1
    const readUInt16LE = sinon.stub()
    readUInt16LE.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.uint16le.decode({ readUInt16LE }, meta)
    expect(readUInt16LE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(2)
  })

  it('size', () => {
    expect(types.uint16le.encodingLength()).toEqual(2)
  })
})

describe('int32be', () => {
  it('write', () => {
    const num = 1
    const writeInt32BE = sinon.stub()

    writeInt32BE.withArgs(num).returns(1)
    writeInt32BE.throws('writeDoubleBE')

    types.int32be.encode(num, { writeInt32BE })
    expect(writeInt32BE.callCount).toEqual(1)
    expect(types.int32be.encode.bytes).toEqual(4)
  })

  it('read', () => {
    const num = 1
    const readInt32BE = sinon.stub()
    readInt32BE.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.int32be.decode({ readInt32BE }, meta)
    expect(readInt32BE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(4)
  })

  it('size', () => {
    expect(types.int32be.encodingLength()).toEqual(4)
  })
})

describe('uint32be', () => {
  it('write', () => {
    const num = 1
    const writeUInt32BE = sinon.stub()

    writeUInt32BE.withArgs(num).returns(1)
    writeUInt32BE.throws('writeDoubleBE')

    types.uint32be.encode(num, { writeUInt32BE })
    expect(writeUInt32BE.callCount).toEqual(1)
    expect(types.uint32be.encode.bytes).toEqual(4)
  })

  it('read', () => {
    const num = 1
    const readUInt32BE = sinon.stub()
    readUInt32BE.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.uint32be.decode({ readUInt32BE }, meta)
    expect(readUInt32BE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(4)
  })

  it('size', () => {
    expect(types.uint32be.encodingLength()).toEqual(4)
  })
})

describe('int32le', () => {
  it('write', () => {
    const num = 1
    const writeInt32LE = sinon.stub()

    writeInt32LE.withArgs(num).returns(1)
    writeInt32LE.throws('writeDoubleBE')

    types.int32le.encode(num, { writeInt32LE })
    expect(writeInt32LE.callCount).toEqual(1)
    expect(types.int32le.encode.bytes).toEqual(4)
  })

  it('read', () => {
    const num = 1
    const readInt32LE = sinon.stub()
    readInt32LE.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.int32le.decode({ readInt32LE }, meta)
    expect(readInt32LE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(4)
  })

  it('size', () => {
    expect(types.int32le.encodingLength()).toEqual(4)
  })
})

describe('uint32le', () => {
  it('write', () => {
    const num = 1
    const writeUInt32LE = sinon.stub()

    writeUInt32LE.withArgs(num).returns(1)
    writeUInt32LE.throws('writeDoubleBE')

    types.uint32le.encode(num, { writeUInt32LE })
    expect(writeUInt32LE.callCount).toEqual(1)
    expect(types.uint32le.encode.bytes).toEqual(4)
  })

  it('read', () => {
    const num = 1
    const readUInt32LE = sinon.stub()
    readUInt32LE.returns(num)

    const meta = {
      bytes: 0,
    }

    const result = types.uint32le.decode({ readUInt32LE }, meta)
    expect(readUInt32LE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(4)
  })

  it('size', () => {
    expect(types.uint32le.encodingLength()).toEqual(4)
  })
})

describe('int24be', () => {
  const size = 3

  it('write', () => {
    const num = 1
    const writeIntBE = sinon.stub()

    writeIntBE.withArgs(num, size).returns(1)
    writeIntBE.throws('writeIntBE')

    types.int24be.encode(num, { writeIntBE })
    expect(writeIntBE.callCount).toEqual(1)
    expect(types.int24be.encode.bytes).toEqual(size)
  })

  it('read', () => {
    const num = 1
    const readIntBE = sinon.stub()
    readIntBE.withArgs(size).returns(num)
    readIntBE.throws('readIntBE')

    const meta = {
      bytes: 0,
    }

    const result = types.int24be.decode({ readIntBE }, meta)
    expect(readIntBE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(size)
  })

  it('size', () => {
    expect(types.int24be.encodingLength()).toEqual(size)
  })
})

describe('uint24be', () => {
  const size = 3

  it('write', () => {
    const num = 1
    const writeUIntBE = sinon.stub()

    writeUIntBE.withArgs(num, size).returns(1)
    writeUIntBE.throws('writeIntBE')

    types.uint24be.encode(num, { writeUIntBE })
    expect(writeUIntBE.callCount).toEqual(1)
    expect(types.uint24be.encode.bytes).toEqual(size)
  })

  it('read', () => {
    const num = 1
    const readUIntBE = sinon.stub()
    readUIntBE.withArgs(size).returns(num)
    readUIntBE.throws('readIntBE')

    const meta = {
      bytes: 0,
    }

    const result = types.uint24be.decode({ readUIntBE }, meta)
    expect(readUIntBE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(size)
  })

  it('size', () => {
    expect(types.uint24be.encodingLength()).toEqual(size)
  })
})

describe('int24le', () => {
  const size = 3

  it('write', () => {
    const num = 1
    const writeIntLE = sinon.stub()

    writeIntLE.withArgs(num, size).returns(1)
    writeIntLE.throws('writeIntBE')

    types.int24le.encode(num, { writeIntLE })
    expect(writeIntLE.callCount).toEqual(1)
    expect(types.int24le.encode.bytes).toEqual(size)
  })

  it('read', () => {
    const num = 1
    const readIntLE = sinon.stub()
    readIntLE.withArgs(size).returns(num)
    readIntLE.throws('readIntBE')

    const meta = {
      bytes: 0,
    }

    const result = types.int24le.decode({ readIntLE }, meta)
    expect(readIntLE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(size)
  })

  it('size', () => {
    expect(types.int24le.encodingLength()).toEqual(size)
  })
})

describe('uint24le', () => {
  const size = 3

  it('write', () => {
    const num = 1
    const writeUIntLE = sinon.stub()

    writeUIntLE.withArgs(num, size).returns(1)
    writeUIntLE.throws('writeIntBE')

    types.uint24le.encode(num, { writeUIntLE })
    expect(writeUIntLE.callCount).toEqual(1)
    expect(types.uint24le.encode.bytes).toEqual(size)
  })

  it('read', () => {
    const num = 1
    const readUIntLE = sinon.stub()
    readUIntLE.withArgs(size).returns(num)
    readUIntLE.throws('readIntBE')

    const meta = {
      bytes: 0,
    }

    const result = types.uint24le.decode({ readUIntLE }, meta)
    expect(readUIntLE.callCount).toEqual(1)
    expect(result).toEqual(num)
    expect(meta.bytes).toEqual(size)
  })

  it('size', () => {
    expect(types.uint24le.encodingLength()).toEqual(size)
  })
})
