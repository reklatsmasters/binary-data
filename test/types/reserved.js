const reserved = require('types/reserved')

describe('reserved', () => {
  describe('argument `size` is number', () => {
    test('encode', () => {
      const size = 2
      const wstream = {}

      const itemType = {
        encode: jest.fn().mockImplementation(() => {
          itemType.encode.bytes = size
        }),
        decode() {},
      }

      const type = reserved(itemType, size)

      type.encode('qqq', wstream)
      expect(itemType.encode).toHaveBeenCalledTimes(size)
      expect(type.encode.bytes).toBe(itemType.encode.bytes * size)
    })

    test('decode', () => {
      const size = 2
      const rstream = {}
      const bytes = 3

      const itemType = {
        decode: jest.fn(),
        encode() {},
      }

      itemType.decode.bytes = bytes

      const type = reserved(itemType, size)

      expect(type.decode(rstream)).toBeUndefined()
      expect(itemType.decode).toHaveBeenCalledTimes(size)
      expect(type.decode.bytes).toEqual(size * bytes)
    })

    test('encodingLength', () => {
      const size = 4
      const value = 1
      const length = 2

      const itemType = {
        decode() {},
        encode() {},
        encodingLength() {
          return length
        },
      }

      const type = reserved(itemType, size)

      expect(type.encodingLength(value)).toBe(size * length)
    })
  })

  describe('argument `size` is function', () => {
    test('decode', () => {
      const bytes = 10
      const size = 2
      const rstream = {}

      const callback = jest.fn().mockImplementation(() => size)

      const itemType = {
        decode: jest.fn(),
        encode() {},
      }

      itemType.decode.bytes = bytes
      const type = reserved(itemType, callback)

      expect(type.decode(rstream)).toBeUndefined()
      expect(callback).toHaveBeenCalledTimes(1)
      expect(type.decode.bytes).toBe(bytes * size)
    })

    test('encode', () => {
      const size = 2
      const bytes = 3
      const wstream = {}
      const callback = jest.fn().mockImplementation(() => size)

      const itemType = {
        encode: jest.fn().mockImplementation(() => {
          itemType.encode.bytes = bytes
        }),
        decode() {},
      }

      const type = reserved(itemType, callback)
      type.encode('qqq', wstream)

      expect(itemType.encode).toHaveBeenCalledTimes(size)
      expect(callback).toHaveBeenCalledTimes(1)
      expect(type.encode.bytes).toBe(itemType.encode.bytes * size)
    })

    test('encodingLength', () => {
      const size = 2
      const value = 1
      const callback = jest.fn().mockImplementation(() => size)
      const length = 2

      const itemType = {
        decode() {},
        encode() {},
        encodingLength() {
          return length
        },
      }

      const type = reserved(itemType, callback)

      expect(type.encodingLength(value)).toBe(size * length)
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })
})
