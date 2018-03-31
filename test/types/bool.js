const bool = require('types/bool')

describe('bool', () => {
  test('encode positive', () => {
    const wstream = {}
    const itemBytes = 5

    const itemType = {
      decode() {},
      encode: jest.fn().mockImplementation(() => {
        itemType.encode.bytes = itemBytes
      }),
    }

    const type = bool(itemType)
    type.encode(true, wstream)

    expect(itemType.encode).toHaveBeenCalledTimes(1)
    expect(itemType.encode).toBeCalledWith(1, wstream)
    expect(type.encode.bytes).toBe(itemBytes)
  })

  test('encode negative', () => {
    const wstream = {}
    const itemBytes = 5

    const itemType = {
      decode() {},
      encode: jest.fn().mockImplementation(() => {
        itemType.encode.bytes = itemBytes
      }),
    }

    const type = bool(itemType)
    type.encode(false, wstream)

    expect(itemType.encode).toHaveBeenCalledTimes(1)
    expect(itemType.encode).toBeCalledWith(0, wstream)
    expect(type.encode.bytes).toBe(itemBytes)
  })

  test('decode positive', () => {
    const rstream = {}
    const itemBytes = 10

    const itemType = {
      decode(rstream, meta) {
        meta.bytes += itemBytes
        return 1
      },
      encode() {},
    }

    const meta = {
      bytes: 0,
    }

    const type = bool(itemType)
    const result = type.decode(rstream, meta)

    expect(result).toBe(true)
    expect(meta.bytes).toBe(itemBytes)
  })

  test('decode negative', () => {
    const rstream = {}
    const itemBytes = 10

    const itemType = {
      decode(rstream, meta) {
        meta.bytes += itemBytes
        return 0
      },
      encode() {},
    }

    const meta = {
      bytes: 0,
    }

    const type = bool(itemType)
    const result = type.decode(rstream, meta)

    expect(result).toBe(false)
    expect(meta.bytes).toBe(itemBytes)
  })

  test('encodingLength', () => {
    const expectedLength = 4
    const value = true

    const itemType = {
      encode() {},
      decode() {},
      encodingLength() {
        return expectedLength
      },
    }

    const type = bool(itemType)
    expect(type.encodingLength(value)).toBe(expectedLength)
  })
})
