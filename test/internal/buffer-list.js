'use strict';

const BufferList = require('internal/buffer-list');

test('append(Buffer)', () => {
  const bl = new BufferList();
  const buf1 = Buffer.from([1, 2, 3, 4, 5]);
  const buf2 = Buffer.from([6, 7, 8, 9]);

  bl.append(buf1);
  expect(bl.length).toEqual(buf1.length);

  bl.append([buf1, buf2]);
  expect(bl.length).toEqual(buf1.length * 2 + buf2.length);
});

test('append(BufferList)', () => {
  const bl = new BufferList();
  const src = new BufferList();
  const buf1 = Buffer.from([1, 2, 3, 4, 5]);
  const buf2 = Buffer.from([6, 7, 8, 9]);

  src.append([buf1, buf2]);

  bl.append(src);
  expect(bl.length).toEqual(buf1.length + buf2.length);

  bl.append(buf1);
  bl.append(src);
  expect(bl.length).toEqual(buf1.length * 3 + buf2.length * 2);
});

test('consume(bytes)', () => {
  const bl = new BufferList();
  const buf1 = Buffer.from([1, 2, 3, 4, 5]);
  const buf2 = Buffer.from([6, 7, 8, 9]);

  bl.append([buf1, buf2]);
  bl.consume(2);

  expect(bl.length).toEqual(buf1.length + buf2.length - 2);
  expect(bl.offset).toEqual(2);

  bl.consume(3);
  expect(bl.offset).toEqual(0);
  expect(bl.length).toEqual(buf2.length);
});

test('append() after consume()', () => {
  const bl = new BufferList();
  const buf1 = Buffer.from([1, 2, 3, 4, 5]);
  const buf2 = Buffer.from([6, 7, 8, 9]);

  bl.append(buf1);
  bl.consume(2);
  bl.append(buf2);

  expect(bl.offset).toEqual(0);
  expect(bl.length).toEqual(buf1.length + buf2.length - 2);
});

test('append(BufferList) after consume()', () => {
  const bl = new BufferList();

  const src1 = new BufferList();
  src1.append(Buffer.from([1, 2, 3, 4, 5]));

  const src2 = new BufferList();
  src2.append(Buffer.from([6, 7, 8, 9]));

  bl.append(src1);
  bl.consume(2);
  bl.append(src2);

  expect(bl.offset).toEqual(0);
  expect(bl.slice()).toEqual(Buffer.from([3, 4, 5, 6, 7, 8, 9]));
});

test('append consumed BufferList', () => {
  const bl = new BufferList();

  const src1 = new BufferList();
  src1.append(Buffer.from([1, 2, 3, 4, 5]));

  const src2 = new BufferList();
  src2.append(Buffer.from([6, 7, 8, 9]));
  src2.consume(2);

  bl.append(src1);
  bl.append(src2);

  expect(bl.offset).toEqual(0);
  expect(bl.slice()).toEqual(Buffer.from([1, 2, 3, 4, 5, 8, 9]));
});

test('get(i)', () => {
  const bl = new BufferList();
  const buf1 = Buffer.from([1, 2, 3, 4, 5]);
  const buf2 = Buffer.from([6, 7, 8, 9]);

  bl.append([buf1, buf2]);

  expect(bl.get(0)).toEqual(buf1[0]);
  expect(bl.get(bl.length - 1)).toEqual(buf2[3]);
  expect(bl.get(-1)).toEqual(buf2[3]);
  expect(bl.get(bl.length + 1)).toEqual(buf1[1]);

  bl.consume(2);

  expect(bl.get(0)).toEqual(buf1[2]);
  expect(bl.get(bl.length - 1)).toEqual(buf2[3]);
  expect(bl.get(-1)).toEqual(buf2[3]);
  expect(bl.get(bl.length + 1)).toEqual(buf1[3]);
});

test('indexOf(i)', () => {
  const bl = new BufferList();
  const buf1 = Buffer.from([1, 2, 3, 4, 5]);
  const buf2 = Buffer.from([6, 7, 8, 0]);

  bl.append([buf1, buf2]);

  expect(bl.indexOf(1)).toBe(0);
  expect(bl.indexOf(3)).toBe(2);
  expect(bl.indexOf(5)).toBe(4);
  expect(bl.indexOf(8)).toBe(7);
  expect(bl.indexOf(0)).toBe(8);

  bl.consume(2);
  expect(bl.indexOf(5)).toBe(2);
  expect(bl.indexOf(8)).toBe(5);
  expect(bl.indexOf(0)).toBe(6);

  expect(() => bl.indexOf(-1)).toThrow('Invalid argument 1');
  expect(() => bl.indexOf(300)).toThrow('Invalid argument 1');
  expect(() => bl.indexOf(null)).toThrow('Invalid argument 1');
});

test('indexOf(i, offset)', () => {
  const bl = new BufferList();
  const buf1 = Buffer.from([1, 2, 3, 4, 5]);
  const buf2 = Buffer.from([6, 7, 8, 9]);

  bl.append([buf1, buf2]);

  expect(bl.indexOf(3, 2)).toBe(2);
  expect(bl.indexOf(8, 2)).toBe(7);
  expect(bl.indexOf(8, 6)).toBe(7);
  expect(bl.indexOf(9, 2)).toBe(8);
  expect(bl.indexOf(9, 6)).toBe(8);

  bl.consume(2);
  expect(bl.indexOf(8, 2)).toBe(5);
  expect(bl.indexOf(8, 4)).toBe(5);
});

test('indexOf(i, offset) multiple', () => {
  const bl = new BufferList();
  const buf1 = Buffer.from([1, 2, 0, 4, 5]);
  const buf2 = Buffer.from([6, 7, 8, 0]);

  bl.append([buf1, buf2]);

  expect(bl.indexOf(0, 2)).toBe(2);
  expect(bl.indexOf(0, 6)).toBe(8);

  bl.consume(2);
  expect(bl.indexOf(0, 0)).toBe(0);
  expect(bl.indexOf(0, 4)).toBe(6);
});

test('indexOf() index - offset = -1', () => {
  const buf = Buffer.from([1, 2, 3, 4, 5, 6, 0, 7, 8, 9, 10, 64, 21, 0]);
  const bl = new BufferList();

  bl.append(buf);

  expect(bl.indexOf(0)).toBe(6);
  bl.consume(7);
  expect(bl.indexOf(0)).toBe(6);
});
