const bool = require('types/bool')
const common = require('testing/common')

describe('bool', () => {
  const lowtype = common.makeType()

  beforeEach(() => {
    common.reset(lowtype)
  })

  test('encode true', () => {
    const wstream = {}

    lowtype.encode.withArgs(1, wstream).returns(1)
    common.plug(lowtype)

    const type = bool(lowtype)
    type.encode(true, wstream)

    expect(lowtype.encode.callCount).toBe(1)
    expect(type.encode.bytes).toBe(lowtype.encode.bytes)
  })

  test('encode false', () => {
    const wstream = {}

    lowtype.encode.withArgs(0, wstream).returns(1)
    common.plug(lowtype)

    const type = bool(lowtype)
    type.encode(false, wstream)

    expect(lowtype.encode.callCount).toBe(1)
    expect(type.encode.bytes).toBe(lowtype.encode.bytes)
  })

  test('decode true', () => {
    const rstream = {}

    lowtype.decode.withArgs(rstream).returns(322)
    common.plug(lowtype)

    const type = bool(lowtype)
    const result = type.decode(rstream)

    expect(result).toBe(true)
    expect(lowtype.decode.callCount).toBe(1)
    expect(type.decode.bytes).toBe(lowtype.decode.bytes)
  })

  test('decode false', () => {
    const rstream = {}

    lowtype.decode.withArgs(rstream).returns(0)
    common.plug(lowtype)

    const type = bool(lowtype)
    const result = type.decode(rstream)

    expect(result).toBe(false)
    expect(lowtype.decode.callCount).toBe(1)
    expect(type.decode.bytes).toBe(lowtype.decode.bytes)
  })

  test('encodingLength', () => {
    const expectedLength = 4
    const value = true

    lowtype.encodingLength.withArgs(value).returns(expectedLength)
    common.plug(lowtype)

    const type = bool(lowtype)
    expect(type.encodingLength(value)).toBe(expectedLength)
    expect(lowtype.encodingLength.callCount).toBe(1)
  })
})
