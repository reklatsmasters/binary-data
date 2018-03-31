const Buffer = require('buffer').Buffer
const EncodeStream = require('streams/encode')

const BufferMock = {
  alloc() {
    return this
  },

  allocUnsafe() {
    return this
  },

  writeDoubleBE: jest.fn(),
  writeDoubleLE: jest.fn(),
  writeFloatBE: jest.fn(),
  writeFloatLE: jest.fn(),
  writeInt8: jest.fn(),
  writeInt16BE: jest.fn(),
  writeInt16LE: jest.fn(),
  writeInt32BE: jest.fn(),
  writeInt32LE: jest.fn(),
  writeIntBE: jest.fn(),
  writeIntLE: jest.fn(),
  writeUInt8: jest.fn(),
  writeUInt16BE: jest.fn(),
  writeUInt16LE: jest.fn(),
  writeUInt32BE: jest.fn(),
  writeUInt32LE: jest.fn(),
  writeUIntBE: jest.fn(),
  writeUIntLE: jest.fn(),
}

const methods = [
  'writeDoubleBE',
  'writeDoubleLE',
  'writeFloatBE',
  'writeFloatLE',
  'writeInt8',
  'writeInt16BE',
  'writeInt16LE',
  'writeInt32BE',
  'writeInt32LE',
  'writeIntBE',
  'writeIntLE',
  'writeUInt8',
  'writeUInt16BE',
  'writeUInt16LE',
  'writeUInt32BE',
  'writeUInt32LE',
  'writeUIntBE',
  'writeUIntLE',
]

describe('encode', () => {
  const stream = new EncodeStream()
  stream.append = jest.fn()

  beforeAll(() => {
    global.Buffer = BufferMock
  })

  afterAll(() => {
    global.Buffer = Buffer
  })

  afterEach(() => {
    stream.append.mockClear()

    BufferMock.writeDoubleBE.mockClear()
    BufferMock.writeDoubleLE.mockClear()
    BufferMock.writeFloatBE.mockClear()
    BufferMock.writeFloatLE.mockClear()
    BufferMock.writeInt8.mockClear()
    BufferMock.writeInt16BE.mockClear()
    BufferMock.writeInt16LE.mockClear()
    BufferMock.writeInt32BE.mockClear()
    BufferMock.writeInt32LE.mockClear()
    BufferMock.writeIntBE.mockClear()
    BufferMock.writeIntLE.mockClear()
    BufferMock.writeUInt8.mockClear()
    BufferMock.writeUInt16BE.mockClear()
    BufferMock.writeUInt16LE.mockClear()
    BufferMock.writeUInt32BE.mockClear()
    BufferMock.writeUInt32LE.mockClear()
    BufferMock.writeUIntBE.mockClear()
    BufferMock.writeUIntLE.mockClear()
  })

  for (const method of methods) {
    test(method, () => {
      stream[method]()
      expect(BufferMock[method]).toBeCalled()
      expect(stream.append).toBeCalledWith(BufferMock)
    })
  }
})
