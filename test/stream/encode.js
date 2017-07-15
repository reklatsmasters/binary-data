const bl = require('bl')
const EncodeStream = require('lib/stream/encode')

test('should write an integer numbers and be a stream', done => {
  expect.assertions(8)

  const stream = new EncodeStream()

  stream.writeDoubleBE(12345.12)
  stream.writeFloatLE(50.99)
  stream.writeInt8(77)
  stream.writeUInt8(177)
  stream.writeInt16BE(1234)
  stream.writeUInt32LE(56789)

  expect(stream.length).toBe(8 + 4 + 1 + 1 + 2 + 4)

  stream.pipe(
    bl((err, data) => {
      expect(data.length).toBe(8 + 4 + 1 + 1 + 2 + 4)
      expect(data.readDoubleBE(0).toFixed(2)).toBe('12345.12')
      expect(data.readFloatLE(8).toFixed(2)).toBe('50.99')
      expect(data.readInt8(12)).toBe(77)
      expect(data.readUInt8(13)).toBe(177)
      expect(data.readInt16BE(14)).toBe(1234)
      expect(data.readUInt32LE(16)).toBe(56789)
    })
  )

  stream.once('end', () => {
    done()
  })
})
