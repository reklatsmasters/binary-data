jest.mock('lib/types/reserved')
jest.mock('lib/stream/decode')

const sinon = require('sinon')
const { Reserved } = require('lib/types/reserved')
const decode = require('lib/decode')
const DecodeStream = require('lib/stream/decode')

describe('decode', () => {
  test('should use schema', () => {
    const rstream = {}

    const schema = {
      a: {
        decode: sinon.stub(),
      },
      b: {
        decode: sinon.stub(),
      },
    }

    const expectedResult = {
      a: 100,
      b: 200,
    }

    schema.a.decode.withArgs(rstream).returns(expectedResult.a)
    schema.a.decode.throws('schema.a.decode')
    schema.a.decode.bytes = 12

    schema.b.decode.withArgs(rstream).returns(expectedResult.b)
    schema.b.decode.throws('schema.b.decode')
    schema.b.decode.bytes = 7

    const result = decode(rstream, schema)
    expect(result).toEqual(expectedResult)
    expect(decode.bytes).toEqual(schema.a.decode.bytes + schema.b.decode.bytes)
    expect(schema.a.decode.callCount).toEqual(1)
    expect(schema.b.decode.callCount).toEqual(1)
  })

  test('should skip reserved field', () => {
    const rstream = {}

    const reserved = new Reserved()
    sinon.stub(reserved, 'decode')
    expect(reserved.isMock).toBe(true)

    const schema = {
      a: {
        decode: sinon.stub(),
      },
      b: reserved,
    }

    const expectedResult = {
      a: 1,
    }

    schema.a.decode.withArgs(rstream).returns(expectedResult.a)
    schema.a.decode.throws('schema.a.decode')
    schema.a.decode.bytes = 12

    schema.b.decode.withArgs(rstream).returns(0)
    schema.b.decode.throws('schema.b.decode')
    schema.b.decode.bytes = 7

    const result = decode(rstream, schema)
    expect(result).toEqual(expectedResult)
    expect(decode.bytes).toEqual(schema.a.decode.bytes + schema.b.decode.bytes)
    expect(schema.a.decode.callCount).toEqual(1)
    expect(schema.b.decode.callCount).toEqual(1)
  })

  test('should set context', () => {
    const rstream = {}

    const context = {
      node: {},
    }

    let called = false

    const schema = {
      a: {
        decode: xdecode,
      },
    }

    function xdecode(rstream_, context_) {
      expect(rstream_).toBe(rstream)
      expect(context_).toEqual(context)
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

    const expectedError = `Field 'a' has an unknown type.`

    expect(() => decode(rstream, schema)).toThrow(expectedError)
  })

  test('should decode nested types', () => {
    const rstream = {}

    const decodeType = sinon.stub()

    const schema = {
      a: {
        b: {
          decode: decodeType,
        },
      },
      c: {
        decode: decodeType,
      },
    }

    const value = 100

    const expectedResult = {
      a: {
        b: value,
      },
      c: value,
    }

    const context1 = {
      node: {
        a: expectedResult.a,
      },
    }

    const context2 = {
      node: {},
    }

    decodeType.withArgs(rstream, context1).returns(value)
    decodeType.withArgs(rstream, context2).returns(value)
    decodeType.throws('decodeType')
    decodeType.bytes = 7

    const result = decode(rstream, schema)
    expect(result).toEqual(expectedResult)
    expect(decode.bytes).toEqual(decodeType.bytes * 2)
  })

  test('should decode buffers', () => {
    const buffer = Buffer.alloc(1)

    const schema = {
      a: {
        decode: sinon.stub(),
      }
    }

    const expectedResult = {
      a: 100,
    }

    schema.a.decode.withArgs(sinon.match.instanceOf(DecodeStream)).returns(expectedResult.a)
    schema.a.decode.throws('schema.a.decode')
    schema.a.decode.bytes = 12

    const result = decode(buffer, schema)

    expect(result).toEqual(expectedResult)
    expect(decode.bytes).toEqual(schema.a.decode.bytes)
    expect(schema.a.decode.callCount).toEqual(1)
  })
})
