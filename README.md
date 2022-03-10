# wcslice

[![Luma Style Guide](https://img.shields.io/badge/styled%20with-luma-%23c5ebeb?style=flat-square)](https://github.com/luma-dev/luma-style-guide#readme)
[![](https://img.shields.io/codecov/c/github/luma-dev/wcslice?style=flat-square)](https://codecov.io/gh/luma-dev/wcslice)

String `slice` for wide character sensitive.

```sh
npm i wcslice
```

Wide characters are counted by [`wcwidth`](git remote add origin git@github.com:luma-dev/wcslice.git).

## Usage

```ts
import wcslice from 'wcslice'
// wcslice(str, [start, [end]])
console.log(wcsilce('abc', 0, 1)) // a
console.log(wcsilce('aあc', 0, 2)) // a
console.log(wcsilce('aあc', 0, 3)) // aあ
console.log(wcsilce('aあc', 1, 4)) // あc
console.log(wcsilce('aあc', 2, 3)) // c
```

Zero-length chars are treated specially. They are treated as infinitesimal in last positions. You can think last zero-length chars as 0.00...001 size.
Float values are supported.

```ts
console.log(wcsilce('\x00', 0)) // "\x00"
console.log(wcsilce('\x00', Number.EPSILON)) // ""
console.log(wcsilce('\x00', 0.1)) // ""
console.log(wcsilce('\x00', 1)) // ""
```

Note that negative numbers are treated as negative positions because of zero-length chars. This differs from `slice`.

```ts
console.log(wcsilce('abc', -1)) // abc
```
