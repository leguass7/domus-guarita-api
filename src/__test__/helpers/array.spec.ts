import { makeArray } from '#/helpers/array';

describe('Test UTILS', () => {
  it('Deveria retornar um array', done => {
    expect(makeArray(1)).toEqual(expect.arrayContaining([1]));
    expect(makeArray({ prop: 1 })).toEqual(expect.arrayContaining([{ prop: 1 }]));
    expect(makeArray()).toEqual(expect.arrayContaining([]));
    done();
  });
});
