const sinon = require('sinon')
const types = require('lib/types/numbers')

describe('doublebe', () => {
  it('write', () => {
    const num = 8800555.3535
    const writeDoubleBE = sinon.stub()

    writeDoubleBE.withArgs(num).returns(1)
    writeDoubleBE.throws('writeDoubleBE')

    types.doublebe.encode(num, { writeDoubleBE })
    expect(writeDoubleBE.callCount).toEqual(1)
  })

  it('read', () => {
    const num = 8800555.3535
    const readDoubleBE = sinon.stub()
    readDoubleBE.returns(num)

    const result = types.doublebe.decode({ readDoubleBE })
    expect(readDoubleBE.callCount).toEqual(1)
    expect(result).toEqual(num)
  })
})

describe('doublele', () => {
  it('write', () => {
    const num = 8800555.3535
    const writeDoubleLE = sinon.stub()

    writeDoubleLE.withArgs(num).returns(1)
    writeDoubleLE.throws('writeDoubleLE')

    types.doublele.encode(num, { writeDoubleLE })
    expect(writeDoubleLE.callCount).toEqual(1)
  })

  it('read', () => {
    const num = 8800555.3535
    const readDoubleLE = sinon.stub()
    readDoubleLE.returns(num)

    const result = types.doublele.decode({ readDoubleLE })
    expect(readDoubleLE.callCount).toEqual(1)
    expect(result).toEqual(num)
  })
})
