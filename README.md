# binary-data

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

## API

#### `decode(rstream: DecodeStream, type: PrimitiveType|Object): any`

#### `encode(item: any, wstream: EncodeStream, type: PrimitiveType|Object): void`

#### `encodingLength(item: any, type: PrimitiveType|Object): Number`

#### `createEncodeStream(): EncodeStream`

#### `createDecodeStream(buf: Buffer): DecodeStream`

#### `types: Object`

#### `EncodeStream: stream.Duplex`

#### `DecodeStream: stream.Duplex`

## License

MIT, 2017 (c) Dmitriy Tsvettsikh
