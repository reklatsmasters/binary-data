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
        decode(rstream, meta) {
          meta.bytes += bytes
          return res1
        },
      },
      b: {
        decode(rstream, meta) {
          meta.bytes += bytes
          return res2
        },
      },
    }

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

    const type1 = {
      decode(rstream, meta) {
        meta.bytes += bytes
        return res1
      },
    }

    const type2 = {
      decode(rstream, meta) {
        meta.bytes += bytes
        return 200
      },
      encode() {},
    }

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

    const context = {
      node: {},
      currentNode: {},
    }

    let called = false

    const schema = {
      a: {
        decode: xdecode,
      },
    }

    function xdecode(rstream_, meta) {
      expect(rstream_).toBe(rstream)
      expect(meta.context).toEqual(context)
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
          decode(rstream, meta) {
            meta.bytes += bytes
            return res1
          },
        },
      },
      c: {
        decode(rstream, meta) {
          meta.bytes += bytes
          return res1
        },
      },
    }

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
        decode(rstream, meta) {
          meta.bytes += bytes
          return res1
        },
      },
    }

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
      decode(rstream, meta) {
        meta.bytes += bytes
        return res1
      },
    }

    const type2 = {
      decode(rstream, meta) {
        meta.bytes += bytes
        return res2
      },
      encode() {},
    }

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
      decode(rstream, meta) {
        meta.bytes += bytes
        return res1
      },
    }

    const type2 = {
      decode(rstream, meta) {
        meta.bytes += bytes
        return res2
      },
      encode() {},
    }

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
