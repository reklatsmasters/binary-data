# binary-data

[![Build Status](https://travis-ci.org/reklatsmasters/binary-data.svg?branch=master)](https://travis-ci.org/reklatsmasters/binary-data)
[![npm](https://img.shields.io/npm/v/binary-data.svg)](https://npmjs.org/package/binary-data)
[![node](https://img.shields.io/node/v/binary-data.svg)](https://npmjs.org/package/binary-data)
[![license](https://img.shields.io/npm/l/binary-data.svg)](https://npmjs.org/package/binary-data)
[![downloads](https://img.shields.io/npm/dm/binary-data.svg)](https://npmjs.org/package/binary-data)
[![Greenkeeper badge](https://badges.greenkeeper.io/reklatsmasters/binary-data.svg)](https://greenkeeper.io/)

Declarative encoder/decoder of various binary data. This module works almost like as [`binary`](https://www.npmjs.com/package/binary) or [`restructure`](https://www.npmjs.com/package/restructure) but provided modern and clean api.

## Usage

#### decode

```js
const { decode, createDecodeStream, types: { uint8, array, string } } = require('binary-data')

// 1. define your own schema
const protocol = {
  type: uint8,
  value: array(string(null), uint8)
}

socket.on('message', (message) => {
  // 2. create decode stream
  const rstream = createDecodeStream(message)

  // 3. decode using stream
  const packet = decode(rstream, protocol)

  // 3.1 or decode message directly
  const packet = decode(message, protocol)
})
```

#### encode

```js
const { encode, createEncodeStream, types: { uint8, buffer } } = require('binary-data')

// 1. define schema
const helloPacket = {
  type: uint8,
  data: buffer(uint8)
}

// 2. create data object (string, array - what's you want)
const hello = {
  type: 12,
  data: Buffer.from('my random data')
}

// 3. create encode stream
const wstream = createEncodeStream()

// 4. encode all your data
encode(hello, wstream, helloPacket)

// 5. write to the socket
wstream.pipe(socket)

// or convert to a buffer
const buf = wstream.slice()
```

See [stun](https://github.com/nodertc/stun) module for complete example.

## API

#### `decode(rstream: DecodeStream | Buffer, type: PrimitiveType|Object): any`

Reads any data from stream `rstream` using data type `type`. See examples above.

#### `encode(item: any, wstream: EncodeStream, type: PrimitiveType|Object): void`

Writes any data `item` to stream `wstream` using data type `type`. See examples above.

#### `encodingLength(item: any, type: PrimitiveType|Object): Number`

Return the amount of bytes needed to encode `item` using `type`.

#### `createEncodeStream(): EncodeStream`

Create instance of EncodeStream.

#### `createDecodeStream(buf: Buffer): DecodeStream`

Create instance of DecodeStream using buffer `buf`.

#### `types: Object`

Contains all primitive data types.

### Types

#### `(u)int(8, 16, 24, 32, 40, 48)(be, le)`

Low-level number types.

```js
// define int64 as buffer and use your loved library for big numbers
const int64 = buffer(8)
```

#### `array(type: Object, length: number|Object|Function, lengthType: string)`

Array of low-level or user defined types. Argument `type` should be primitive type or user defined scheme. Argument `length` should be a number, number type or function. Argument `lengthType` should be `bytes` or `count` (default).

```js
array(uint8, 3) // 3 x uint8

const schema = {
  length: uint8,
  type: uint32be,
  items: array(uint16, ({node}) => node.length, 'bytes')
}

// difference between `bytes` or `count`

array(uint16, uint8)
// |   0x2  | 0x0 0x1 | 0x0 0x2 |
// | length | item 1  |  item 2 |
// bytes = 1 + 4, length = 2

array(uint16, uint8, 'bytes')
// |   0x4  | 0x0 0x1 | 0x0 0x2 |
// | length | item 1  |  item 2 |
// bytes = 1 + 4, length = 4
```

#### `string(length)`

Low-level string type. Argument `length` can be _number_, _null_ for C - strings, _type_ for size-prefixed data or _function_.

#### `bool(type: any)`

Convert provided type to / from boolean. Argument `type` should be an number type.

```js
const schema = bool(uint8)
const rstream = createDecodeStream(buf) // 0x01 0

decode(rstream, schema) // return true
decode(rstream, schema) // return false
```

#### `buffer(length)`

Low-level buffer type. Argument `length` can be _number_, number _type_ for size-prefixed data or _function_.

```js
buffer(5) // buffer should be 5 bytes

buffer(uint8) // length prefixed buffer
// |   0x3  | 0xa 0xb 0xc
// | length | data

const packet = {
  header: {
    length: uint16be
  },
  data: buffer(({node}) => node.header.length % 2) // function should return actual length
}
```

#### `reserved(type, count)`

Special type to skip any data. Argument `count` should be a number, number type or function.

```js
const packet = {
  type: uint8,
  _padding: reserved(uint8, 3)
}

decode(rstream, packet) // return { type }
```

#### `when(fn: function(context): boolean, type)`

Special type for conditions. Argument `fn` should be a function and should return boolean value. The `type`
argument will be evaluated when the first one returns positive value.

```js
const schema = {
  type: uint8,
  bytes: when(({ node }) => node.type === 1, string(uint16be)),
  list: when(({ node }) => node.type === 2, array(uint32be, uint8))
}
```

## License

MIT, 2017 (c) Dmitriy Tsvettsikh
