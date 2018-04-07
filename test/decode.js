jest.mock('streams/decode')

const reserved = require('types/reserved')
const when = require('types/when')
const { decode } = require('lib/decode')

describe('decode', () => {
  test('should use schema', () => {
    const rstream = {}
    const bytes = 10

    const res1 = 100
    const res2 = 200

    const schema = {
      a: {
        decode: () => res1,
      },
      b: {
        decode: () => res2,
      },
    }

    schema.a.decode.bytes = bytes
    schema.b.decode.bytes = bytes

    const expectedResult = {
      a: res1,
      b: res2,
    }

    const result = decode(rstream, schema)
    expect(result).toEqual(expectedResult)
    expect(decode.bytes).toEqual(bytes * 2)
  })

  test('should skip reserved field', () => {
    const rstream = {}
    const bytes = 10
    const res1 = 100
    const res2 = 200

    const type1 = {
      decode: () => res1,
    }

    const type2 = {
      decode: () => res2,
      encode() {},
    }

    type1.decode.bytes = bytes
    type2.decode.bytes = bytes

    const schema = {
      a: type1,
      b: reserved(type2, 1),
    }

    const expectedResult = {
      a: res1,
    }

    const result = decode(rstream, schema)
    expect(result).toEqual(expectedResult)
    expect(decode.bytes).toEqual(bytes * 2)
  })

  test('should set context', () => {
    const rstream = {}
    let called = false

    const schema = {
      a: {
        decode: xdecode,
      },
    }

    function xdecode(rstream_) {
      expect(rstream_).toBe(rstream)
      // eslint-disable-next-line no-invalid-this
      const context = this

      expect(context).toHaveProperty('node', {})
      expect(context).toHaveProperty('current', {})
      called = true
    }

    decode(rstream, schema)
    expect(called).toBeTruthy()
  })

  test('schema should be a plain object', () => {
    const rstream = {}
    const expectedError = 'Argument #2 should be a plain object.'

    expect(() => decode(rstream, 123)).toThrow(expectedError)
    expect(() => decode(rstream, '123')).toThrow(expectedError)
    expect(() => decode(rstream, /.+/)).toThrow(expectedError)
  })

  test('each field should have a valid type', () => {
    const rstream = {}

    const schema = {
      a: null,
    }

    const expectedError = `Argument #2 should be a plain object.`

    expect(() => decode(rstream, schema)).toThrow(expectedError)
  })

  test('should decode nested types', () => {
    const rstream = {}
    const res1 = 100
    const bytes = 10

    const schema = {
      a: {
        b: {
          decode: () => res1,
        },
      },
      c: {
        decode: () => res1,
      },
    }

    schema.a.b.decode.bytes = bytes
    schema.c.decode.bytes = bytes

    const expectedResult = {
      a: {
        b: res1,
      },
      c: res1,
    }

    const result = decode(rstream, schema)
    expect(result).toEqual(expectedResult)
    expect(decode.bytes).toEqual(bytes * 2)
  })

  test('should decode buffers', () => {
    const buffer = Buffer.alloc(1)
    const bytes = 10
    const res1 = 100

    const schema = {
      a: {
        decode: () => res1,
      },
    }

    schema.a.decode.bytes = bytes

    const expectedResult = {
      a: res1,
    }

    const result = decode(buffer, schema)

    expect(result).toEqual(expectedResult)
    expect(decode.bytes).toEqual(bytes)
  })

  test('should decode positive conditions', () => {
    const rstream = {}
    const bytes = 10

    const res1 = 100
    const res2 = 200

    const type1 = {
      decode: () => res1,
    }

    const type2 = {
      decode: () => res2,
      encode() {},
    }

    type1.decode.bytes = bytes
    type2.decode.bytes = bytes

    const schema = {
      a: type1,
      b: when(() => true, type2),
    }

    const expectedResult = {
      a: res1,
      b: res2,
    }

    const result = decode(rstream, schema)

    expect(result).toEqual(expectedResult)
    expect(decode.bytes).toEqual(bytes * 2)
  })

  test('should skip negative conditions', () => {
    const rstream = {}
    const bytes = 10

    const res1 = 100
    const res2 = 200

    const type1 = {
      decode: () => res1,
    }

    const type2 = {
      decode: () => res2,
      encode() {},
    }

    type1.decode.bytes = bytes
    type2.decode.bytes = bytes

    const schema = {
      a: type1,
      b: when(() => false, type2),
    }

    const expectedResult = {
      a: res1,
    }

    const result = decode(rstream, schema)

    expect(result).toEqual(expectedResult)
    expect(decode.bytes).toEqual(bytes)
  })
})
