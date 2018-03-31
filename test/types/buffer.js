const buffer = require('types/buffer')

describe('buffer', () => {
  describe('argument `length` is number', () => {
    test('encode', () => {
      const writeBuffer = jest.fn()
      const wstream = {
        writeBuffer,
      }

      const length = 2
      const buf = Buffer.allocUnsafe(length)

      const type = buffer(length)

      type.encode(buf, wstream)

      expect(writeBuffer).toHaveBeenCalledTimes(1)
      expect(writeBuffer).toBeCalledWith(buf)
      expect(type.encode.bytes).toBe(length)
    })

    test('should not encode large buffer', () => {
      const length = 2

      const wstream = {}

      const buf = Buffer.allocUnsafe(length + 1)
      const type = buffer(length)

      expect(() => type.encode(buf, wstream)).toThrow(
        `Buffer required length ${length} instead of ${buf.length}`
      )
    })

    test('decode', () => {
      const meta = {
        bytes: 0,
      }

      const length = 2
      const buf = Buffer.allocUnsafe(length)

      const readBuffer = jest.fn().mockImplementation(() => buf)
      const rstream = {
        readBuffer,
      }

      const type = buffer(length)

      expect(type.decode(rstream, meta)).toBe(buf)
      expect(readBuffer).toHaveBeenCalledTimes(1)
      expect(readBuffer).toBeCalledWith(length)
      expect(meta.bytes).toBe(length)
    })

    test('encodingLength', () => {
      const length = 2

      const type = buffer(length)
      expect(type.encodingLength(Buffer.alloc(0))).toBe(length)
    })
  })

  describe('argument `length` is type', () => {
    test('encode', () => {
      const writeBuffer = jest.fn()
      const wstream = {
        writeBuffer,
      }

      const length = 2
      const lengthBytes = 3
      const buf = Buffer.allocUnsafe(length)

      const lengthType = {
        decode() {},
        encode: jest.fn().mockImplementation(() => {
          lengthType.encode.bytes = lengthBytes
        }),
      }

      const type = buffer(lengthType)
      type.encode(buf, wstream)

      expect(lengthType.encode).toHaveBeenCalledTimes(1)
      expect(lengthType.encode).toBeCalledWith(length, wstream)
      expect(writeBuffer).toHaveBeenCalledTimes(1)
      expect(writeBuffer).toBeCalledWith(buf)
      expect(type.encode.bytes).toBe(length + lengthBytes)
    })

    test('decode', () => {
      const length = 2
      const buf = Buffer.allocUnsafe(length)

      const readBuffer = jest.fn().mockImplementation(() => buf)
      const lengthBytes = 5

      const rstream = {
        readBuffer,
      }

      const meta = {
        bytes: 0,
      }

      const lengthType = {
        decode(rstream, meta) {
          meta.bytes += lengthBytes
          return length
        },
        encode() {},
      }

      const type = buffer(lengthType)

      expect(type.decode(rstream, meta)).toBe(buf)
      expect(readBuffer).toHaveBeenCalledTimes(1)
      expect(readBuffer).toBeCalledWith(length)
      expect(meta.bytes).toBe(buf.length + lengthBytes)
    })

    test('encodingLength', () => {
      const length = 5
      const typeLength = 2
      const buf = Buffer.allocUnsafe(length)

      const lengthType = {
        encode() {},
        decode() {},
        encodingLength() {
          return typeLength
        },
      }

      const type = buffer(lengthType)

      expect(type.encodingLength(buf)).toBe(typeLength + length)
    })
  })

  describe('argument `length` is function', () => {
    test('decode', () => {
      const length = 2
      const buf = Buffer.allocUnsafe(length)

      const readBuffer = jest.fn().mockImplementation(() => buf)

      const rstream = {
        readBuffer,
      }

      const meta = {
        bytes: 0,
        context: {},
      }

      const callback = jest.fn().mockImplementation(() => length)
      const type = buffer(callback)

      expect(type.decode(rstream, meta)).toBe(buf)
      expect(readBuffer).toHaveBeenCalledTimes(1)
      expect(readBuffer).toBeCalledWith(length)
      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toBeCalledWith(meta.context)
      expect(meta.bytes).toBe(length)
    })

    test('encode', () => {
      const writeBuffer = jest.fn()

      const wstream = {
        writeBuffer,
      }

      const context = {}

      const length = 2
      const buf = Buffer.allocUnsafe(length)

      const callback = jest.fn().mockImplementation(() => length)
      const type = buffer(callback)

      type.encode(buf, wstream, context)

      expect(writeBuffer).toHaveBeenCalledTimes(1)
      expect(writeBuffer).toBeCalledWith(buf)
      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toBeCalledWith(context)
      expect(type.encode.bytes).toBe(length)
    })

    test('encodingLength', () => {
      const length = 5

      const type = buffer(() => length * 2)
      expect(type.encodingLength(Buffer.alloc(length))).toBe(length)
    })
  })
})
