/**
 * Arredonda numero com casas decimais
 * @function round
 * @example
 * round(1234.5678, 1); // 1234.6
 */
export function round(number: number | string, precision = 4): number {
  if (typeof number === 'string') return round(+number, precision);
  if (!number || (number && number === 0)) return 0;
  const factor = Math.pow(10, precision);
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

/**
 * Arredonda numero com casas decimais
 * @function roundStr
 * @example
 * roundStr(1234.5678, 1); // 1234.6
 * roundStr('1234.5678', 1); // 1234.6
 */
export function roundStr(number?: number | string, precision = 4): string {
  if (!number || (number && number === 0)) return '0';
  if (typeof number === 'string') return parseFloat(number).toFixed(precision);
  if (typeof number === 'number') return number.toFixed(precision);
  return '0';
}
