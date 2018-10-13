'use strict';

const { encodingLength } = require('lib/encoding-length');

describe('encodingLength', () => {
  test('should use schema', () => {
    const expectedSize = 5;

    const schema = {
      a: {
        encode() {},
        decode() {},
        encodingLength: jest.fn().mockImplementation(() => expectedSize),
      },
    };

    const obj = {
      a: 1,
    };

    expect(encodingLength(obj, schema)).toBe(expectedSize);
    expect(schema.a.encodingLength).toBeCalled();
  });

  test('should support nested schemas', () => {
    const expectedSize = 5;

    const schema = {
      a: {
        encode() {},
        decode() {},
        encodingLength: jest.fn().mockImplementation(() => expectedSize),
      },
      b: {
        c: {
          encode() {},
          decode() {},
          encodingLength: jest.fn().mockImplementation(() => expectedSize),
        },
      },
    };

    const obj = {
      a: 1,
      b: {
        c: 15,
      },
    };

    expect(encodingLength(obj, schema)).toBe(expectedSize * 2);
    expect(schema.a.encodingLength).toHaveBeenLastCalledWith(obj.a);
    expect(schema.b.c.encodingLength).toHaveBeenLastCalledWith(obj.b.c);
  });
});
