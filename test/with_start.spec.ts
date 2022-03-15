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
    expected: ['0', '', ''],
  },
  {
    str: '0あ',
    expected: ['0あ', 'あ', '', ''],
  },
  {
    str: 'あ0',
    expected: ['あ0', '0', '0', ''],
  },
  {
    str: 'あいう',
    expected: ['あいう', 'いう', 'いう', 'う', 'う', '', ''],
  },
  {
    str: 'あ😁😂',
    expected: {
      0: 'あ😁😂',
      2: '😁😂',
      4: '😂',
      6: '',
    },
  },
  {
    str: '\x1f',
    expected: ['\x1f', '', ''],
  },
  {
    str: '\x1f',
    expected: {
      '0.1': '',
    },
  },
  {
    str: 'あ\x1f',
    expected: {
      '0': 'あ\x1f',
      [Number.EPSILON]: '\x1f',
      '0.1': '\x1f',
      '1.1': '\x1f',
      '2': '\x1f',
      '2.1': '',
    },
  },
  {
    str: '\x000\x00',
    expected: ['\x000\x00', '\x00', '', ''],
  },
  {
    str: '\x000あ',
    expected: {
      '-1': '\x000あ',
      '-0.1': '\x000あ',
      '-10000': '\x000あ',
      '10000': '',
    },
  },
])('wcslice(str, start)', ({ str, expected }) => {
  for (const key in expected) {
    const start = Number.parseFloat(key);
    expect(wcslice(str, start), `str=${JSON.stringify(str)}, start=${start}`).toBe(expected[key]);
  }
});
