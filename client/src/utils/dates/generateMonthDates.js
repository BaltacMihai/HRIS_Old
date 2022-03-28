/**
 * Generate the first and the last date of the given date, by default, we get current date
 * @param {number} monthsFromNow if we want to see the dates for the next months, just add the months from now
 * @returns first and the last day of a given month
 */
export default function generateMonthDates(monthsFromNow = 0) {
  let currentDate = new Date();

  let firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + monthsFromNow,
    1
  );

  let lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1 + monthsFromNow,
    0
  );

  return {
    firstDay: firstDay,
    lastDay: lastDay,
  };
}
