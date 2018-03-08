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

      const length = 2
      const buf = Buffer.allocUnsafe(length)

      readBuffer.withArgs(length).returns(buf)
      readBuffer.throws('readBuffer')

      const type = buffer(length)
      const result = type.decode(rstream)

      expect(result).toBe(buf)
      expect(readBuffer.callCount).toBe(1)
      expect(type.decode.bytes).toBe(length)
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

      const rstream = {
        readBuffer,
      }

      const length = 2
      const buf = Buffer.allocUnsafe(length)

      readBuffer.withArgs(length).returns(buf)
      readBuffer.throws('readBuffer')

      const lengthType = common.makeType()

      lengthType.decode.withArgs(rstream).returns(length)
      common.plug(lengthType)

      const type = buffer(lengthType)
      const result = type.decode(rstream)

      expect(result).toBe(buf)
      expect(readBuffer.callCount).toBe(1)
      expect(lengthType.decode.callCount).toBe(1)
      expect(lengthType.decode.calledBefore(readBuffer)).toBeTruthy()
      expect(type.decode.bytes).toBe(buf.length + lengthType.decode.bytes)
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

      readBuffer.withArgs(length).returns(buf)
      readBuffer.throws('readBuffer')

      const callback = sinon.stub()
      callback.withArgs(context).returns(length)
      callback.throws('callback')

      const type = buffer(callback)
      const result = type.decode.call(context, rstream)

      expect(result).toBe(buf)
      expect(readBuffer.callCount).toBe(1)
      expect(callback.callCount).toBe(1)
      expect(type.decode.bytes).toBe(length)
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
