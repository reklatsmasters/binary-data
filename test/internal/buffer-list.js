const BufferList = require('internal/buffer-list')

test('append()', () => {
  const bl = new BufferList()
  const buf1 = Buffer.from([1, 2, 3, 4, 5])
  const buf2 = Buffer.from([6, 7, 8, 9])

  bl.append(buf1)
  expect(bl.length).toEqual(buf1.length)

  bl.append([buf1, buf2])
  expect(bl.length).toEqual(buf1.length * 2 + buf2.length)
})

test('consume(bytes)', () => {
  const bl = new BufferList()
  const buf1 = Buffer.from([1, 2, 3, 4, 5])
  const buf2 = Buffer.from([6, 7, 8, 9])

  bl.append([buf1, buf2])
  bl.consume(2)

  expect(bl.length).toEqual(buf1.length + buf2.length - 2)
  expect(bl.offset).toEqual(2)

  bl.consume(3)
  expect(bl.offset).toEqual(0)
  expect(bl.length).toEqual(buf2.length)
})

test('append() after consume()', () => {
  const bl = new BufferList()
  const buf1 = Buffer.from([1, 2, 3, 4, 5])
  const buf2 = Buffer.from([6, 7, 8, 9])

  bl.append(buf1)
  bl.consume(2)
  bl.append(buf2)

  expect(bl.offset).toEqual(0)
  expect(bl.length).toEqual(buf1.length + buf2.length - 2)
})

test('get(i)', () => {
  const bl = new BufferList()
  const buf1 = Buffer.from([1, 2, 3, 4, 5])
  const buf2 = Buffer.from([6, 7, 8, 9])

  bl.append([buf1, buf2])

  expect(bl.get(0)).toEqual(buf1[0])
  expect(bl.get(bl.length - 1)).toEqual(buf2[3])
  expect(bl.get(-1)).toEqual(buf2[3])
  expect(bl.get(bl.length + 1)).toEqual(buf1[1])

  bl.consume(2)

  expect(bl.get(0)).toEqual(buf1[2])
  expect(bl.get(bl.length - 1)).toEqual(buf2[3])
  expect(bl.get(-1)).toEqual(buf2[3])
  expect(bl.get(bl.length + 1)).toEqual(buf1[3])
})
