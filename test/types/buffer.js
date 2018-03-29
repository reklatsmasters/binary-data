const sinon = require('sinon')
const buffer = require('types/buffer')
const common = require('testing/common')

describe('buffer', () => {
  describe('fixed length', () => {
    test('encode', () => {
      const writeBuffer = sinon.stub()
      const wstream = {
        writeBuffer,
      }

      const length = 2
      const buf = Buffer.allocUnsafe(length)

      writeBuffer.withArgs(buf).returns(1)
      writeBuffer.throws('writeBuffer')

      const type = buffer(length)

      type.encode(buf, wstream)

      expect(writeBuffer.callCount).toBe(1)
      expect(type.encode.bytes).toBe(length)
    })

    test('should throws when encode more data', () => {
      const length = 2

      const wstream = {}

      const buf = Buffer.allocUnsafe(length + 1)
      const type = buffer(length)

      expect(() => type.encode(buf, wstream)).toThrow(
        `Buffer required length ${length} instead of ${buf.length}`
      )
    })

    test('decode', () => {
      const readBuffer = sinon.stub()
      const rstream = {
        readBuffer,
      }

      const meta = {
        bytes: 0,
      }

      const length = 2
      const buf = Buffer.allocUnsafe(length)

      readBuffer.withArgs(length).returns(buf)
      readBuffer.throws('readBuffer')

      const type = buffer(length)
      const result = type.decode(rstream, meta)

      expect(result).toBe(buf)
      expect(readBuffer.callCount).toBe(1)
      expect(meta.bytes).toBe(length)
    })

    test('encodingLength', () => {
      const length = 2

      const type = buffer(length)
      expect(type.encodingLength(Buffer.alloc(0))).toBe(length)
    })
  })

  describe('length prefix', () => {
    test('encode', () => {
      const writeBuffer = sinon.stub()
      const wstream = {
        writeBuffer,
      }

      const lengthType = common.makeType()

      const length = 2
      const buf = Buffer.allocUnsafe(length)

      writeBuffer.withArgs(buf).returns(1)
      writeBuffer.throws('writeBuffer')

      lengthType.encode.withArgs(length).returns(1)
      common.plug(lengthType)

      const type = buffer(lengthType)
      type.encode(buf, wstream)

      expect(lengthType.encode.callCount).toBe(1)
      expect(writeBuffer.callCount).toBe(1)
      expect(lengthType.encode.calledBefore(writeBuffer)).toBeTruthy()
      expect(type.encode.bytes).toBe(length + lengthType.encode.bytes)
    })

    test('decode', () => {
      const readBuffer = sinon.stub()
      const bytes = 5

      const rstream = {
        readBuffer,
      }

      const length = 2
      const buf = Buffer.allocUnsafe(length)

      readBuffer.withArgs(length).returns(buf)
      readBuffer.throws('readBuffer')

      const meta = {
        bytes: 0,
      }

      const lengthType = {
        decode(rstream, meta) {
          meta.bytes += bytes
          return length
        },
        encode() {},
      }

      const type = buffer(lengthType)
      const result = type.decode(rstream, meta)

      expect(result).toBe(buf)
      expect(readBuffer.callCount).toBe(1)
      expect(meta.bytes).toBe(buf.length + bytes)
    })

    test('encodingLength', () => {
      const length = 5
      const typeLength = 2
      const buf = Buffer.allocUnsafe(length)

      const lengthType = common.makeType()
      lengthType.encodingLength.withArgs(length).returns(typeLength)
      common.plug(lengthType)

      const type = buffer(lengthType)

      expect(type.encodingLength(buf)).toBe(typeLength + length)
    })
  })

  describe('length is function', () => {
    test('decode', () => {
      const readBuffer = sinon.stub()
      const rstream = {
        readBuffer,
      }

      const length = 2
      const buf = Buffer.allocUnsafe(length)

      const context = {
        node: {},
      }

      const meta = {
        bytes: 0,
        context,
      }

      readBuffer.withArgs(length).returns(buf)
      readBuffer.throws('readBuffer')

      const callback = sinon.stub()
      callback.withArgs(context).returns(length)
      callback.throws('callback')

      const type = buffer(callback)
      const result = type.decode(rstream, meta)

      expect(result).toBe(buf)
      expect(readBuffer.callCount).toBe(1)
      expect(callback.callCount).toBe(1)
      expect(meta.bytes).toBe(length)
    })

    test('encode', () => {
      const writeBuffer = sinon.stub()

      const wstream = {
        writeBuffer,
      }

      const context = {
        node: {},
      }

      const length = 2
      const buf = Buffer.allocUnsafe(length)

      const callback = sinon.stub()
      callback.withArgs(context).returns(length)
      callback.throws('callback')

      writeBuffer.withArgs(buf).returns(1)
      writeBuffer.throws('writeBuffer')

      const type = buffer(callback)

      type.encode(buf, wstream, context)

      expect(writeBuffer.callCount).toBe(1)
      expect(callback.callCount).toBe(1)
      expect(type.encode.bytes).toBe(length)
    })

    test('encodingLength', () => {
      const length = 5

      const type = buffer(() => length * 2)
      expect(type.encodingLength(Buffer.alloc(length))).toBe(length)
    })
  })
})
