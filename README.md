# Protobuf Templates
Generate TypeScript code from proto files.

[![Circle CI](https://circleci.com/gh/AlexDaSoul/nestjs-proto-gen-ts.svg?style=shield)](https://circleci.com/gh/AlexDaSoul/nestjs-proto-gen-ts/)
[![npm](https://img.shields.io/npm/dm/nestjs-proto-gen-ts.svg)](https://www.npmjs.com/package/nestjs-proto-gen-ts)
[![Licence MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](http://opensource.org/licenses/MIT)

This package uses the [protobufjs](http://dcode.io/protobuf.js) library to auto-generate TypeScript or JavaScript code using [handlebars](https://handlebarsjs.com/) templates.

The package doesn't rely on the `protoc` compiler and generates TypeScript code directly rather than inferring types from generated JavaScript code. This makes usage of the auto-generated code easier as it does not need to compile at the point of creation.

## Installation

```bash
$ npm install nestjs-proto-gen-ts
```

## Usage
Base usage:
```bash
$ tsproto --path grpc-proto
```
Output dir:
```bash
$ tsproto --path grpc-proto --output any-dir
```
Target files:
```bash
$ tsproto --path grpc-proto --target one.proto two.proto
```
Ignore directories or files:
```bash
$ tsproto --path grpc-proto --ignore grpc-proto/ignore-dir
```
Custom handlebar's template for output:
```bash
$ tsproto --path grpc-proto --template custom-template.hbs
```

## Options

The following options are available:

```
  --version, -v   Show version number                                  [boolean]
  --help, -h      Show help                                            [boolean]
  --path, -p      Path to root directory                      [array] [required]
  --output, -o    Path to output directory                              [string]
  --template      Handlebar's template for output
                                 [string] [default: "templates/nestjs-grpc.hbs"]
  --target, -t    Proto files                      [array] [default: [".proto"]]
  --ignore, -i    Ignore file or directories
                                      [array] [default: ["node_modules","dist"]]
  --comments, -c  Add comments from proto              [boolean] [default: true]
  --verbose       Log all output to console            [boolean] [default: true]
```
