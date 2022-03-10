import { expect, test } from 'vitest';
import wcslice from '../src';

interface Case {
  str: string;
  splitPoints: number[];
}

const caseStrings: Case['str'][] = [
  '',
  'abc'.repeat(2),
  '\x00bc'.repeat(2),
  'x\x00c'.repeat(2),
  'xd\x00zdac'.repeat(2),
  'x\x00\x00\x00ab\x00c'.repeat(3),
  '\x00\x00x\x00\x00a\x00\x00'.repeat(3),
];
const caseSplitPoints: Case['splitPoints'][] = [
  [2],
  [2, 4],
  [2, 5],
  [2, 3, 3, 9],
  [2, 3, 5, 9],
  [2, 3, 5, 9],
  [0, 0, 1, 1, 2, 2, 2, 5, 5],
];
const cases: Case[] = caseStrings.flatMap((str) => caseSplitPoints.map((splitPoints) => ({ str, splitPoints })));

test.each<Case>(cases)('any split is mutual exclusive', ({ str, splitPoints }) => {
  const ps = [0, ...splitPoints, undefined];
  let got = '';
  for (let i = 0; i + 1 < ps.length; i += 1) {
    got += wcslice(str, ps[i], ps[i + 1]);
  }
  expect(got, `sp=${JSON.stringify(splitPoints)}`).toBe(str);
});
