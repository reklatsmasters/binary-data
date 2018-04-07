const string = require('types/string')

describe('string', () => {
  describe('null string', () => {
    test('encode', () => {
      const str = 'qwerty'
      const wstream = {
        writeBuffer: jest.fn(),
        writeInt8: jest.fn(),
      }

      const type = string(null)

      type.encode(str, wstream)

      expect(type.encode.bytes).toEqual(str.length + 1)
      expect(wstream.writeBuffer).toBeCalledWith(Buffer.from(str, 'ascii'))
      expect(wstream.writeInt8).toBeCalledWith(0)
    })

    test('decode', () => {
      const expectedValue = 'qwerty'
      const expectedLength = expectedValue.length + 1

      const values = [1, 2, 3, 4, 5, 6, 0]
      const rstream = {
        readBuffer: jest
          .fn()
          .mockImplementation(() => Buffer.from(expectedValue + '\0')),
        get: jest.fn().mockImplementation(() => values.shift()),
        length: expectedLength,
      }

      const type = string(null)

      expect(type.decode(rstream)).toEqual(expectedValue)
      expect(type.decode.bytes).toEqual(expectedLength)
      expect(rstream.readBuffer).toBeCalledWith(expectedLength)
    })

    test('encodingLength', () => {
      const value = 'qwerty'
      const type = string(null)

      expect(type.encodingLength(value)).toEqual(value.length + 1)
    })
  })

  describe('fixed length', () => {
    test('encode', () => {
      const length = 3
      const wstream = {
        writeBuffer: jest.fn(),
      }
      const str = 'qwe'

      const type = string(length)
      type.encode(str, wstream)

      expect(type.encode.bytes).toEqual(length)
      expect(wstream.writeBuffer).toBeCalledWith(Buffer.from(str, 'ascii'))
    })

    test('decode', () => {
      const str = 'qwe'
      const length = 3
      const rstream = {
        readBuffer: jest.fn().mockImplementation(() => Buffer.from(str)),
      }
      const type = string(length)

      expect(type.decode(rstream)).toEqual(str)
      expect(type.decode.bytes).toEqual(length)
    })

    test('encodingLength', () => {
      const length = 3
      const value = 'qw'
      const type = string(length)

      expect(type.encodingLength(value)).toEqual(length)
    })
  })

  describe('length is type', () => {
    test('encode', () => {
      const writeBuffer = jest.fn()
      const wstream = {
        writeBuffer,
      }

      const str = 'qwe'
      const length = str.length
      const lengthBytes = 3
      const buf = Buffer.from(str, 'ascii')

      const lengthType = {
        decode() {},
        encode: jest.fn().mockImplementation(() => {
          lengthType.encode.bytes = lengthBytes
        }),
      }

      const type = string(lengthType)
      type.encode(str, wstream)

      expect(lengthType.encode).toHaveBeenCalledTimes(1)
      expect(lengthType.encode).toBeCalledWith(length, wstream)
      expect(writeBuffer).toHaveBeenCalledTimes(1)
      expect(writeBuffer).toBeCalledWith(buf)
      expect(type.encode.bytes).toBe(length + lengthBytes)
    })

    test('decode', () => {
      const str = 'qwe'
      const length = 3
      const lengthBytes = 3
      const rstream = {
        readBuffer: jest.fn().mockImplementation(() => Buffer.from(str)),
      }

      const lengthType = {
        encode() {},
        decode: () => length,
      }

      lengthType.decode.bytes = lengthBytes
      const type = string(lengthType)

      expect(type.decode(rstream)).toEqual(str)
      expect(type.decode.bytes).toEqual(length + lengthBytes)
    })

    test('encodingLength', () => {
      const typeLength = 2
      const str = 'qwe'

      const lengthType = {
        encode() {},
        decode() {},
        encodingLength() {
          return typeLength
        },
      }

      const type = string(lengthType)

      expect(type.encodingLength(str)).toBe(typeLength + str.length)
    })
  })

  describe('length is callback', () => {
    test('encode', () => {
      const writeBuffer = jest.fn()
      const wstream = {
        writeBuffer,
      }

      const str = 'qwe'
      const length = str.length
      const lengthBytes = 3
      const buf = Buffer.from(str, 'ascii')
      const context = {}

      const callback = jest.fn().mockImplementation(() => lengthBytes)

      const type = string(callback)
      type.encode(str, wstream, context)

      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toBeCalledWith(context)
      expect(writeBuffer).toHaveBeenCalledTimes(1)
      expect(writeBuffer).toBeCalledWith(buf)
      expect(type.encode.bytes).toBe(length)
    })

    test('decode', () => {
      const str = 'qwe'
      const buf = Buffer.from(str)
      const length = str.length

      const readBuffer = jest.fn().mockImplementation(() => buf)

      const rstream = {
        readBuffer,
      }

      const callback = jest.fn().mockImplementation(() => length)
      const type = string(callback)

      expect(type.decode(rstream)).toBe(str)
      expect(readBuffer).toHaveBeenCalledTimes(1)
      expect(readBuffer).toBeCalledWith(length)
      expect(callback).toHaveBeenCalledTimes(1)
      expect(type.decode.bytes).toBe(length)
    })

    test('encodingLength', () => {
      const str = 'qwe'
      const length = str.length

      const type = string(() => length * 2)
      expect(type.encodingLength(str)).toBe(length)
    })
  })
})
