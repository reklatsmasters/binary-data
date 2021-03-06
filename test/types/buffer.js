'use strict';

const buffer = require('types/buffer');
const BinaryStream = require('lib/binary-stream');

describe('buffer', () => {
  describe('argument `length` is number', () => {
    test('encode', () => {
      const writeBuffer = jest.fn();
      const wstream = {
        writeBuffer,
      };

      const length = 2;
      const buf = Buffer.allocUnsafe(length);

      const type = buffer(length);

      type.encode(buf, wstream);

      expect(writeBuffer).toHaveBeenCalledTimes(1);
      expect(writeBuffer).toBeCalledWith(buf);
      expect(type.encode.bytes).toBe(length);
    });

    test('should not encode large buffer', () => {
      const length = 2;

      const wstream = {};

      const buf = Buffer.allocUnsafe(length + 1);
      const type = buffer(length);

      expect(() => type.encode(buf, wstream)).toThrow(
        `Buffer required length ${length} instead of ${buf.length}`
      );
    });

    test('decode', () => {
      const length = 2;
      const buf = Buffer.allocUnsafe(length);

      const readBuffer = jest.fn().mockImplementation(() => buf);
      const rstream = {
        readBuffer,
      };

      const type = buffer(length);

      expect(type.decode(rstream)).toBe(buf);
      expect(readBuffer).toHaveBeenCalledTimes(1);
      expect(readBuffer).toBeCalledWith(length);
      expect(type.decode.bytes).toBe(length);
    });

    test('encodingLength', () => {
      const length = 2;

      const type = buffer(length);
      expect(type.encodingLength(Buffer.alloc(0))).toBe(length);
    });
  });

  describe('argument `length` is type', () => {
    test('encode', () => {
      const writeBuffer = jest.fn();
      const wstream = {
        writeBuffer,
      };

      const length = 2;
      const lengthBytes = 3;
      const buf = Buffer.allocUnsafe(length);

      const lengthType = {
        decode() {},
        encode: jest.fn().mockImplementation(() => {
          lengthType.encode.bytes = lengthBytes;
        }),
      };

      const type = buffer(lengthType);
      type.encode(buf, wstream);

      expect(lengthType.encode).toHaveBeenCalledTimes(1);
      expect(lengthType.encode).toBeCalledWith(length, wstream);
      expect(writeBuffer).toHaveBeenCalledTimes(1);
      expect(writeBuffer).toBeCalledWith(buf);
      expect(type.encode.bytes).toBe(length + lengthBytes);
    });

    test('decode', () => {
      const length = 2;
      const buf = Buffer.allocUnsafe(length);

      const readBuffer = jest.fn().mockImplementation(() => buf);
      const lengthBytes = 5;

      const rstream = {
        readBuffer,
      };

      const lengthType = {
        decode: () => length,
        encode() {},
      };

      lengthType.decode.bytes = lengthBytes;

      const type = buffer(lengthType);

      expect(type.decode(rstream)).toBe(buf);
      expect(readBuffer).toHaveBeenCalledTimes(1);
      expect(readBuffer).toBeCalledWith(length);
      expect(type.decode.bytes).toBe(buf.length + lengthBytes);
    });

    test('encodingLength', () => {
      const length = 5;
      const typeLength = 2;
      const buf = Buffer.allocUnsafe(length);

      const lengthType = {
        encode() {},
        decode() {},
        encodingLength() {
          return typeLength;
        },
      };

      const type = buffer(lengthType);

      expect(type.encodingLength(buf)).toBe(typeLength + length);
    });
  });

  describe('argument `length` is function', () => {
    test('decode', () => {
      const length = 2;
      const buf = Buffer.allocUnsafe(length);

      const readBuffer = jest.fn().mockImplementation(() => buf);

      const rstream = {
        readBuffer,
      };

      const callback = jest.fn().mockImplementation(() => length);
      const type = buffer(callback);

      expect(type.decode(rstream)).toBe(buf);
      expect(readBuffer).toHaveBeenCalledTimes(1);
      expect(readBuffer).toBeCalledWith(length);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(type.decode.bytes).toBe(length);
    });

    test('encode', () => {
      const writeBuffer = jest.fn();

      const wstream = {
        writeBuffer,
      };

      const length = 2;
      const buf = Buffer.allocUnsafe(length);

      const callback = jest.fn().mockImplementation(() => length);
      const type = buffer(callback);

      type.encode(buf, wstream);

      expect(writeBuffer).toHaveBeenCalledTimes(1);
      expect(writeBuffer).toBeCalledWith(buf);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(type.encode.bytes).toBe(length);
    });

    test('encodingLength', () => {
      const length = 5;

      const type = buffer(() => length * 2);
      expect(type.encodingLength(Buffer.alloc(length))).toBe(length);
    });
  });

  describe('argument `length` is null', () => {
    test('decode', () => {
      const buf = Buffer.from([1, 2, 3, 4, 5, 0, 5, 6, 7, 8]);
      const length = buf.indexOf(0);
      const expected = buf.slice(0, length);

      const rstream = {
        readBuffer: jest.fn().mockImplementation(size => buf.slice(0, size)),
        indexOf: jest.fn().mockImplementation(byte => buf.indexOf(byte)),
        consume: jest.fn(),
      };

      const type = buffer(null);

      expect(type.decode(rstream)).toEqual(expected);
      expect(type.decode.bytes).toEqual(length + 1);
    });

    test('encode', () => {
      const buf = Buffer.from([1, 2, 3, 4, 5]);
      const writeBuffer = jest.fn();
      const writeUInt8 = jest.fn();
      const wstream = {
        writeBuffer,
        writeUInt8,
      };

      const type = buffer(null);

      type.encode(buf, wstream);

      expect(writeBuffer).toHaveBeenCalledTimes(1);
      expect(writeBuffer).toBeCalledWith(buf);
      expect(writeUInt8).toHaveBeenCalledTimes(1);
      expect(writeUInt8).toBeCalledWith(0);
      expect(type.encode.bytes).toBe(buf.length + 1);
    });

    test('encodingLength', () => {
      const buf = Buffer.from([1, 2, 3, 4, 5]);
      const type = buffer(null);

      expect(type.encodingLength(buf)).toBe(buf.length + 1);
    });
  });

  test('should be able to encode BinaryStream', () => {
    jest.unmock('lib/binary-stream');

    const buf = new BinaryStream();
    buf.writeBuffer(Buffer.from([1, 2]));
    buf.writeBuffer(Buffer.from([3, 4]));

    const wstream = new BinaryStream();
    const type = buffer(null);

    type.encode(buf, wstream);

    expect(wstream.slice()).toEqual(Buffer.from([1, 2, 3, 4, 0]));
    expect(type.encode.bytes).toBe(buf.length + 1);
  });
});
