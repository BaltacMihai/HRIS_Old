/**
 * Format the date for user
 * @param {dateToConvert} date the date to user
 * @returns DD.MM.YYYY format
 */
export default function formatDateForInput(dateToConvert) {
  let date = new Date(dateToConvert);

  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
  );
}
