const bl = require('bl')
const sinon = require('sinon')
const EncodeStream = require('streams/encode')

describe('encode', () => {
  const expectedNumber = 322
  const mockBuffer = sinon.mock(Buffer.prototype)

  afterEach(() => {
    mockBuffer.restore()
  })

  test('writeDoubleBE', () => {
    mockBuffer.expects('writeDoubleBE').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeDoubleBE(expectedNumber)

    mockBuffer.verify()
  })

  test('writeDoubleLE', () => {
    mockBuffer.expects('writeDoubleLE').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeDoubleLE(expectedNumber)

    mockBuffer.verify()
  })

  test('writeFloatBE', () => {
    mockBuffer.expects('writeFloatBE').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeFloatBE(expectedNumber)

    mockBuffer.verify()
  })

  test('writeFloatLE', () => {
    mockBuffer.expects('writeFloatLE').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeFloatLE(expectedNumber)

    mockBuffer.verify()
  })

  test('writeInt8', () => {
    mockBuffer.expects('writeInt8').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeInt8(expectedNumber)

    mockBuffer.verify()
  })

  test('writeUInt8', () => {
    mockBuffer.expects('writeUInt8').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeUInt8(expectedNumber)

    mockBuffer.verify()
  })

  test('writeInt16BE', () => {
    mockBuffer.expects('writeInt16BE').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeInt16BE(expectedNumber)

    mockBuffer.verify()
  })

  test('writeInt16LE', () => {
    mockBuffer.expects('writeInt16LE').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeInt16LE(expectedNumber)

    mockBuffer.verify()
  })

  test('writeInt32BE', () => {
    mockBuffer.expects('writeInt32BE').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeInt32BE(expectedNumber)

    mockBuffer.verify()
  })

  test('writeInt32LE', () => {
    mockBuffer.expects('writeInt32LE').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeInt32LE(expectedNumber)

    mockBuffer.verify()
  })

  test('writeUInt16BE', () => {
    mockBuffer.expects('writeUInt16BE').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeUInt16BE(expectedNumber)

    mockBuffer.verify()
  })

  test('writeUInt16LE', () => {
    mockBuffer.expects('writeUInt16LE').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeUInt16LE(expectedNumber)

    mockBuffer.verify()
  })

  test('writeUInt32BE', () => {
    mockBuffer.expects('writeUInt32BE').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeUInt32BE(expectedNumber)

    mockBuffer.verify()
  })

  test('writeUInt32LE', () => {
    mockBuffer.expects('writeUInt32LE').once().withExactArgs(expectedNumber, 0)

    const stream = new EncodeStream()
    stream.writeUInt32LE(expectedNumber)

    mockBuffer.verify()
  })

  test('writeIntBE', () => {
    mockBuffer.expects('writeIntBE').once().withExactArgs(expectedNumber, 0, 3)

    const stream = new EncodeStream()
    stream.writeIntBE(expectedNumber, 3)

    mockBuffer.verify()
  })

  test('writeIntLE', () => {
    mockBuffer.expects('writeIntLE').once().withExactArgs(expectedNumber, 0, 3)

    const stream = new EncodeStream()
    stream.writeIntLE(expectedNumber, 3)

    mockBuffer.verify()
  })

  test('writeUIntBE', () => {
    mockBuffer.expects('writeUIntBE').once().withExactArgs(expectedNumber, 0, 3)

    const stream = new EncodeStream()
    stream.writeUIntBE(expectedNumber, 3)

    mockBuffer.verify()
  })

  test('writeUIntLE', () => {
    mockBuffer.expects('writeUIntLE').once().withExactArgs(expectedNumber, 0, 3)

    const stream = new EncodeStream()
    stream.writeUIntLE(expectedNumber, 3)

    mockBuffer.verify()
  })
})
