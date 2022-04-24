# Nest.js TypeScript generator from Protobuf
Generate TypeScript code from proto files.

[![Circle CI](https://circleci.com/gh/AlexDaSoul/nestjs-proto-gen-ts.svg?style=shield)](https://circleci.com/gh/AlexDaSoul/nestjs-proto-gen-ts/)
[![npm](https://img.shields.io/npm/dm/nestjs-proto-gen-ts)](https://www.npmjs.com/package/nestjs-proto-gen-ts)
[![Licence MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](http://opensource.org/licenses/MIT)

This package uses the [protobufjs](https://protobufjs.github.io/protobuf.js/) library to auto-generate TypeScript or JavaScript code using [handlebars](https://handlebarsjs.com/) templates.

The package does not rely on the `protoc' compiler and generates TypeScript code directly, rather than outputting types from the generated JavaScript code. This makes it easy to use the automatically generated code because it does not need to be compiled at the time of creation.

## Installation

```bash
$ npm install nestjs-proto-gen-ts
```

## Example
Protobuf file hero-proto/hero.proto:
```proto
syntax = "proto3";

package hero;

service HeroesService {
  rpc FindOne (HeroById) returns (Hero) {}
}

message HeroById {
  int32 id = 1;
}

message Hero {
  int32 id = 1;
  string name = 2;
}
```

Generate interfaces:
```bash
$ tsproto --path ./hero-proto
```

Output:
```typescript
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export namespace hero {
    export interface HeroesService {
        findOne(data: HeroById, metadata?: Metadata): Observable<Hero>;
    }
    export interface HeroById {
        id?: number;
    }
    export interface Hero {
        id?: number;
        name?: string;
    }
}
```

Controller:
```typescript
...
import { hero } from 'hero-proto/hero';

type HeroById = hero.HeroById;

@Controller()
export class HeroesController implements hero.HeroesService {
  @GrpcMethod('HeroesService', 'FindOne')
  findOne(data: HeroById, meta: Metadata): Observable<hero.Hero> {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];

    return items.find(({ id }) => id === data.id);
  }
}
```

Client:
```typescript
...
import { hero } from 'hero-proto/hero';

@Injectable()
export class AppService implements OnModuleInit {
  private heroesService: hero.HeroesService;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.heroesService = this.client.getService<hero.HeroesService>('HeroesService');
  }

  getHero(): Observable<string> {
    return this.heroesService.findOne({ id: 1 });
  }
}
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
