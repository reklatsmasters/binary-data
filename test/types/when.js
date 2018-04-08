const when = require('types/when')
const symbols = require('internal/symbols')

describe('when', () => {
  test('encode positive', () => {
    const childBytes = 3
    const childValue = 12
    const wstream = {}

    const childType = {
      encode: jest.fn().mockImplementation(() => {
        childType.encode.bytes = childBytes
      }),
      decode() {},
    }

    const context = {}

    const type = when(() => true, childType)

    type.encode(childValue, wstream, context)

    expect(type.encode.bytes).toEqual(childBytes)
    expect(type[symbols.skip]).toEqual(false)
    expect(childType.encode).toHaveBeenCalledTimes(1)
  })

  test('encode negative', () => {
    const childBytes = 3
    const childValue = 12
    const wstream = {}

    const childType = {
      encode: jest.fn().mockImplementation(() => {
        childType.encode.bytes = childBytes
      }),
      decode() {},
    }

    const context = {}

    const type = when(() => false, childType)

    type.encode(childValue, wstream, context)

    expect(type.encode.bytes).toEqual(0)
    expect(type[symbols.skip]).toEqual(true)
    expect(childType.encode).toHaveBeenCalledTimes(0)
  })

  test('encodingLength positive', () => {
    const value = 123
    const bytes = 10

    const childType = {
      decode() {},
      encode() {},
      encodingLength() {
        return bytes
      },
    }

    const type = when(() => true, childType)

    expect(type.encodingLength(value)).toBe(bytes)
  })

  test('encodingLength negative', () => {
    const value = 123
    const bytes = 10

    const childType = {
      decode() {},
      encode() {},
      encodingLength() {
        return bytes
      },
    }

    const type = when(() => false, childType)

    expect(type.encodingLength(value)).toBe(bytes)
  })

  test('decode positive', () => {
    const childBytes = 3
    const childValue = 12

    const childType = {
      decode: () => childValue,
      encode() {},
    }

    childType.decode.bytes = childBytes

    const type = when(() => true, childType)

    expect(type.decode({})).toEqual(childValue)
    expect(type.decode.bytes).toEqual(childBytes)
    expect(type[symbols.skip]).toEqual(false)
  })

  test('decode negative', () => {
    const childBytes = 3
    const childValue = 12

    const childType = {
      decode: () => childValue,
      encode() {},
    }

    childType.decode.bytes = childBytes

    const type = when(() => false, childType)

    expect(type.decode({})).toEqual(undefined)
    expect(type.decode.bytes).toEqual(0)
    expect(type[symbols.skip]).toEqual(true)
  })
})
