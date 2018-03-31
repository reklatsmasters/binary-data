/* eslint-disable max-lines */
const types = require('types/numbers')

describe('doublebe', () => {
  const numberType = types.doublebe

  test('write', () => {
    const value = 1
    const writeDoubleBE = jest.fn()

    numberType.encode(value, { writeDoubleBE })

    expect(writeDoubleBE).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(8)
  })

  test('read', () => {
    const value = 1
    const readDoubleBE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readDoubleBE }, meta)).toEqual(value)
    expect(readDoubleBE).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(8)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(8)
  })
})

describe('doublele', () => {
  const numberType = types.doublele

  test('write', () => {
    const value = 1
    const writeDoubleLE = jest.fn()

    numberType.encode(value, { writeDoubleLE })

    expect(writeDoubleLE).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(8)
  })

  test('read', () => {
    const value = 1
    const readDoubleLE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readDoubleLE }, meta)).toEqual(value)
    expect(readDoubleLE).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(8)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(8)
  })
})

describe('floatbe', () => {
  const numberType = types.floatbe

  test('write', () => {
    const value = 1
    const writeFloatBE = jest.fn()

    numberType.encode(value, { writeFloatBE })

    expect(writeFloatBE).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(4)
  })

  test('read', () => {
    const value = 1
    const readFloatBE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readFloatBE }, meta)).toEqual(value)
    expect(readFloatBE).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(4)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(4)
  })
})

describe('floatle', () => {
  const numberType = types.floatle

  test('write', () => {
    const value = 1
    const writeFloatLE = jest.fn()

    numberType.encode(value, { writeFloatLE })

    expect(writeFloatLE).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(4)
  })

  test('read', () => {
    const value = 1
    const readFloatLE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readFloatLE }, meta)).toEqual(value)
    expect(readFloatLE).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(4)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(4)
  })
})

describe('int8', () => {
  const numberType = types.int8

  test('write', () => {
    const value = 1
    const writeInt8 = jest.fn()

    numberType.encode(value, { writeInt8 })

    expect(writeInt8).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(1)
  })

  test('read', () => {
    const value = 1
    const readInt8 = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readInt8 }, meta)).toEqual(value)
    expect(readInt8).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(1)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(1)
  })
})

describe('uint8', () => {
  const numberType = types.uint8

  test('write', () => {
    const value = 1
    const writeUInt8 = jest.fn()

    numberType.encode(value, { writeUInt8 })

    expect(writeUInt8).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(1)
  })

  test('read', () => {
    const value = 1
    const readUInt8 = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readUInt8 }, meta)).toEqual(value)
    expect(readUInt8).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(1)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(1)
  })
})

describe('int16be', () => {
  const numberType = types.int16be

  test('write', () => {
    const value = 1
    const writeInt16BE = jest.fn()

    numberType.encode(value, { writeInt16BE })

    expect(writeInt16BE).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(2)
  })

  test('read', () => {
    const value = 1
    const readInt16BE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readInt16BE }, meta)).toEqual(value)
    expect(readInt16BE).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(2)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(2)
  })
})

describe('uint16be', () => {
  const numberType = types.uint16be

  test('write', () => {
    const value = 1
    const writeUInt16BE = jest.fn()

    numberType.encode(value, { writeUInt16BE })

    expect(writeUInt16BE).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(2)
  })

  test('read', () => {
    const value = 1
    const readUInt16BE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readUInt16BE }, meta)).toEqual(value)
    expect(readUInt16BE).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(2)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(2)
  })
})

describe('int16le', () => {
  const numberType = types.int16le

  test('write', () => {
    const value = 1
    const writeInt16LE = jest.fn()

    numberType.encode(value, { writeInt16LE })

    expect(writeInt16LE).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(2)
  })

  test('read', () => {
    const value = 1
    const readInt16LE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readInt16LE }, meta)).toEqual(value)
    expect(readInt16LE).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(2)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(2)
  })
})

describe('uint16le', () => {
  const numberType = types.uint16le

  test('write', () => {
    const value = 1
    const writeUInt16LE = jest.fn()

    numberType.encode(value, { writeUInt16LE })

    expect(writeUInt16LE).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(2)
  })

  test('read', () => {
    const value = 1
    const readUInt16LE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readUInt16LE }, meta)).toEqual(value)
    expect(readUInt16LE).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(2)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(2)
  })
})

describe('int32be', () => {
  const numberType = types.int32be

  test('write', () => {
    const value = 1
    const writeInt32BE = jest.fn()

    numberType.encode(value, { writeInt32BE })

    expect(writeInt32BE).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(4)
  })

  test('read', () => {
    const value = 1
    const readInt32BE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readInt32BE }, meta)).toEqual(value)
    expect(readInt32BE).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(4)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(4)
  })
})

describe('uint32be', () => {
  const numberType = types.uint32be

  test('write', () => {
    const value = 1
    const writeUInt32BE = jest.fn()

    numberType.encode(value, { writeUInt32BE })

    expect(writeUInt32BE).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(4)
  })

  test('read', () => {
    const value = 1
    const readUInt32BE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readUInt32BE }, meta)).toEqual(value)
    expect(readUInt32BE).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(4)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(4)
  })
})

describe('int32le', () => {
  const numberType = types.int32le

  test('write', () => {
    const value = 1
    const writeInt32LE = jest.fn()

    numberType.encode(value, { writeInt32LE })

    expect(writeInt32LE).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(4)
  })

  test('read', () => {
    const value = 1
    const readInt32LE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readInt32LE }, meta)).toEqual(value)
    expect(readInt32LE).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(4)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(4)
  })
})

describe('uint32le', () => {
  const numberType = types.uint32le

  test('write', () => {
    const value = 1
    const writeUInt32LE = jest.fn()

    numberType.encode(value, { writeUInt32LE })

    expect(writeUInt32LE).toHaveBeenCalledTimes(1)
    expect(numberType.encode.bytes).toEqual(4)
  })

  test('read', () => {
    const value = 1
    const readUInt32LE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readUInt32LE }, meta)).toEqual(value)
    expect(readUInt32LE).toHaveBeenCalledTimes(1)
    expect(meta.bytes).toEqual(4)
  })

  test('size', () => {
    expect(types.uint32le.encodingLength()).toEqual(4)
  })
})

describe('int24be', () => {
  const numberType = types.int24be
  const size = 3

  test('write', () => {
    const value = 1
    const writeIntBE = jest.fn()

    numberType.encode(value, { writeIntBE })

    expect(writeIntBE).toHaveBeenCalledTimes(1)
    expect(writeIntBE).toBeCalledWith(value, size)
    expect(numberType.encode.bytes).toEqual(size)
  })

  test('read', () => {
    const value = 1
    const readIntBE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readIntBE }, meta)).toEqual(value)
    expect(readIntBE).toHaveBeenCalledTimes(1)
    expect(readIntBE).toBeCalledWith(size)
    expect(meta.bytes).toEqual(size)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(size)
  })
})

describe('uint24be', () => {
  const numberType = types.uint24be
  const size = 3

  test('write', () => {
    const value = 1
    const writeUIntBE = jest.fn()

    numberType.encode(value, { writeUIntBE })

    expect(writeUIntBE).toHaveBeenCalledTimes(1)
    expect(writeUIntBE).toBeCalledWith(value, size)
    expect(numberType.encode.bytes).toEqual(size)
  })

  test('read', () => {
    const value = 1
    const readUIntBE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readUIntBE }, meta)).toEqual(value)
    expect(readUIntBE).toHaveBeenCalledTimes(1)
    expect(readUIntBE).toBeCalledWith(size)
    expect(meta.bytes).toEqual(size)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(size)
  })
})

describe('int24le', () => {
  const numberType = types.int24le
  const size = 3

  test('write', () => {
    const value = 1
    const writeIntLE = jest.fn()

    numberType.encode(value, { writeIntLE })

    expect(writeIntLE).toHaveBeenCalledTimes(1)
    expect(writeIntLE).toBeCalledWith(value, size)
    expect(numberType.encode.bytes).toEqual(size)
  })

  test('read', () => {
    const value = 1
    const readIntLE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readIntLE }, meta)).toEqual(value)
    expect(readIntLE).toHaveBeenCalledTimes(1)
    expect(readIntLE).toBeCalledWith(size)
    expect(meta.bytes).toEqual(size)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(size)
  })
})

describe('uint24le', () => {
  const numberType = types.uint24le
  const size = 3

  test('write', () => {
    const value = 1
    const writeUIntLE = jest.fn()

    numberType.encode(value, { writeUIntLE })

    expect(writeUIntLE).toHaveBeenCalledTimes(1)
    expect(writeUIntLE).toBeCalledWith(value, size)
    expect(numberType.encode.bytes).toEqual(size)
  })

  test('read', () => {
    const value = 1
    const readUIntLE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readUIntLE }, meta)).toEqual(value)
    expect(readUIntLE).toHaveBeenCalledTimes(1)
    expect(readUIntLE).toBeCalledWith(size)
    expect(meta.bytes).toEqual(size)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(size)
  })
})

describe('int40be', () => {
  const numberType = types.int40be
  const size = 5

  test('write', () => {
    const value = 1
    const writeIntBE = jest.fn()

    numberType.encode(value, { writeIntBE })

    expect(writeIntBE).toHaveBeenCalledTimes(1)
    expect(writeIntBE).toBeCalledWith(value, size)
    expect(numberType.encode.bytes).toEqual(size)
  })

  test('read', () => {
    const value = 1
    const readIntBE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readIntBE }, meta)).toEqual(value)
    expect(readIntBE).toHaveBeenCalledTimes(1)
    expect(readIntBE).toBeCalledWith(size)
    expect(meta.bytes).toEqual(size)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(size)
  })
})

describe('uint40be', () => {
  const numberType = types.uint40be
  const size = 5

  test('write', () => {
    const value = 1
    const writeUIntBE = jest.fn()

    numberType.encode(value, { writeUIntBE })

    expect(writeUIntBE).toHaveBeenCalledTimes(1)
    expect(writeUIntBE).toBeCalledWith(value, size)
    expect(numberType.encode.bytes).toEqual(size)
  })

  test('read', () => {
    const value = 1
    const readUIntBE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readUIntBE }, meta)).toEqual(value)
    expect(readUIntBE).toHaveBeenCalledTimes(1)
    expect(readUIntBE).toBeCalledWith(size)
    expect(meta.bytes).toEqual(size)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(size)
  })
})

describe('int40le', () => {
  const numberType = types.int40le
  const size = 5

  test('write', () => {
    const value = 1
    const writeIntLE = jest.fn()

    numberType.encode(value, { writeIntLE })

    expect(writeIntLE).toHaveBeenCalledTimes(1)
    expect(writeIntLE).toBeCalledWith(value, size)
    expect(numberType.encode.bytes).toEqual(size)
  })

  test('read', () => {
    const value = 1
    const readIntLE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readIntLE }, meta)).toEqual(value)
    expect(readIntLE).toHaveBeenCalledTimes(1)
    expect(readIntLE).toBeCalledWith(size)
    expect(meta.bytes).toEqual(size)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(size)
  })
})

describe('uint40le', () => {
  const numberType = types.uint40le
  const size = 5

  test('write', () => {
    const value = 1
    const writeUIntLE = jest.fn()

    numberType.encode(value, { writeUIntLE })

    expect(writeUIntLE).toHaveBeenCalledTimes(1)
    expect(writeUIntLE).toBeCalledWith(value, size)
    expect(numberType.encode.bytes).toEqual(size)
  })

  test('read', () => {
    const value = 1
    const readUIntLE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readUIntLE }, meta)).toEqual(value)
    expect(readUIntLE).toHaveBeenCalledTimes(1)
    expect(readUIntLE).toBeCalledWith(size)
    expect(meta.bytes).toEqual(size)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(size)
  })
})

describe('int48be', () => {
  const numberType = types.int48be
  const size = 6

  test('write', () => {
    const value = 1
    const writeIntBE = jest.fn()

    numberType.encode(value, { writeIntBE })

    expect(writeIntBE).toHaveBeenCalledTimes(1)
    expect(writeIntBE).toBeCalledWith(value, size)
    expect(numberType.encode.bytes).toEqual(size)
  })

  test('read', () => {
    const value = 1
    const readIntBE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readIntBE }, meta)).toEqual(value)
    expect(readIntBE).toHaveBeenCalledTimes(1)
    expect(readIntBE).toBeCalledWith(size)
    expect(meta.bytes).toEqual(size)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(size)
  })
})

describe('uint48be', () => {
  const numberType = types.uint48be
  const size = 6

  test('write', () => {
    const value = 1
    const writeUIntBE = jest.fn()

    numberType.encode(value, { writeUIntBE })

    expect(writeUIntBE).toHaveBeenCalledTimes(1)
    expect(writeUIntBE).toBeCalledWith(value, size)
    expect(numberType.encode.bytes).toEqual(size)
  })

  test('read', () => {
    const value = 1
    const readUIntBE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readUIntBE }, meta)).toEqual(value)
    expect(readUIntBE).toHaveBeenCalledTimes(1)
    expect(readUIntBE).toBeCalledWith(size)
    expect(meta.bytes).toEqual(size)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(size)
  })
})

describe('int48le', () => {
  const numberType = types.int48le
  const size = 6

  test('write', () => {
    const value = 1
    const writeIntLE = jest.fn()

    numberType.encode(value, { writeIntLE })

    expect(writeIntLE).toHaveBeenCalledTimes(1)
    expect(writeIntLE).toBeCalledWith(value, size)
    expect(numberType.encode.bytes).toEqual(size)
  })

  test('read', () => {
    const value = 1
    const readIntLE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readIntLE }, meta)).toEqual(value)
    expect(readIntLE).toHaveBeenCalledTimes(1)
    expect(readIntLE).toBeCalledWith(size)
    expect(meta.bytes).toEqual(size)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(size)
  })
})

describe('uint48le', () => {
  const numberType = types.uint48le
  const size = 6

  test('write', () => {
    const value = 1
    const writeUIntLE = jest.fn()

    numberType.encode(value, { writeUIntLE })

    expect(writeUIntLE).toHaveBeenCalledTimes(1)
    expect(writeUIntLE).toBeCalledWith(value, size)
    expect(numberType.encode.bytes).toEqual(size)
  })

  test('read', () => {
    const value = 1
    const readUIntLE = jest.fn().mockImplementation(() => value)

    const meta = {
      bytes: 0,
    }

    expect(numberType.decode({ readUIntLE }, meta)).toEqual(value)
    expect(readUIntLE).toHaveBeenCalledTimes(1)
    expect(readUIntLE).toBeCalledWith(size)
    expect(meta.bytes).toEqual(size)
  })

  test('size', () => {
    expect(numberType.encodingLength()).toEqual(size)
  })
})
