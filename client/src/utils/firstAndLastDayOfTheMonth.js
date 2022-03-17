export default function firstAndLastDayOfTheMonth(monthsFromNow = 0) {
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
