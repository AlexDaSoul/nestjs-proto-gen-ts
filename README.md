# Protobuf Templates
Generate TypeScript code from proto files.

[![Circle CI](https://circleci.com/gh/thegecko/protobuf-templates.svg?style=shield)](https://circleci.com/gh/thegecko/protobuf-templates/)
[![npm](https://img.shields.io/npm/dm/protobuf-templates.svg)](https://www.npmjs.com/package/protobuf-templates)
[![Licence MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](http://opensource.org/licenses/MIT)

This package uses the [protobufjs](http://dcode.io/protobuf.js) library to auto-generate TypeScript or JavaScript code using [handlebars](https://handlebarsjs.com/) templates.

The package doesn't rely on the `protoc` compiler and generates TypeScript code directly rather than inferring types from generated JavaScript code. This makes usage of the auto-generated code easier as it does not need to compile at the point of creation.

Example templates are included, but the user may specify their own custom templates if required. 

## Prerequisites

[Node.js > v6.12.0](https://nodejs.org), which includes `npm`.

## Installation

```bash
$ npm install protobuf-templates
```

## Usage in gulp

First, import this task into your gulpfile:

```javascript
let protobuf = require("protobuf-templates");
```

Then pipe a stream of `.proto` files into the task and save the output:

```javascript
gulp.task("protobuf-gen", () => {
    return gulp.src(protoFiles)
    .pipe(protobuf())
    .pipe(gulp.dest(distDir));
});
```

## Options

The following options are available:

```
template                Specifies the template to use. Also accepts a path to a custom template

                        interface           Generate a typescript interface (default)

type                    The target language to use

                        typescript          Generate TypeScript code (default)
                        javascript          Generate JavaScript code

keepCase                Keeps field casing instead of converting to camel case
```

## Implementation Status

### Templates

- [x] TypeScript interface
- [x] TypeScript abstract server class
- [x] TypeScript client class
- [ ] JavaScript abstract server class
- [ ] JavaScript client class

### Types

The library currently supports all of the proto3 [scalar types](https://developers.google.com/protocol-buffers/docs/proto3#scalar), [enums](https://developers.google.com/protocol-buffers/docs/proto#enum), [maps](https://developers.google.com/protocol-buffers/docs/proto3#maps) and [nested types](https://developers.google.com/protocol-buffers/docs/proto3#nested).

- [x] int32, fixed32, uint32
- [x] int64, fixed64, uint64
- [x] float, double
- [x] bool
- [x] string
- [x] bytes
- [x] repeated
- [x] enums 
- [x] map
- [x] nested types
- [x] google.protobuf.Any
- [x] google.protobuf.Timestamp
- [x] google.protobuf.Duration
- [x] google.protobuf.Empty
- [ ] google.protobuf.Struct
- [ ] google.protobuf.Wrapper
- [ ] google.protobuf.FieldMask
- [ ] google.protobuf.ListValue
- [ ] google.protobuf.Value
- [ ] google.protobuf.NullValue
- [ ] Long

### Features

- [x] package (namespaces)
- [x] default values
- [x] streaming messages
- [ ] Any
- [ ] Oneof
