# binary-data

[![Build Status](https://travis-ci.org/reklatsmasters/binary-data.svg?branch=master)](https://travis-ci.org/reklatsmasters/binary-data)
[![npm](https://img.shields.io/npm/v/binary-data.svg)](https://npmjs.org/package/binary-data)
[![node](https://img.shields.io/node/v/binary-data.svg)](https://npmjs.org/package/binary-data)
[![license](https://img.shields.io/npm/l/binary-data.svg)](https://npmjs.org/package/binary-data)
[![downloads](https://img.shields.io/npm/dm/binary-data.svg)](https://npmjs.org/package/binary-data)
[![Greenkeeper badge](https://badges.greenkeeper.io/reklatsmasters/binary-data.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/reklatsmasters/binary-data/badge.svg?branch=master)](https://coveralls.io/github/reklatsmasters/binary-data?branch=master)

Declarative encoder/decoder of various binary data. This module works almost like as [`binary`](https://www.npmjs.com/package/binary) or [`restructure`](https://www.npmjs.com/package/restructure) but provided modern and clean api.

## Usage

#### decode

```js
const { decode, createDecodeStream, types: { uint8, array, string } } = require('binary-data')

// 1.1 define your own schema as plain object
const protocol = {
  type: uint8,
  value: array(string(null), uint8)
}

socket.on('message', (message) => {
  // 1.2 decode message
  const packet = decode(message, protocol)
})

// 2.1 also you may decode messages from streams
const unicast = require('unicast')

const socket = unicast.createSocket({ /* options */ })

// 2.2 create stream
const input = createDecodeStream(protocol)

// 2.3 connect streams
socket.pipe(input).on('data', packet => { /* do stuff */ })
```

#### encode

```js
const { encode, createEncodeStream, types: { uint8, buffer } } = require('binary-data')

// 1. define schema
const protocol = {
  type: uint8,
  data: buffer(uint8)
}

// 2. create data object (string, array - what you want)
const hello = {
  type: 12,
  data: Buffer.from('my random data')
}

// 3. create encode stream
const wstream = createEncodeStream(protocol)

// 4. connect streams
wstream.pipe(socket)

// 5.1. encode all your data
wstream.write(hello)

// 5.2 or use another schema
encode(anotherPacket, wstream, anotherSchema)

// 5.3 or convert to a buffer
const buf = wstream.slice()
```

See [stun](https://github.com/nodertc/stun) or [dtls](https://github.com/nodertc/dtls) module for complete example.

## API

* [`decode(rstream: DecodeStream|Buffer, type: PrimitiveType|Object): any`](#decode)
* [`encode(item: any, wstream: EncodeStream, type: PrimitiveType|Object): void`](#encode)
* [`encodingLength(item: any, type: PrimitiveType|Object): Number`](#encoding-length)
* [`createEncodeStream(): EncodeStream`](#create-encode-stream)
* [`createDecodeStream([buf: Buffer]): DecodeStream`](#create-decode-stream)
* [Types](#types)
  * [`(u)int(8, 16, 24, 32, 40, 48)(be, le)`](#types-int)
  * [`(double, float)(be, le)`](#types-float)
  * [`array(type: Object, length: number|Object|Function, lengthType: string)`](#types-array)
  * [`string(length)`](#types-string)
  * [`bool(type: any)`](#types-bool)
  * [`buffer(length)`](#types-buffer)
  * [`reserved(type, count)`](#types-reserved)
  * [`when(fn: function(context): boolean, type)`](#types-when)

<a name='decode' />

#### `decode(rstream: DecodeStream|Buffer, type: PrimitiveType|Object): any`

Reads any data from stream `rstream` using data type `type`. See examples above.

<a name='encode' />

#### `encode(item: any, wstream: EncodeStream, type: PrimitiveType|Object): void`

Writes any data `item` to stream `wstream` using data type `type`. See examples above.

<a name='encoding-length' />

#### `encodingLength(item: any, type: PrimitiveType|Object): Number`

Return the amount of bytes needed to encode `item` using `type`.

<a name='create-encode-stream' />

#### `createEncodeStream(): EncodeStream`

Create instance of EncodeStream.

<a name='create-decode-stream' />

#### `createDecodeStream([buf: Buffer]): DecodeStream`

Create instance of DecodeStream using buffer `buf`.

<a name='types' />

#### `types: Object`

Contains all primitive data types.

### Types

<a name='types-int' />

#### `(u)int(8, 16, 24, 32, 40, 48)(be, le)`

Low-level integer types.

```js
const schema = {
  type: int8
}

// define int64 as buffer and use your loved library for big numbers
const int64 = buffer(8)
```

<a name='types-float' />

#### `(double, float)(be, le)`

Low-level floating-point types.

```js
const schema = {
  size: doublele
}
```

<a name='types-array' />

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

<a name='types-string' />

#### `string(length)`

Low-level string type. Argument `length` can be _number_, _null_ for C - strings, _type_ for size-prefixed data or _function_.

<a name='types-bool' />

#### `bool(type: any)`

Convert provided type to / from boolean. Argument `type` should be an number type.

```js
const schema = bool(uint8)
const rstream = createDecodeStream(buf) // 0x01 0

decode(rstream, schema) // return true
decode(rstream, schema) // return false
```

<a name='types-buffer' />

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

<a name='types-reserved' />

#### `reserved(type, count)`

Special type to skip any data. Argument `count` should be a number, number type or function.

```js
const packet = {
  type: uint8,
  _padding: reserved(uint8, 3)
}

decode(rstream, packet) // return { type }
```

<a name='types-when' />

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

### `select(when, ..., defaultType)`

The second type for conditions. The same as `switch` operator in js. Argument `defaultType` may be any known
*type* excluding user *schemas*.

```js
const schema = {
  id: uint8,
  payload: select(when(({ node }) => node.id === 1, string(uint16be)), buffer(uint16be))
}
```

## License

MIT, 2017 (c) Dmitriy Tsvettsikh
