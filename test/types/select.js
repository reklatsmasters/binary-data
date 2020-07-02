'use strict';

const when = require('types/when');
const select = require('types/select');
const symbols = require('internal/symbols');

describe('select', () => {
  const defaultValue = 322;
  const defaultBytes = 2;

  const defaultType = {
    decode: () => defaultValue,
    encode: jest.fn().mockImplementation(() => {
      defaultType.encode.bytes = defaultBytes;
    }),
  };

  defaultType.decode.bytes = defaultBytes;

  const firstValue = 111;
  const firstBytes = 3;

  const firstType = {
    decode: () => firstValue,
    encode: jest.fn().mockImplementation(() => {
      firstType.encode.bytes = firstBytes;
    }),
  };

  firstType.decode.bytes = firstBytes;

  const secondValue = 222;
  const secondBytes = 4;

  const secondType = {
    decode: () => secondValue,
    encode: jest.fn().mockImplementation(() => {
      secondType.encode.bytes = secondBytes;
    }),
  };

  secondType.decode.bytes = secondBytes;

  test('decode first option', () => {
    const type = select(
      when(() => true, firstType),
      when(() => false, secondType),
      defaultType
    );

    expect(type.decode({})).toEqual(firstValue);
    expect(type.decode.bytes).toEqual(firstBytes);
    expect(type[symbols.skip]).toEqual(false);
  });

  test('decode second option', () => {
    const type = select(
      when(() => false, firstType),
      when(() => true, secondType),
      defaultType
    );

    expect(type.decode({})).toEqual(secondValue);
    expect(type.decode.bytes).toEqual(secondBytes);
    expect(type[symbols.skip]).toEqual(false);
  });

  test('decode default option', () => {
    const type = select(
      when(() => false, firstType),
      when(() => false, secondType),
      defaultType
    );

    expect(type.decode({})).toEqual(defaultValue);
    expect(type.decode.bytes).toEqual(defaultBytes);
    expect(type[symbols.skip]).toEqual(false);
  });

  test('skip after decode', () => {
    const type = select(
      when(() => false, firstType),
      when(() => false, secondType)
    );
    type.decode({});

    expect(type.decode({})).toBe(undefined);
    expect(type.decode.bytes).toEqual(0);
    expect(type[symbols.skip]).toEqual(true);
  });

  test('encode first option', () => {
    jest.clearAllMocks();
    const wstream = {};
    const context = {};

    const type = select(
      when(() => true, firstType),
      when(() => false, secondType),
      defaultType
    );

    type.encode({}, wstream, context);

    expect(type.encode.bytes).toEqual(firstBytes);
    expect(type[symbols.skip]).toEqual(false);
    expect(firstType.encode).toHaveBeenCalledTimes(1);
    expect(secondType.encode).toHaveBeenCalledTimes(0);
    expect(defaultType.encode).toHaveBeenCalledTimes(0);
  });

  test('encode second option', () => {
    jest.clearAllMocks();
    const wstream = {};
    const context = {};

    const type = select(
      when(() => false, firstType),
      when(() => true, secondType),
      defaultType
    );

    type.encode({}, wstream, context);

    expect(type.encode.bytes).toEqual(secondBytes);
    expect(type[symbols.skip]).toEqual(false);
    expect(firstType.encode).toHaveBeenCalledTimes(0);
    expect(secondType.encode).toHaveBeenCalledTimes(1);
    expect(defaultType.encode).toHaveBeenCalledTimes(0);
  });

  test('encode default option', () => {
    jest.clearAllMocks();
    const wstream = {};
    const context = {};

    const type = select(
      when(() => false, firstType),
      when(() => false, secondType),
      defaultType
    );

    type.encode({}, wstream, context);

    expect(type.encode.bytes).toEqual(defaultBytes);
    expect(type[symbols.skip]).toEqual(false);
    expect(firstType.encode).toHaveBeenCalledTimes(0);
    expect(secondType.encode).toHaveBeenCalledTimes(0);
    expect(defaultType.encode).toHaveBeenCalledTimes(1);
  });

  test('skip after encode', () => {
    jest.clearAllMocks();
    const wstream = {};
    const context = {};

    const type = select(
      when(() => false, firstType),
      when(() => false, secondType)
    );

    type.encode({}, wstream, context);

    expect(type.encode.bytes).toEqual(0);
    expect(type[symbols.skip]).toEqual(true);
    expect(firstType.encode).toHaveBeenCalledTimes(0);
    expect(secondType.encode).toHaveBeenCalledTimes(0);
    expect(defaultType.encode).toHaveBeenCalledTimes(0);
  });
});
