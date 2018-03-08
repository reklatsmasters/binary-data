const sinon = require('sinon')
const array = require('lib/types/array')
const common = require('testing/common')

describe('array', () => {
  const wstream = {}
  const rstream = {}

  const type = common.makeType()

  beforeEach(() => {
    common.reset(type)
  })

  describe('fixed length', () => {
    test('encode', () => {
      const bytes = 7
      const items = [10, 20]

      type.encode.withArgs(items[0], wstream).returns(1)
      type.encode.withArgs(items[1], wstream).returns(2)

      common.plug(type, bytes)

      const enctype = array(type, items.length)
      enctype.encode(items, wstream)

      expect(type.encode.callCount).toBe(2)
      expect(enctype.encode.bytes).toBe(bytes * items.length)
    })

    test('encode if length in bytes', () => {
      const bytes = 7
      const items = [10, 20]
      const length = bytes * items.length

      type.encode.withArgs(items[0], wstream).returns(1)
      type.encode.withArgs(items[1], wstream).returns(2)

      type.encodingLength.withArgs(items[0]).returns(bytes)
      type.encodingLength.withArgs(items[1]).returns(bytes)

      common.plug(type, bytes)

      const enctype = array(type, length, 'bytes')
      enctype.encode(items, wstream)

      expect(type.encode.callCount).toBe(items.length)
      expect(type.encodingLength.callCount).toBe(items.length)
      expect(enctype.encode.bytes).toBe(length)
    })

    test('throws when length != items.length', () => {
      const items = [10, 20]

      const requiredSize = items.length + 1
      const enctype = array(type, requiredSize)

      expect(() => enctype.encode(items, wstream)).toThrow(
        `Argument #1 required length ${requiredSize} instead of ${items.length}`
      )
    })

    test('decode', () => {
      const length = 2

      const first = 1
      const second = 2

      const bytes = 2

      type.decode
        .withArgs(rstream)
        .onFirstCall()
        .returns(first)
        .onSecondCall()
        .returns(second)

      common.plug(type, bytes)

      const enctype = array(type, length)
      const items = enctype.decode(rstream)

      expect(Array.isArray(items)).toBeTruthy()
      expect(items.length).toBe(length)

      expect(items[0]).toBe(first)
      expect(items[1]).toBe(second)

      expect(enctype.decode.bytes).toBe(bytes * length)
    })

    test('decode if length in bytes', () => {
      const bytes = 3
      const count = 2
      const length = count * bytes

      const first = 1
      const second = 2

      type.decode
        .withArgs(rstream)
        .onFirstCall()
        .returns(first)
        .onSecondCall()
        .returns(second)

      common.plug(type, bytes)

      const enctype = array(type, length, 'bytes')
      const items = enctype.decode(rstream)

      expect(Array.isArray(items)).toBeTruthy()
      expect(items.length).toBe(count)

      expect(items[0]).toBe(first)
      expect(items[1]).toBe(second)

      expect(enctype.decode.bytes).toBe(length)
    })

    test('encodingLength', () => {
      const obj = [10, 20]
      const bytes = 3

      type.encodingLength.withArgs(obj[0]).returns(bytes)
      type.encodingLength.withArgs(obj[1]).returns(bytes)
      common.plug(type, bytes)

      const schema = array(type, obj.length)

      expect(schema.encodingLength(obj)).toBe(obj.length * bytes)
    })

    test('encodingLength # length in bytes', () => {
      const obj = [10, 20]
      const bytes = 3
      const length = obj.length * bytes

      type.encodingLength.withArgs(obj[0]).returns(bytes)
      type.encodingLength.withArgs(obj[1]).returns(bytes)
      common.plug(type, bytes)

      const schema = array(type, length, 'bytes')

      expect(schema.encodingLength(obj)).toBe(length)
    })
  })

  describe('length prefix', () => {
    const lengthType = common.makeType()

    beforeEach(() => {
      common.reset(lengthType)
    })

    test('encode', () => {
      const items = [100, 200, 300]

      lengthType.encode.withArgs(items.length).returns(1)
      lengthType.encode.throws('lengthType.encode')
      common.plug(lengthType, 2)

      type.encode.withArgs(items[0], wstream).returns(1)
      type.encode.withArgs(items[1], wstream).returns(2)
      type.encode.withArgs(items[2], wstream).returns(3)
      common.plug(type, 4)

      const enctype = array(type, lengthType)
      enctype.encode(items, wstream)

      expect(lengthType.encode.callCount).toBe(1)
      expect(type.encode.callCount).toBe(items.length)
      expect(enctype.encode.bytes).toBe(
        type.encode.bytes * items.length + lengthType.encode.bytes
      )
      expect(lengthType.encode.calledBefore(type.encode)).toBeTruthy()
    })

    test('decode', () => {
      const length = 2

      const first = 1
      const second = 2

      const bytes = 2

      lengthType.decode.withArgs(rstream).returns(length)
      common.plug(lengthType, 3)

      type.decode
        .withArgs(rstream)
        .onFirstCall()
        .returns(first)
        .onSecondCall()
        .returns(second)

      common.plug(type, bytes)

      const enctype = array(type, lengthType)
      const items = enctype.decode(rstream)

      expect(Array.isArray(items)).toBeTruthy()
      expect(items.length).toBe(length)

      expect(lengthType.decode.callCount).toBe(1)
      expect(type.decode.callCount).toBe(items.length)

      expect(items[0]).toBe(first)
      expect(items[1]).toBe(second)

      expect(enctype.decode.bytes).toBe(
        bytes * length + lengthType.decode.bytes
      )
      expect(lengthType.decode.calledBefore(type.decode)).toBeTruthy()
    })

    test('encodingLength', () => {
      const obj = [10, 20]
      const bytes = 3
      const lengthBytes = 5

      lengthType.encodingLength.withArgs(obj.length).returns(lengthBytes)
      common.plug(lengthType)

      type.encodingLength.withArgs(obj[0]).returns(bytes)
      type.encodingLength.withArgs(obj[1]).returns(bytes)
      common.plug(type, bytes)

      const schema = array(type, lengthType)

      expect(schema.encodingLength(obj)).toBe(obj.length * bytes + lengthBytes)
    })

    describe('length in bytes', () => {
      test('encode', () => {
        const items = [100, 200, 300]
        const bytes = 5
        const length = bytes * items.length

        lengthType.encode.withArgs(length).returns(1)
        lengthType.encode.throws('lengthType.encode')
        common.plug(lengthType, bytes)

        type.encode.withArgs(items[0], wstream).returns(1)
        type.encode.withArgs(items[1], wstream).returns(2)
        type.encode.withArgs(items[2], wstream).returns(3)

        type.encodingLength.withArgs(items[0]).returns(bytes)
        type.encodingLength.withArgs(items[1]).returns(bytes)
        type.encodingLength.withArgs(items[2]).returns(bytes)

        common.plug(type, bytes)

        const enctype = array(type, lengthType, 'bytes')
        enctype.encode(items, wstream)

        expect(lengthType.encode.callCount).toBe(1)
        expect(type.encode.callCount).toBe(items.length)
        expect(enctype.encode.bytes).toBe(length + bytes)
        expect(lengthType.encode.calledBefore(type.encode)).toBeTruthy()
      })

      test('encodingLength', () => {
        const obj = [10, 20]
        const bytes = 3
        const lengthBytes = 5

        lengthType.encodingLength
          .withArgs(obj.length * bytes)
          .returns(lengthBytes)
        common.plug(lengthType)

        type.encodingLength.withArgs(obj[0]).returns(bytes)
        type.encodingLength.withArgs(obj[1]).returns(bytes)
        common.plug(type, bytes)

        const schema = array(type, lengthType, 'bytes')

        expect(schema.encodingLength(obj)).toBe(
          obj.length * bytes + lengthBytes
        )
      })
    })

    describe('user defined types', () => {
      test('encode', () => {
        const items = [{ a: 100 }, { a: 200 }, { a: 300 }]
        const bytes = 4
        const lengthBytes = 2

        lengthType.encode.withArgs(items.length).returns(1)
        common.plug(lengthType, lengthBytes)

        const schema = {
          a: common.makeType(),
        }

        schema.a.encode.withArgs(items[0].a, wstream).returns(1)
        schema.a.encode.withArgs(items[1].a, wstream).returns(2)
        schema.a.encode.withArgs(items[2].a, wstream).returns(3)
        common.plug(schema.a, bytes)

        const enctype = array(schema, lengthType)
        enctype.encode(items, wstream)

        expect(lengthType.encode.callCount).toBe(1)
        expect(schema.a.encode.callCount).toBe(items.length)
        expect(enctype.encode.bytes).toBe(lengthBytes + bytes * items.length)
        expect(lengthType.encode.calledBefore(type.encode)).toBeTruthy()
      })

      test('decode', () => {
        const length = 2

        const first = 1
        const second = 2

        const bytes = 2
        const lengthBytes = 3

        lengthType.decode.withArgs(rstream).returns(length)
        common.plug(lengthType, lengthBytes)

        const schema = {
          a: common.makeType(),
        }

        schema.a.decode
          .withArgs(rstream)
          .onFirstCall()
          .returns(first)
          .onSecondCall()
          .returns(second)

        common.plug(schema.a, bytes)

        const enctype = array(schema, lengthType)
        const items = enctype.decode(rstream)

        expect(Array.isArray(items)).toBeTruthy()
        expect(items.length).toBe(length)

        expect(lengthType.decode.callCount).toBe(1)
        expect(schema.a.decode.callCount).toBe(items.length)

        expect(items[0]).toEqual({ a: first })
        expect(items[1]).toEqual({ a: second })

        expect(enctype.decode.bytes).toBe(bytes * length + lengthBytes)
        expect(lengthType.decode.calledBefore(type.decode)).toBeTruthy()
      })
    })
  })

  describe('length function', () => {
    test('decode', () => {
      const expectedContext = {
        node: {},
      }

      const expectLength = 2
      const bytes = 2

      const first = 1
      const second = 2

      type.decode
        .withArgs(rstream)
        .onFirstCall()
        .returns(first)
        .onSecondCall()
        .returns(second)

      common.plug(type, bytes)

      const callback = sinon.stub()

      callback.withArgs(expectedContext).returns(expectLength)
      callback.throws('callback')

      const enctype = array(type, callback)
      const items = enctype.decode.call(expectedContext, rstream)

      expect(Array.isArray(items)).toBeTruthy()
      expect(items.length).toBe(expectLength)

      expect(callback.callCount).toBe(1)
      expect(type.decode.callCount).toBe(items.length)

      expect(items[0]).toBe(first)
      expect(items[1]).toBe(second)

      expect(enctype.decode.bytes).toBe(bytes * expectLength)
      expect(callback.calledBefore(type.decode)).toBeTruthy()
    })

    test('decode if length in bytes', () => {
      const expectedContext = {
        node: {},
      }

      const bytes = 2
      const count = 2
      const expectLength = bytes * count

      const first = 1
      const second = 2

      type.decode
        .withArgs(rstream)
        .onFirstCall()
        .returns(first)
        .onSecondCall()
        .returns(second)

      common.plug(type, bytes)
      const callback = sinon.stub()

      callback.withArgs(expectedContext).returns(expectLength)
      callback.throws('callback')

      const enctype = array(type, callback, 'bytes')
      const items = enctype.decode.call(expectedContext, rstream)

      expect(Array.isArray(items)).toBeTruthy()
      expect(items.length).toBe(count)

      expect(callback.callCount).toBe(1)
      expect(type.decode.callCount).toBe(items.length)

      expect(items[0]).toBe(first)
      expect(items[1]).toBe(second)

      expect(enctype.decode.bytes).toBe(expectLength)
      expect(callback.calledBefore(type.decode)).toBeTruthy()
    })

    test('encode', () => {
      const items = [100, 200, 300]

      const context = {
        node: {},
      }

      const bytes = 4

      const callback = sinon.stub()
      callback.withArgs(context).returns(items.length)
      callback.throws('callback')

      type.encode.withArgs(items[0], wstream).returns(1)
      type.encode.withArgs(items[1], wstream).returns(2)
      type.encode.withArgs(items[2], wstream).returns(3)
      common.plug(type, bytes)

      const enctype = array(type, callback)
      enctype.encode(items, wstream, context)

      expect(callback.callCount).toBe(1)
      expect(type.encode.callCount).toBe(items.length)
      expect(enctype.encode.bytes).toBe(bytes * items.length)
    })

    test('encode if length in bytes', () => {
      const items = [100, 200, 300]

      const context = {
        node: {},
      }

      const bytes = 4

      const callback = sinon.stub()
      callback.withArgs(context).returns(bytes * items.length)
      callback.throws('callback')

      type.encode.withArgs(items[0], wstream).returns(1)
      type.encode.withArgs(items[1], wstream).returns(2)
      type.encode.withArgs(items[2], wstream).returns(3)

      type.encodingLength.withArgs(items[0]).returns(bytes)
      type.encodingLength.withArgs(items[1]).returns(bytes)
      type.encodingLength.withArgs(items[2]).returns(bytes)

      common.plug(type, bytes)

      const enctype = array(type, callback, 'bytes')
      enctype.encode(items, wstream, context)

      expect(callback.callCount).toBe(1)
      expect(type.encode.callCount).toBe(items.length)
      expect(enctype.encode.bytes).toBe(bytes * items.length)
    })

    test('encodingLength', () => {
      const obj = [10, 20]
      const bytes = 3

      type.encodingLength.withArgs(obj[0]).returns(bytes)
      type.encodingLength.withArgs(obj[1]).returns(bytes)
      common.plug(type, bytes)

      const schema = array(type, () => {})

      expect(schema.encodingLength(obj)).toBe(obj.length * bytes)
    })

    test('encodingLength # length in bytes', () => {
      const obj = [10, 20]
      const bytes = 3
      const length = obj.length * bytes

      type.encodingLength.withArgs(obj[0]).returns(bytes)
      type.encodingLength.withArgs(obj[1]).returns(bytes)
      common.plug(type, bytes)

      const schema = array(type, () => {}, 'bytes')

      expect(schema.encodingLength(obj)).toBe(length)
    })
  })
})
