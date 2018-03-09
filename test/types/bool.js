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
    const bytes = 10

    const lowtype = {
      decode(rstream, meta) {
        meta.bytes += bytes
        return 200
      },
      encode() {}
    }

    const meta = {
      bytes: 0
    }

    const type = bool(lowtype)
    const result = type.decode(rstream, meta)

    expect(result).toBe(true)
    expect(meta.bytes).toBe(bytes)
  })

  test('decode false', () => {
    const rstream = {}
    const bytes = 10

    const lowtype = {
      decode(rstream, meta) {
        meta.bytes += bytes
        return 0
      },
      encode() {}
    }

    const meta = {
      bytes: 0
    }

    const type = bool(lowtype)
    const result = type.decode(rstream, meta)

    expect(result).toBe(false)
    expect(meta.bytes).toBe(bytes)
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
