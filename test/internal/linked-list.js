'use strict';

const LinkedList = require('internal/linked-list');

test('push(buf)', () => {
  const buf1 = Buffer.from([1, 2, 3, 4, 5]);
  const buf2 = Buffer.from([6, 7, 8, 9, 10]);
  const list = new LinkedList();

  list.push(buf1);
  list.push(buf2);

  expect(list.length).toEqual(buf1.length + buf2.length);
  expect(list.count).toEqual(2);
  expect(list.first).toEqual(buf1);
  expect(list.last).toEqual(buf2);
  expect(list.head.next).toEqual(list.tail);
});

test('unshift(buf)', () => {
  const buf1 = Buffer.from([1, 2, 3, 4, 5]);
  const buf2 = Buffer.from([6, 7, 8, 9, 10]);
  const list = new LinkedList();

  list.unshift(buf1);
  list.unshift(buf2);

  expect(list.length).toEqual(buf1.length + buf2.length);
  expect(list.count).toEqual(2);
  expect(list.first).toEqual(buf2);
  expect(list.last).toEqual(buf1);
  expect(list.head.next).toEqual(list.tail);
});

test('shift(buf)', () => {
  const buf1 = Buffer.from([1, 2, 3, 4, 5]);
  const buf2 = Buffer.from([6, 7, 8, 9, 10]);
  const list = new LinkedList();

  list.push(buf1);
  list.push(buf2);

  expect(list.shift()).toEqual(buf1);
  expect(list.count).toEqual(1);
  expect(list.length).toEqual(buf2.length);
  expect(list.first).toEqual(buf2);
  expect(list.last).toEqual(buf2);

  expect(list.shift()).toEqual(buf2);
  expect(list.count).toEqual(0);
  expect(list.length).toEqual(0);
  expect(list.first).toEqual(null);
  expect(list.last).toEqual(null);
});

test('slice() the whole chunk', () => {
  const list = new LinkedList();
  const buf1 = Buffer.from([1, 2, 3, 4]);
  const buf2 = Buffer.from([5, 6, 7, 8]);
  const buf3 = Buffer.from([9, 10, 11, 12]);

  list.push(buf1);
  list.push(buf2);
  list.push(buf3);

  const sublist = list.slice(0, buf1.length);
  expect(sublist.length).toEqual(buf1.length);
  expect(sublist.count).toEqual(1);
  expect(sublist.first).toBe(buf1);
  expect(sublist.last).toBe(buf1);
});

test('slice() first subset of a chunk', () => {
  const list = new LinkedList();
  const buf1 = Buffer.from([1, 2, 3, 4]);
  const buf2 = Buffer.from([5, 6, 7, 8]);
  const buf3 = Buffer.from([9, 10, 11, 12]);

  list.push(buf1);
  list.push(buf2);
  list.push(buf3);

  const length = buf2.length - 1;
  const sublist = list.slice(buf1.length, buf1.length + length);

  expect(sublist.length).toEqual(length);
  expect(sublist.count).toEqual(1);
  expect(sublist.first).toEqual(buf2.slice(0, length));
  expect(sublist.last).toEqual(buf2.slice(0, length));
});

test('slice() last subset of a chunk', () => {
  const list = new LinkedList();
  const buf1 = Buffer.from([1, 2, 3, 4]);
  const buf2 = Buffer.from([5, 6, 7, 8]);
  const buf3 = Buffer.from([9, 10, 11, 12]);

  list.push(buf1);
  list.push(buf2);
  list.push(buf3);

  const length = buf2.length - 1;
  const start = buf1.length + 1;
  const sublist = list.slice(start, start + length);

  expect(sublist.length).toEqual(length);
  expect(sublist.count).toEqual(1);
  expect(sublist.first).toEqual(buf2.slice(1, buf2.length));
  expect(sublist.last).toEqual(buf2.slice(1, buf2.length));
});

test('slice() multiple chunks by borders', () => {
  const list = new LinkedList();
  const buf1 = Buffer.from([1, 2, 3, 4]);
  const buf2 = Buffer.from([5, 6, 7, 8]);
  const buf3 = Buffer.from([9, 10, 11, 12]);

  list.push(buf1);
  list.push(buf2);
  list.push(buf3);

  const length = buf1.length + buf2.length;
  const sublist = list.slice(0, length);

  expect(sublist.length).toEqual(length);
  expect(sublist.count).toEqual(2);
  expect(sublist.first).toBe(buf1);
  expect(sublist.last).toBe(buf2);
});

test('slice() subset of multiple chunks', () => {
  const list = new LinkedList();
  const buf1 = Buffer.from([1, 2, 3, 4]);
  const buf2 = Buffer.from([5, 6, 7, 8]);
  const buf3 = Buffer.from([9, 10, 11, 12]);

  list.push(buf1);
  list.push(buf2);
  list.push(buf3);

  const length = 4;
  const start = 2;
  const sublist = list.slice(start, start + length);

  expect(sublist.length).toEqual(length);
  expect(sublist.count).toEqual(2);
  expect(sublist.first).toEqual(buf1.slice(2));
  expect(sublist.last).toEqual(buf2.slice(0, 2));
});

test('slice() subset of multiple chunks with the whole chunk', () => {
  const list = new LinkedList();
  const buf1 = Buffer.from([1, 2, 3, 4]);
  const buf2 = Buffer.from([5, 6, 7, 8]);
  const buf3 = Buffer.from([9, 10, 11, 12]);

  list.push(buf1);
  list.push(buf2);
  list.push(buf3);

  const length = 8;
  const start = 2;
  const sublist = list.slice(start, start + length);

  expect(sublist.length).toEqual(length);
  expect(sublist.count).toEqual(3);
  expect(sublist.first).toEqual(buf1.slice(2));
  expect(sublist.head.next.buffer).toBe(buf2);
  expect(sublist.last).toEqual(buf3.slice(0, 2));
});

test('slice() duplicate', () => {
  const list = new LinkedList();
  const buf1 = Buffer.from([1, 2]);
  const buf2 = Buffer.from([5, 6, 7]);
  const buf3 = Buffer.from([9, 10, 11, 12]);

  list.push(buf1);
  list.push(buf2);
  list.push(buf3);

  const length = buf1.length + buf2.length + buf3.length;
  const sublist = list.slice(0, length);

  expect(sublist.length).toEqual(list.length);
  expect(sublist.count).toEqual(list.count);
  expect(sublist.first).toBe(list.first);
  expect(sublist.head.next.buffer).toBe(buf2);
  expect(sublist.last).toBe(list.last);
});
