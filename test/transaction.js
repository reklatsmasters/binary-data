'use strict';

const DecodeStream = require('streams/decode');
const Transaction = require('lib/transaction');
const NotEnoughDataError = require('lib/not-enough-data-error');

test('shoud work', () => {
  const stream = new DecodeStream();

  stream.buffer.writeUInt8(10);
  stream.buffer.writeUInt16BE(111);
  stream.buffer.writeUInt32BE(1e5);

  const size = stream.length;
  const bytes = 1 + 2 + 4;

  const transaction = new Transaction(stream);
  expect(transaction.length).toEqual(size);

  expect(transaction.readUInt8()).toEqual(10);
  expect(transaction.readUInt16BE()).toEqual(111);
  expect(transaction.readUInt32BE()).toEqual(1e5);

  expect(stream.length).toEqual(size);
  expect(transaction.length).toEqual(size);

  transaction.commit();
  expect(stream.length).toEqual(size - bytes);
});

test('should read buffer', () => {
  const stream = new DecodeStream();
  const transaction = new Transaction(stream);

  stream.append(Buffer.from([1, 2, 3, 4]));
  stream.append(Buffer.from([5, 6, 7, 8, 9]));

  const size = stream.length;
  expect(transaction.length).toEqual(size);

  expect(transaction.readBuffer(3)).toEqual(Buffer.from([1, 2, 3]));
  expect(transaction.get(0)).toEqual(4);
  expect(transaction.readBuffer(5)).toEqual(Buffer.from([4, 5, 6, 7, 8]));

  expect(stream.length).toEqual(size);
  expect(transaction.length).toEqual(size);

  transaction.commit();
  expect(stream.length).toEqual(size - 8);
});

test('should have `bl` methods', () => {
  const stream = new DecodeStream();
  const transaction = new Transaction(stream);
  const buffer = Buffer.from([1, 2, 3, 4]);

  transaction.append(buffer);
  expect(stream.length).toEqual(buffer.length);

  expect(transaction.slice(0, 2)).toEqual(buffer.slice(0, 2));
  expect(transaction.toString('hex')).toEqual(buffer.toString('hex'));
});

test('should emit NotEnoughDataError', () => {
  const stream = new DecodeStream();
  const transaction = new Transaction(stream);

  expect(() => transaction.readUIntBE(2)).toThrowError(NotEnoughDataError);

  transaction.append(Buffer.alloc(2));
  expect(() => transaction.readBuffer(3)).toThrowError(NotEnoughDataError);
});
