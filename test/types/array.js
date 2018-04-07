const array = require('types/array')

describe('array', () => {
  const wstream = {}
  const rstream = {}

  describe('fixed length', () => {
    describe('length is the number of items', () => {
      test('encode', () => {
        const itemBytes = 7
        const items = [10, 20]
        const wstream = {}

        const itemType = {
          decode() {},
          encode: jest.fn(),
        }

        itemType.encode.bytes = itemBytes

        const type = array(itemType, items.length)
        type.encode(items, wstream)

        expect(itemType.encode).toHaveBeenCalledTimes(items.length)
        expect(type.encode.bytes).toBe(itemBytes * items.length)
      })

      test('throws when length != items.length', () => {
        const items = [10, 20]
        const wstream = {}

        const itemType = {
          decode() {},
          encode: jest.fn(),
        }

        const requiredSize = items.length + 1
        const type = array(itemType, requiredSize)

        expect(() => type.encode(items, wstream)).toThrow(
          `Argument #1 required length ${requiredSize} instead of ${
            items.length
          }`
        )
      })

      test('decode', () => {
        const length = 2
        const bytes = 10

        const first = 1
        const second = 2
        const items = [first, second]

        const itemType = {
          decode() {
            return items.shift()
          },
          encode() {},
        }

        itemType.decode.bytes = bytes

        const type = array(itemType, length)

        expect(type.decode(rstream)).toEqual([first, second])
        expect(type.decode.bytes).toBe(bytes * length)
      })

      test('encodingLength', () => {
        const items = [10, 20]
        const bytes = 3

        const itemType = {
          encode() {},
          decode() {},
          encodingLength() {
            return bytes
          },
        }

        const type = array(itemType, items.length)

        expect(type.encodingLength(items)).toBe(items.length * bytes)
      })
    })

    describe('length is the number of bytes', () => {
      test('encode', () => {
        const bytes = 7
        const items = [10, 20]
        const length = bytes * items.length

        const itemType = {
          encode: jest.fn(),
          decode() {},
          encodingLength() {
            return bytes
          },
        }

        itemType.encode.bytes = bytes

        const type = array(itemType, length, 'bytes')
        type.encode(items, wstream)

        expect(itemType.encode).toHaveBeenCalledTimes(items.length)
        expect(type.encode.bytes).toBe(length)
      })

      test('decode', () => {
        const first = 1
        const second = 2
        const items = [first, second]

        const bytes = 3
        const length = bytes * items.length

        const meta = {
          bytes: 0,
          context: {},
        }

        const itemType = {
          decode() {
            return items.shift()
          },
          encode() {},
        }

        itemType.decode.bytes = bytes
        const type = array(itemType, length, 'bytes')

        expect(type.decode(rstream, meta)).toEqual([first, second])
        expect(type.decode.bytes).toBe(length)
      })

      test('encodingLength', () => {
        const items = [10, 20]
        const bytes = 3
        const length = items.length * bytes

        const itemType = {
          encode() {},
          decode() {},
          encodingLength() {
            return bytes
          },
        }

        const type = array(itemType, length, 'bytes')

        expect(type.encodingLength(items)).toBe(length)
      })
    })
  })

  describe('length is type', () => {
    describe('length is the number of items', () => {
      test('encode', () => {
        const items = [100, 200, 300]

        const lengthType = {
          decode() {},
          encode: jest.fn(),
        }

        lengthType.encode.bytes = 2

        const itemType = {
          decode() {},
          encode: jest.fn(),
        }

        itemType.encode.bytes = 3

        const type = array(itemType, lengthType)
        type.encode(items, wstream)

        expect(lengthType.encode).toHaveBeenCalledTimes(1)
        expect(lengthType.encode).toBeCalledWith(items.length, wstream)
        expect(itemType.encode).toHaveBeenCalledTimes(items.length)
        expect(type.encode.bytes).toBe(
          itemType.encode.bytes * items.length + lengthType.encode.bytes
        )
      })

      test('decode', () => {
        const first = 1
        const second = 2
        const items = [first, second]

        const length = items.length
        const itemBytes = 3
        const lengthBytes = 3

        const itemType = {
          decode() {
            return items.shift()
          },
          encode() {},
        }

        itemType.decode.bytes = itemBytes

        const lengthType = {
          decode() {
            return length
          },
          encode() {},
        }

        lengthType.decode.bytes = lengthBytes

        const type = array(itemType, lengthType)

        expect(type.decode(rstream)).toEqual([first, second])
        expect(type.decode.bytes).toBe(itemBytes * length + lengthBytes)
      })

      test('encodingLength', () => {
        const items = [10, 20]
        const itemBytes = 3
        const lengthBytes = 5

        const lengthType = {
          encode() {},
          decode() {},
          encodingLength() {
            return lengthBytes
          },
        }

        const itemType = {
          encode() {},
          decode() {},
          encodingLength() {
            return itemBytes
          },
        }

        const type = array(itemType, lengthType)

        expect(type.encodingLength(items)).toBe(
          items.length * itemBytes + lengthBytes
        )
      })
    })

    describe('length is the number of bytes', () => {
      test('encode', () => {
        const items = [100, 200, 300]
        const itemBytes = 4

        const lengthType = {
          decode() {},
          encode: jest.fn(),
        }

        lengthType.encode.bytes = 2

        const itemType = {
          decode() {},
          encode: jest.fn(),
          encodingLength() {
            return itemBytes
          },
        }

        itemType.encode.bytes = itemBytes

        const type = array(itemType, lengthType, 'bytes')
        type.encode(items, wstream)

        expect(lengthType.encode).toHaveBeenCalledTimes(1)
        expect(lengthType.encode).toBeCalledWith(
          items.length * itemBytes,
          wstream
        )
        expect(itemType.encode).toHaveBeenCalledTimes(items.length)
        expect(type.encode.bytes).toBe(
          itemBytes * items.length + lengthType.encode.bytes
        )
      })

      test('decode', () => {
        const first = 1
        const second = 2
        const items = [first, second]

        const length = items.length
        const itemBytes = 3
        const lengthBytes = 3

        const itemType = {
          decode() {
            return items.shift()
          },
          encode() {},
        }

        itemType.decode.bytes = itemBytes

        const lengthType = {
          decode() {
            return length * itemBytes
          },
          encode() {},
        }

        lengthType.decode.bytes = lengthBytes

        const type = array(itemType, lengthType, 'bytes')

        expect(type.decode(rstream)).toEqual([first, second])
        expect(type.decode.bytes).toBe(itemBytes * length + lengthBytes)
      })

      test('encodingLength', () => {
        const items = [10, 20]
        const itemBytes = 3
        const lengthBytes = 5

        const lengthType = {
          encode() {},
          decode() {},
          encodingLength() {
            return lengthBytes
          },
        }

        const itemType = {
          encode() {},
          decode() {},
          encodingLength() {
            return itemBytes
          },
        }

        const type = array(itemType, lengthType, 'bytes')

        expect(type.encodingLength(items)).toBe(
          items.length * itemBytes + lengthBytes
        )
      })
    })
  })

  describe('item is an user defined type', () => {
    test('encode', () => {
      const items = [{ a: 100 }, { a: 200 }, { a: 300 }]
      const itemBytes = 4

      const schema = {
        a: {
          encode: jest.fn(),
          decode() {},
        },
      }

      schema.a.encode.bytes = itemBytes

      const type = array(schema, items.length)
      type.encode(items, wstream)

      expect(schema.a.encode).toHaveBeenCalledTimes(items.length)
      expect(type.encode.bytes).toBe(itemBytes * items.length)
    })

    test('decode', () => {
      const firstItem = 1
      const secondItem = 2
      const items = [firstItem, secondItem]

      const length = items.length
      const itemBytes = 2

      const itemType = {
        decode() {
          return items.shift()
        },
        encode() {},
      }

      itemType.decode.bytes = itemBytes

      const schema = {
        a: itemType,
      }

      const type = array(schema, length)

      expect(type.decode(rstream)).toEqual([
        { a: firstItem },
        { a: secondItem },
      ])
      expect(type.decode.bytes).toBe(itemBytes * length)
    })

    test('encodingLength', () => {
      const itemBytes = 3
      const items = [{ a: 100 }, { a: 200 }, { a: 300 }]

      const schema = {
        a: {
          encode() {},
          decode() {},
          encodingLength() {
            return itemBytes
          },
        },
      }

      const type = array(schema, items.length)

      expect(type.encodingLength(items)).toBe(itemBytes * items.length)
    })
  })

  describe('length is function', () => {
    describe('length is the number of items', () => {
      test('decode', () => {
        const first = 1
        const second = 2
        const items = [first, second]

        const length = items.length
        const bytes = 3

        const itemType = {
          decode() {
            return items.shift()
          },
          encode() {},
        }

        itemType.decode.bytes = bytes
        const callback = jest.fn().mockImplementation(() => length)

        const type = array(itemType, callback)

        expect(type.decode(rstream)).toEqual([first, second])
        expect(callback).toHaveBeenCalledTimes(1)
        expect(type.decode.bytes).toBe(bytes * length)
      })

      test('encode', () => {
        const items = [100, 200, 300]
        const length = items.length
        const context = {}
        const bytes = 4

        const itemType = {
          decode() {},
          encode: jest.fn(),
        }

        itemType.encode.bytes = bytes

        const callback = jest.fn().mockImplementation(() => length)

        const type = array(itemType, callback)
        type.encode(items, wstream, context)

        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toBeCalledWith(context)
        expect(itemType.encode).toHaveBeenCalledTimes(items.length)
        expect(type.encode.bytes).toBe(bytes * items.length)
      })

      test('encodingLength', () => {
        const items = [10, 20]
        const bytes = 3

        const itemType = {
          encode() {},
          decode() {},
          encodingLength() {
            return bytes
          },
        }

        const type = array(itemType, () => {})

        expect(type.encodingLength(items)).toBe(items.length * bytes)
      })
    })

    describe('length is the number of bytes', () => {
      test('decode', () => {
        const first = 1
        const second = 2
        const items = [first, second]

        const bytes = 3
        const length = items.length

        const itemType = {
          decode() {
            return items.shift()
          },
          encode() {},
        }

        itemType.decode.bytes = bytes
        const callback = jest.fn().mockImplementation(() => length * bytes)

        const type = array(itemType, callback, 'bytes')

        expect(type.decode(rstream)).toEqual([first, second])
        expect(callback).toHaveBeenCalledTimes(1)
        expect(type.decode.bytes).toBe(length * bytes)
      })

      test('encode', () => {
        const items = [100, 200, 300]
        const context = {}

        const bytes = 4
        const length = items.length

        const callback = jest.fn().mockImplementation(() => length * bytes)

        const itemType = {
          decode() {},
          encode: jest.fn(),
          encodingLength() {
            return bytes
          },
        }

        itemType.encode.bytes = bytes

        const type = array(itemType, callback, 'bytes')
        type.encode(items, wstream, context)

        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toBeCalledWith(context)
        expect(itemType.encode).toHaveBeenCalledTimes(length)
        expect(type.encode.bytes).toBe(bytes * length)
      })

      test('encodingLength', () => {
        const items = [10, 20]
        const bytes = 3
        const length = items.length * bytes

        const itemType = {
          encode() {},
          decode() {},
          encodingLength() {
            return bytes
          },
        }

        const schema = array(itemType, () => {}, 'bytes')

        expect(schema.encodingLength(items)).toBe(length)
      })
    })
  })
})
