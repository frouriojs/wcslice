import wcwidth from 'wcwidth';

/**
 * This treats last zero-length chars as infinitesimal length.
 */
const wcslice = (str: string, start?: number | undefined, end?: number | undefined) => {
  const wclens = str.split('').reduce(
    (c, e) => {
      c.push(c[c.length - 1] + wcwidth(e));
      return c;
    },
    [0],
  );
  const wclen = wclens[wclens.length - 1];
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = wclen + 1;
  }
  if (end < 0) end = 0;
  const strStart = (() => {
    let lo = -1;
    let hi = str.length;
    while (lo + 1 < hi) {
      const mi = (lo + hi + 1) >> 1;
      if (wclens[mi] >= start) hi = mi;
      else lo = mi;
    }
    return hi;
  })();
  const strEnd = (() => {
    let lo = -1;
    let hi = str.length;
    while (lo + 1 < hi) {
      const mi = (lo + hi + 1) >> 1;
      if (wclens[mi] >= end) hi = mi;
      else lo = mi;
    }
    if (wcwidth(str.slice(0, hi)) > end) return hi - 1;
    return hi;
  })();
  return str.slice(strStart, strEnd);
};

export default wcslice;
