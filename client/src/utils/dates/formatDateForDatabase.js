/**
 * Format the date for database
 * @param {date} date the date to generate
 * @returns YYYY-MM-DD format
 */
export default function formatDateForDatabase(dateToConvert) {
  let date = new Date(dateToConvert);

  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " "
  );
}
