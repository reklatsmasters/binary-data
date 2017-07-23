# binary-data

[![Build Status](https://travis-ci.org/reklatsmasters/binary-data.svg?branch=master)](https://travis-ci.org/reklatsmasters/binary-data)
[![npm](https://img.shields.io/npm/v/binary-data.svg)](https://npmjs.org/package/binary-data)
[![node](https://img.shields.io/node/v/binary-data.svg)](https://npmjs.org/package/binary-data)
[![license](https://img.shields.io/npm/l/binary-data.svg)](https://npmjs.org/package/binary-data)
[![downloads](https://img.shields.io/npm/dm/binary-data.svg)](https://npmjs.org/package/binary-data)

Declarative encoder/decoder of various binary data.

## Usage

```js
const { decode, createDecodeStream, types: { uint8, array, string } } = require('binary-data')

const protocol = {
  type: uint8,
  value: array(string(null), uint8)
}

socket.on('message', (msg) => {
  const rstream = createDecodeStream(msg)

  const packet = decode(rstream, protocol)
})
```

See [stun](https://github.com/reklatsmasters/stun) module for complete example.

## API

#### `decode(rstream: DecodeStream, type: PrimitiveType|Object): any`

#### `encode(item: any, wstream: EncodeStream, type: PrimitiveType|Object): void`

#### `encodingLength(item: any, type: PrimitiveType|Object): Number`

#### `createEncodeStream(): EncodeStream`

#### `createDecodeStream(buf: Buffer): DecodeStream`

#### `types: Object`

#### `EncodeStream: stream.Duplex`

#### `DecodeStream: stream.Duplex`

### Types

#### `(u)int(8, 16, 24, 32, 40, 48)(be, le)`

Low-level number types.

#### `array(type, length, lengthType)`

Array of low-level or user defined types.

#### `string(length)`

Low-level string type. Argument `length` can be number, null for C - strings or function.

#### `bool(type)`

#### `buffer(length)`

#### `reserved(type, size)`

## License

MIT, 2017 (c) Dmitriy Tsvettsikh
