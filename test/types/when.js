const sinon = require('sinon')
const when = require('types/when')
const common = require('testing/common')

describe('when', () => {
  const type = common.makeType()

  beforeEach(() => {
    common.reset(type)
  })

  test('encode positive', () => {
    const wstream = {}
    const value = 123
    const expectedStatus = true

    const context = {
      node: 1
    }

    const condition = sinon.stub()

    condition.withArgs(context).returns(expectedStatus)
    condition.throws('condition')

    type.encode.withArgs(value, wstream, context).returns(1)
    common.plug(type)

    const whenType = when(condition, type)
    whenType.encode(value, wstream, context)

    expect(condition.callCount).toEqual(1)
    expect(whenType.encode.status).toEqual(expectedStatus)
    expect(whenType.encode.bytes).toEqual(type.encode.bytes)
    expect(type.encode.callCount).toEqual(1)
  })

  test('encode negative', () => {
    const wstream = {}
    const value = 123
    const expectedStatus = false

    const context = {
      node: 1
    }

    const condition = sinon.stub()

    condition.withArgs(context).returns(expectedStatus)
    condition.throws('condition')

    type.encode.withArgs(value, wstream, context).returns(1)
    common.plug(type)

    const whenType = when(condition, type)
    whenType.encode(value, wstream, context)

    expect(condition.callCount).toEqual(1)
    expect(whenType.encode.status).toEqual(expectedStatus)
    expect(whenType.encode.bytes).toEqual(0)
    expect(type.encode.callCount).toEqual(0)
  })

  test('decode positive', () => {
    const rstream = {}

    const context = {
      node: 1
    }

    const expectedResult = 123
    const expectedStatus = true

    const condition = sinon.stub()

    condition.withArgs(context).returns(expectedStatus)
    condition.throws('condition')

    type.decode.withArgs(rstream).returns(expectedResult)
    common.plug(type)

    const whenType = when(condition, type)
    const result = whenType.decode.call(context, rstream)

    expect(result).toEqual(expectedResult)
    expect(condition.callCount).toEqual(1)
    expect(type.decode.callCount).toEqual(1)
    expect(whenType.decode.bytes).toEqual(type.decode.bytes)
    expect(whenType.decode.status).toEqual(expectedStatus)
  })

  test('decode negative', () => {
    const rstream = {}

    const context = {
      node: 1
    }

    const expectedResult = null
    const expectedStatus = false

    const condition = sinon.stub()

    condition.withArgs(context).returns(expectedStatus)
    condition.throws('condition')

    type.decode.withArgs(rstream).returns(123)
    common.plug(type)

    const whenType = when(condition, type)
    const result = whenType.decode.call(context, rstream)

    expect(result).toEqual(expectedResult)
    expect(condition.callCount).toEqual(1)
    expect(type.decode.callCount).toEqual(0)
    expect(whenType.decode.bytes).toEqual(0)
    expect(whenType.decode.status).toEqual(expectedStatus)
  })

  test('encodingLength positive', () => {
    const value = 123
    const bytes = 10

    type.encodingLength.withArgs(value).returns(bytes)
    common.plug(type)

    const whenType = when(() => true, type)
    expect(whenType.encodingLength(value)).toBe(bytes)
  })

  test('encodingLength negative', () => {
    const value = 123
    const bytes = 10

    type.encodingLength.withArgs(value).returns(bytes)
    common.plug(type)

    const whenType = when(() => false, type)
    expect(whenType.encodingLength(value)).toBe(bytes)
  })
})
