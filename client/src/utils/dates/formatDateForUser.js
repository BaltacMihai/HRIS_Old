/**
 * Format the date for user
 * @param {date} date the date to user
 * @returns DD.MM.YYYY format
 */
export default function formatDateForUser(date) {
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let year = date.getFullYear();

  return day + "." + month + "." + year;
}
