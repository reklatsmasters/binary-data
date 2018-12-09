'use strict';

const BinaryStream = require('lib/binary-stream');

describe('encode fixed', () => {
  const suites = [
    /* Type, size, test value */
    ['DoubleBE', 8, Number.MAX_SAFE_INTEGER / 2],
    ['DoubleLE', 8, Number.MAX_SAFE_INTEGER / 2],

    ['FloatBE', 4, 0.5],
    ['FloatLE', 4, 0.5],

    ['Int8', 1, 127],
    ['UInt8', 1, 255],

    ['Int16BE', 2, 0x7fff - 1],
    ['Int16LE', 2, 0x7fff - 1],

    ['UInt16BE', 2, 0xffff - 1],
    ['UInt16LE', 2, 0xffff - 1],

    ['Int32BE', 4, 0x7fffffff - 1],
    ['Int32LE', 4, 0x7fffffff - 1],

    ['UInt32BE', 4, 0xffffffff - 1],
    ['UInt32LE', 4, 0xffffffff - 1],
  ];

  for (const suite of suites) {
    const method = `write${suite[0]}`;
    const read = `read${suite[0]}`;

    // eslint-disable-next-line no-loop-func
    test(method, () => {
      const stream = new BinaryStream();
      stream[method](suite[2]);
      const buf = stream.slice();

      expect(stream.length).toBe(suite[1]);
      expect(buf[read](0)).toBe(suite[2]);
    });
  }
});

describe('encode custom', () => {
  const suites = [
    /* Type, size, test value */
    ['IntBE', 3, 0x7fffff - 1],
    ['UIntBE', 3, 0xffffff - 1],

    ['IntLE', 3, 0x7fffff - 1],
    ['UIntLE', 3, 0xffffff - 1],
  ];

  for (const suite of suites) {
    const method = `write${suite[0]}`;
    const read = `read${suite[0]}`;

    // eslint-disable-next-line no-loop-func
    test(method, () => {
      const stream = new BinaryStream();
      stream[method](suite[2], suite[1]);
      const buf = stream.slice();

      expect(stream.length).toBe(suite[1]);
      expect(buf[read](0, suite[1])).toBe(suite[2]);
    });
  }
});
