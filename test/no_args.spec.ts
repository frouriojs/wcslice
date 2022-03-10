import { expect, test } from 'vitest';
import wcslice from '../src';

test.each<string>(['', '0', 'あ', 'あいう', '\x00', '\x1f', '\x20', '\x00a\x00'])(
  'wcslice(s) returns s itself',
  (s) => {
    expect(wcslice(s)).toBe(s);
  },
);
