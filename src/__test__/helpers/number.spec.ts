import { round, roundStr } from '#/helpers/number';

describe('Test number', () => {
  it('deveria testar round', async () => {
    expect(round(1.33333)).toEqual(1.3333);
    expect(round(1.33333, 1)).toEqual(1.3);
    expect(round('', 1)).toEqual(0);
  });

  it('deveria testar round2', async () => {
    // expect(round2(1.33333)).toEqual('1.3333')
    // expect(round2('1.33333', 1)).toEqual('1.3')
    // expect(round2('')).toEqual('0')
    // expect(round2({ error: true })).toEqual('0')

    expect(roundStr(1.33333)).toEqual('1.3333');
    expect(roundStr('1.33333', 1)).toEqual('1.3');
    expect(roundStr('')).toEqual('0');
    //@ts-ignore
    expect(roundStr({ error: true })).toEqual('0');
  });
});
