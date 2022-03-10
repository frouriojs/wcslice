# wcslice

[![Luma Style Guide](https://img.shields.io/badge/styled%20with-luma-%23c5ebeb?style=flat-square)](https://github.com/luma-dev/luma-style-guide#readme)
[![](https://img.shields.io/codecov/c/github/luma-dev/wcslice?style=flat-square)](https://codecov.io/gh/luma-dev/wcslice)

String `slice` for wide character sensitive.

```sh
npm i wcslice
```

Wide characters are counted by [`wcwidth`](https://www.npmjs.com/package/wcwidth).

## Usage

```ts
import wcslice from 'wcslice'
// wcslice(str, [start, [end]])
console.log(wcslice('abc', 0, 1)) // a
console.log(wcslice('aあc', 0, 2)) // a
console.log(wcslice('aあc', 0, 3)) // aあ
console.log(wcslice('aあc', 1, 4)) // あc
console.log(wcslice('aあc', 2, 4)) // c
```

Zero-length chars are treated specially. They are treated as infinitesimal in last positions. You can think last zero-length chars as 0.00...001 size.
Float values are supported.

```ts
console.log(wcslice('\x00', 0)) // "\x00"
console.log(wcslice('\x00', Number.EPSILON)) // ""
console.log(wcslice('\x00', 0.1)) // ""
console.log(wcslice('\x00', 1)) // ""
```

Note that negative numbers are treated as negative positions because of zero-length chars. This differs from `slice`.

```ts
console.log(wcslice('abc', -1)) // abc
```
