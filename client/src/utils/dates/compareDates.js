/**
 * Usualy used in the filter method
 * @param {date} a first date
 * @param {date} b second date
 * @returns -1 if the first date is greater, 0 if the dates are equal, 1 if the second date is greater
 *
 */

export default function compareDates(a, b) {
  return a.date - b.date;
}
