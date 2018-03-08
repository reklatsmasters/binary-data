const bl = require('bl')
const DecodeStream = require('streams/decode')

describe('decode', () => {
  test('readBuffer', () => {
    const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6])
    const stream = new DecodeStream(buf)
    expect(stream.length).toBe(buf.length)

    const wantRead = 2

    const result = stream.readBuffer(wantRead)
    expect(stream.length).toBe(buf.length - wantRead)
    expect(result).toEqual(Buffer.from([0x1, 0x2]))
  })

  test('readBuffer # out of bounds', () => {
    const buf = Buffer.from([0x1, 0x2])
    const stream = new DecodeStream(buf)

    const requestedBytes = buf.length + 1

    expect(() => stream.readBuffer(requestedBytes)).toThrow(
      `Not enough data: requested ${requestedBytes} bytes but only ${buf.length} available.`
    )
  })

  test('default numbers', () => {
    const suites = [
      /* type, size, test value */
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
    ]

    const buf = Buffer.allocUnsafe(10)

    for (const suite of suites) {
      const read = 'read' + suite[0]
      const write = 'write' + suite[0]

      buf.fill(0)
      buf[write](suite[2], 0)
      const stream = new DecodeStream(buf)

      expect(stream[read]()).toBe(suite[2])
      expect(stream.length).toBe(buf.length - suite[1])
    }
  })

  test('custom numbers', () => {
    const suites = [
      /* type, size, test value */
      ['IntBE', 3, 0x7fffff - 1],
      ['UIntBE', 3, 0xffffff - 1],

      ['IntLE', 3, 0x7fffff - 1],
      ['UIntLE', 3, 0xffffff - 1],
    ]

    const buf = Buffer.allocUnsafe(5)

    for (const suite of suites) {
      const read = 'read' + suite[0]
      const write = 'write' + suite[0]

      buf.fill(0)
      buf[write](suite[2], 0, suite[1])
      const stream = new DecodeStream(buf)

      expect(stream[read](suite[1])).toBe(suite[2])
      expect(stream.length).toBe(buf.length - suite[1])
    }
  })

  test('should support pipes', done => {
    expect.assertions(4)

    const stream = new DecodeStream()
    stream.append(Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6]))

    expect(stream.readUInt32LE()).toBe(0x04030201)
    expect(stream.length).toBe(2)

    stream.pipe(
      bl((err, data) => {
        expect(data.length).toBe(2)
        expect(data.readUInt16BE(0)).toBe(0x0506)
      })
    )

    stream.once('end', () => {
      done()
    })
  })
})
