const binary = require('index')

describe('createDecodeStream', () => {
  test('should accept buffer as first argument', () => {
    const length = 2
    const buf = Buffer.allocUnsafe(length)

    const rstream = binary.createDecodeStream(buf)
    expect(rstream.length).toEqual(length)
    expect(rstream.readBuffer(length)).toBe(buf)
  })

  test('should not accept buffer as first argument', () => {
    expect(binary.createDecodeStream().length).toEqual(0)
    expect(binary.createDecodeStream({}).length).toEqual(0)
  })
})
