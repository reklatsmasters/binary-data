const when = require('types/when')
const select = require('types/select')

describe('select', () => {
  const defaultValue = 322
  const defaultBytes = 2

  const defaultType = {
    decode(r, meta) {
      meta.bytes += defaultBytes
      return defaultValue
    },
    encode() {}
  }

  const firstValue = 111
  const firstBytes = 3

  const firstType = {
    decode(r, meta) {
      meta.bytes += firstBytes
      return firstValue
    },
    encode() {}
  }

  const secondValue = 222
  const secondBytes = 4

  const secondType = {
    decode(r, meta) {
      meta.bytes += secondBytes
      return secondValue
    },
    encode() {}
  }

  test('decode first option', () => {
    const meta = {
      bytes: 0,
      context: {}
    }

    const type = select(when(() => true, firstType), when(() => false, secondType), defaultType)

    expect(type.decode({}, meta)).toEqual(firstValue)
    expect(meta.bytes).toEqual(firstBytes)
  })

  test('decode second option', () => {
    const meta = {
      bytes: 0,
      context: {}
    }

    const type = select(when(() => false, firstType), when(() => true, secondType), defaultType)

    expect(type.decode({}, meta)).toEqual(secondValue)
    expect(meta.bytes).toEqual(secondBytes)
  })

  test('decode default option', () => {
    const meta = {
      bytes: 0,
      context: {}
    }

    const type = select(when(() => false, firstType), when(() => false, secondType), defaultType)

    expect(type.decode({}, meta)).toEqual(defaultValue)
    expect(meta.bytes).toEqual(defaultBytes)
  })
})
