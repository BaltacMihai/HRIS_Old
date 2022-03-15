export default function firstAndLastDayOfTheMonth(monthForNow) {
  let currentDate = new Date();

  let firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + monthForNow,
    1
  );
  console.log(firstDay);
  let lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1 + monthForNow,
    0
  );

  return {
    firstDay: firstDay,
    lastDay: lastDay,
  };
}
