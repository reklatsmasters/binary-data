const reserved = require('lib/types/reserved')
const sinon = require('sinon')
const common = require('testing/common')

describe('reserved', () => {
  const lowtype = common.makeType()

  beforeEach(() => {
    common.reset(lowtype)
  })

  test('encode', () => {
    const size = 2
    const type = reserved(lowtype, size)
    const wstream = {}

    lowtype.encode.withArgs(0, wstream).returns(1)
    common.plug(lowtype)

    type.encode('qqq', wstream)
    expect(lowtype.encode.callCount).toBe(size)
    expect(type.encode.bytes).toBe(lowtype.encode.bytes * size)
  })

  test('decode', () => {
    const size = 2
    const type = reserved(lowtype, size)
    const rstream = {}

    lowtype.decode.withArgs(rstream).returns(1)
    common.plug(lowtype)

    const result = type.decode(rstream)
    expect(result).toBe(void 0)
    expect(type.decode.bytes).toBe(lowtype.decode.bytes * size)
    expect(lowtype.decode.callCount).toBe(size)
  })

  test('should decode when `size` is function', () => {
    const callback = sinon.stub()

    const size = 2
    const rstream = {}
    const context = { node: {} }

    callback.withArgs(context).returns(size)
    callback.throws('callback')

    lowtype.decode.withArgs(rstream).returns(1)
    common.plug(lowtype)

    const type = reserved(lowtype, callback)
    const result = type.decode.call(context, rstream)

    expect(result).toBe(void 0)
    expect(callback.callCount).toBe(1)
    expect(type.decode.bytes).toBe(lowtype.decode.bytes * size)
    expect(lowtype.decode.callCount).toBe(size)
  })

  test('should encode when `size` is function', () => {
    const size = 2
    const wstream = {}
    const context = { node: {} }
    const callback = sinon.stub()

    callback.withArgs(context).returns(size)
    callback.throws('callback')

    lowtype.encode.withArgs(0, wstream).returns(1)
    common.plug(lowtype)

    const type = reserved(lowtype, callback)
    type.encode(null, wstream, context)

    expect(lowtype.encode.callCount).toBe(size)
    expect(callback.callCount).toBe(1)
    expect(type.encode.bytes).toBe(lowtype.encode.bytes * size)
  })

  test('encodingLength', () => {
    const size = 4
    const type = reserved(lowtype, size)
    const value = 1
    const length = 2

    lowtype.encodingLength.withArgs(value).returns(length)
    common.plug(lowtype)

    expect(type.encodingLength(value)).toBe(size * length)
    expect(lowtype.encodingLength.callCount).toBe(1)
  })

  test('encodingLength should work when `size` is function', () => {
    const size = 2
    const value = 1
    const context = { node: value }
    const callback = sinon.stub()
    const type = reserved(lowtype, callback)
    const length = 2

    callback.withArgs(context).returns(size)
    callback.throws('callback')

    lowtype.encodingLength.withArgs(value, context).returns(length)
    common.plug(lowtype)

    expect(type.encodingLength(value, context)).toBe(size * length)
    expect(lowtype.encodingLength.callCount).toBe(1)
  })
})
