const reserved = require('types/reserved')
const { encode } = require('lib/encode')

describe('encode', () => {
  test('should encode objects using schema', () => {
    const wstream = {}

    const schema = {
      a: {
        encode: jest.fn(),
      },
      b: {
        encode: jest.fn(),
      },
    }

    const object = {
      a: 100,
      b: 200,
    }

    schema.a.encode.bytes = 10
    schema.b.encode.bytes = 33

    encode(object, wstream, schema)

    expect(schema.a.encode).toHaveBeenCalledTimes(1)
    expect(schema.b.encode).toHaveBeenCalledTimes(1)
    expect(encode.bytes).toEqual(schema.a.encode.bytes + schema.b.encode.bytes)
  })

  test('should encode reserved fields', () => {
    const wstream = {}

    const bytes1 = 33
    const bytes2 = 10

    const itemType = {
      encode: jest.fn(),
      decode() {},
    }

    itemType.encode.bytes = bytes1

    const schema = {
      a: {
        encode: jest.fn(),
      },
      b: reserved(itemType, 1),
    }

    const object = {
      a: 100,
    }

    schema.a.encode.bytes = bytes2

    encode(object, wstream, schema)

    expect(schema.a.encode).toBeCalled()
    expect(itemType.encode).toBeCalled()
    expect(encode.bytes).toEqual(bytes1 + bytes2)
  })

  test('each field should be a valid type', () => {
    const wstream = {}

    const schema = {
      a: null,
    }

    const expectedError = 'Argument `schema` should be a plain object.'

    expect(() => encode({}, wstream, schema)).toThrow(expectedError)
  })

  test('schema should be a plain object', () => {
    const wstream = {}
    const expectedError = 'Argument `schema` should be a plain object.'

    expect(() => encode({}, wstream, 123)).toThrow(expectedError)
    expect(() => encode({}, wstream, '123')).toThrow(expectedError)
    expect(() => encode({}, wstream, /.+/)).toThrow(expectedError)
  })

  test('should encode nexted objects', () => {
    const wstream = {}

    const encodeFn = jest.fn()

    const schema = {
      a: {
        b: {
          encode: encodeFn,
        },
      },
      c: {
        encode: encodeFn,
      },
    }

    const object = {
      a: {
        b: 100,
      },
      c: 100,
    }

    encodeFn.bytes = 10

    encode(object, wstream, schema)
    expect(encodeFn).toHaveBeenCalledTimes(2)
    expect(encode.bytes).toEqual(encodeFn.bytes * 2)
  })
})
