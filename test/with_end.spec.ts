import { expect, test } from 'vitest';
import wcslice from '../src';

interface Case {
  str: string;
  expected: Record<number, string>;
}

test.each<Case>([
  {
    str: '',
    expected: ['', '', ''],
  },
  {
    str: '0',
    expected: ['', '0', '0'],
  },
  {
    str: '0あ',
    expected: ['', '0', '0', '0あ', '0あ'],
  },
  {
    str: 'あ0',
    expected: ['', '', 'あ', 'あ0'],
  },
  {
    str: 'あいう',
    expected: ['', '', 'あ', 'あ', 'あい', 'あい', 'あいう'],
  },
  {
    str: '\x1f',
    expected: ['', '\x1f', '\x1f'],
  },
  {
    str: '\x1f',
    expected: {
      '0.1': '\x1f',
    },
  },
  {
    str: 'あ\x1f',
    expected: {
      '0': '',
      [Number.EPSILON]: '',
      '0.1': '',
      '1.1': '',
      '2': 'あ',
      '2.1': 'あ\x1f',
    },
  },
  {
    str: '\x000\x00',
    expected: ['', '\x000', '\x000\x00'],
  },
  {
    str: '\x00\x00い\x00\x00a\x00\x00',
    expected: ['', '\x00\x00', '\x00\x00い', '\x00\x00い\x00\x00a', '\x00\x00い\x00\x00a\x00\x00'],
  },
  {
    str: 'a\x00\x00あ',
    expected: {
      '-100000': '',
      '-1': '',
      '100000': 'a\x00\x00あ',
    },
  },
])('wcslice(str, undefined=0, end)', ({ str, expected }) => {
  for (const key in expected) {
    const end = Number.parseFloat(key);
    expect(wcslice(str, undefined, end), `str=${JSON.stringify(str)}, end=${end}`).toBe(expected[key]);
  }
});
