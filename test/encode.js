const sinon = require('sinon')
const reserved = require('types/reserved')
const encode = require('lib/encode')
const common = require('testing/common')

describe('encode', () => {
  const type = common.makeType()

  afterEach(() => {
    common.reset(type)
  })

  test('should encode objects using schema', () => {
    const wstream = {}

    const schema = {
      a: {
        encode: sinon.stub(),
      },
      b: {
        encode: sinon.stub(),
      },
    }

    const obj = {
      a: 100,
      b: 200,
    }

    const context = {
      node: obj,
    }

    schema.a.encode.withArgs(obj.a, wstream, context).returns(1)
    schema.a.encode.throws('schema.a.encode')
    schema.a.encode.bytes = 10

    schema.b.encode.withArgs(obj.b, wstream, context).returns(1)
    schema.b.encode.throws('schema.b.encode')
    schema.b.encode.bytes = 33

    encode(obj, wstream, schema)

    expect(schema.a.encode.callCount).toEqual(1)
    expect(schema.b.encode.callCount).toEqual(1)
    expect(encode.bytes).toEqual(schema.a.encode.bytes + schema.b.encode.bytes)
  })

  test('should encode reserved fields', () => {
    const wstream = {}

    const schema = {
      a: {
        encode: sinon.stub(),
      },
      b: reserved(type, 1),
    }

    sinon.stub(schema.b, 'encode')

    const obj = {
      a: 100,
    }

    schema.a.encode.withArgs(obj.a, wstream).returns(1)
    schema.a.encode.throws('schema.a.encode')
    schema.a.encode.bytes = 10

    schema.b.encode.withArgs(void 0, wstream).returns(1)
    schema.b.encode.throws('schema.b.encode')
    schema.b.encode.bytes = 33

    encode(obj, wstream, schema)

    expect(schema.a.encode.callCount).toEqual(1)
    expect(schema.b.encode.callCount).toEqual(1)
    expect(encode.bytes).toEqual(schema.a.encode.bytes + schema.b.encode.bytes)
  })

  test('each field should be a valid type', () => {
    const wstream = {}

    const schema = {
      a: null,
    }

    const expectedError = `Field 'a' has an unknown type.`

    expect(() => encode({}, wstream, schema)).toThrow(expectedError)
  })

  test('schema should be a plain object', () => {
    const wstream = {}
    const expectedError = 'Argument #3 should be a plain object.'

    expect(() => encode({}, wstream, 123)).toThrow(expectedError)
    expect(() => encode({}, wstream, '123')).toThrow(expectedError)
    expect(() => encode({}, wstream, /.+/)).toThrow(expectedError)
  })

  test('encoded object should be a plain object', () => {
    const wstream = {}
    const expectedError = 'Argument #1 should be a plain object.'

    expect(() => encode(123, wstream, {})).toThrow(expectedError)
    expect(() => encode('123', wstream, {})).toThrow(expectedError)
    expect(() => encode(/.+/, wstream, {})).toThrow(expectedError)
  })

  test('should encode nexted objects', () => {
    const wstream = {}

    const encodeType = sinon.stub()

    const schema = {
      a: {
        b: {
          encode: encodeType,
        },
      },
      c: {
        encode: encodeType,
      },
    }

    const object = {
      a: {
        b: 100,
      },
      c: 100,
    }

    const context1 = {
      node: object.a,
    }

    const context2 = {
      node: object,
    }

    encodeType.withArgs(object.a.b, wstream, context1).returns(1)
    encodeType.withArgs(object.c, wstream, context2).returns(1)
    encodeType.throws('encode')
    encodeType.bytes = 10

    encode(object, wstream, schema)
    expect(encodeType.callCount).toEqual(2)
  })
})
