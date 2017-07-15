// TODO: refactor this for corect coverage report

function createEncode(method, size) {
  function encode(value, wstream) {
    wstream[method](value, size)
  }

  encode.bytes = size
  return encode
}

function createDecode(method, size) {
  function decode(rstream) {
    return rstream[method](size)
  }

  decode.bytes = size
  return decode
}

function createLength(size) {
  return function encodingLength() {
    return size
  }
}

/* general types */

exports.doublebe = {
  encode: createEncode('writeDoubleBE', 8),
  decode: createDecode('readDoubleBE', 8),
  encodingLength: createLength(8),
}

exports.doublele = {
  encode: createEncode('writeDoubleLE', 8),
  decode: createDecode('readDoubleLE', 8),
  encodingLength: createLength(8),
}

exports.floatbe = {
  encode: createEncode('writeFloatBE', 4),
  decode: createDecode('readFloatBE', 4),
  encodingLength: createLength(4),
}

exports.floatle = {
  encode: createEncode('writeFloatLE', 4),
  decode: createDecode('readFloatLE', 4),
  encodingLength: createLength(4),
}

exports.int8 = {
  encode: createEncode('writeInt8', 1),
  decode: createDecode('readInt8', 1),
  encodingLength: createLength(1),
}

exports.uint8 = {
  encode: createEncode('writeUInt8', 1),
  decode: createDecode('readUInt8', 1),
  encodingLength: createLength(1),
}

exports.int16be = {
  encode: createEncode('writeInt16BE', 2),
  decode: createDecode('readInt16BE', 2),
  encodingLength: createLength(2),
}

exports.uint16be = {
  encode: createEncode('writeUInt16BE', 2),
  decode: createDecode('readUInt16BE', 2),
  encodingLength: createLength(2),
}

exports.int16le = {
  encode: createEncode('writeInt16LE', 2),
  decode: createDecode('readInt16LE', 2),
  encodingLength: createLength(2),
}

exports.uint16le = {
  encode: createEncode('writeUInt16LE', 2),
  decode: createDecode('readUInt16LE', 2),
  encodingLength: createLength(2),
}

exports.int32be = {
  encode: createEncode('writeInt32BE', 4),
  decode: createDecode('readInt32BE', 4),
  encodingLength: createLength(4),
}

exports.uint32be = {
  encode: createEncode('writeUInt32BE', 4),
  decode: createDecode('readUInt32BE', 4),
  encodingLength: createLength(4),
}

exports.int32le = {
  encode: createEncode('writeInt32LE', 4),
  decode: createDecode('readInt32LE', 4),
  encodingLength: createLength(4),
}

exports.uint32le = {
  encode: createEncode('writeUInt32LE', 4),
  decode: createDecode('readUInt32LE', 4),
  encodingLength: createLength(4),
}

/* secondary types */

exports.int24be = {
  encode: createEncode('writeIntBE', 3),
  decode: createDecode('readIntBE', 3),
  encodingLength: createLength(3),
}

exports.uint24be = {
  encode: createEncode('writeUIntBE', 3),
  decode: createDecode('readUIntBE', 3),
  encodingLength: createLength(3),
}

exports.int24le = {
  encode: createEncode('writeIntLE', 3),
  decode: createDecode('readIntLE', 3),
  encodingLength: createLength(3),
}

exports.uint24le = {
  encode: createEncode('writeUIntLE', 3),
  decode: createDecode('readUIntLE', 3),
  encodingLength: createLength(3),
}

exports.int40be = {
  encode: createEncode('writeIntBE', 5),
  decode: createDecode('readIntBE', 5),
  encodingLength: createLength(5),
}

exports.uint40be = {
  encode: createEncode('writeUIntBE', 5),
  decode: createDecode('readUIntBE', 5),
  encodingLength: createLength(5),
}

exports.int40le = {
  encode: createEncode('writeIntLE', 5),
  decode: createDecode('readIntLE', 5),
  encodingLength: createLength(5),
}

exports.uint40le = {
  encode: createEncode('writeUIntLE', 5),
  decode: createDecode('readUIntLE', 5),
  encodingLength: createLength(5),
}

exports.int48be = {
  encode: createEncode('writeIntBE', 6),
  decode: createDecode('readIntBE', 6),
  encodingLength: createLength(6),
}

exports.uint48be = {
  encode: createEncode('writeUIntBE', 6),
  decode: createDecode('readUIntBE', 6),
  encodingLength: createLength(6),
}

exports.int48le = {
  encode: createEncode('writeIntLE', 6),
  decode: createDecode('readIntLE', 6),
  encodingLength: createLength(6),
}

exports.uint48le = {
  encode: createEncode('writeUIntLE', 6),
  decode: createDecode('readUIntLE', 6),
  encodingLength: createLength(6),
}
