const encodingLength = require('lib/encoding-length')
const common = require('testing/common')

describe('encodingLength', () => {
  test('should use schema', () => {
    const schema = {
      a: common.makeType(),
    }

    const obj = {
      a: 1,
    }

    const context = {
      node: obj,
    }

    const expectedSize = 5

    schema.a.encodingLength.withArgs(obj.a, context).returns(expectedSize)
    common.plug(schema.a)

    expect(encodingLength(obj, schema)).toBe(expectedSize)
    expect(schema.a.encodingLength.callCount).toBe(1)
  })

  test('should support nested schemas', () => {
    const schema = {
      a: common.makeType(),
      b: {
        c: common.makeType(),
      },
    }

    const obj = {
      a: 1,
      b: {
        c: 15,
      },
    }

    const context = {
      node: obj,
    }

    const expectedSize = 5

    schema.a.encodingLength.withArgs(obj.a, context).returns(expectedSize)
    schema.b.c.encodingLength.withArgs(obj.b.c, context).returns(expectedSize)
    common.plug(schema.a)
    common.plug(schema.b.c)

    expect(encodingLength(obj, schema)).toBe(expectedSize * 2)
    expect(schema.a.encodingLength.callCount).toBe(1)
    expect(schema.b.c.encodingLength.callCount).toBe(1)
  })
})
