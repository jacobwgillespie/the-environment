# 🌱 the-environment

[![CI](https://github.com/jacobwgillespie/the-environment/actions/workflows/ci.yml/badge.svg)](https://github.com/jacobwgillespie/the-environment/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/dm/the-environment.svg)](https://www.npmjs.com/package/the-environment)
[![npm](https://img.shields.io/npm/v/the-environment.svg)](https://www.npmjs.com/package/the-environment)
![Powered by TypeScript](https://img.shields.io/badge/powered%20by-typescript-blue.svg)

Simple Node.js package for reading environment variables, TypeScript support included.

## Installation

```
$ pnpm add the-environment
$ yarn add the-environment
$ npm install the-environment
```

## Usage

The `optional` import mirrors the behavior of `process.env`, returning either the string value or `undefined` if the variable is unset:

```typescript
import {optional} from 'the-environment'

// Fetch an optional environment variable:
console.log(optional.NODE_ENV)
```

The `required` import either returns the string value or throws a `MissingEnvironmentVariableError` if the variable is unset:

```typescript
import {required, MissingEnvironmentVariableError} from 'the-environment'

// Fetch a required environment variable, throw an error if not present:
console.log(required.NODE_ENV)

try {
  console.log(required.DOES_NOT_EXIST)
} catch (e) {
  if (e instanceof MissingEnvironmentVariableError) {
    //-> Missing required environment variable: DOES_NOT_EXIST
    console.log(e.message)

    //-> DOES_NOT_EXIST
    console.log(e.variable)
  }
}
```

If you'd like to import both `optional` and `required`, you can also use `import * as` to name it `env`:

```typescript
import * as env from 'the-environment'

console.log(env.optional.NODE_ENV)
console.log(env.required.NODE_ENV)
```

## License

MIT License, see `LICENSE`.
