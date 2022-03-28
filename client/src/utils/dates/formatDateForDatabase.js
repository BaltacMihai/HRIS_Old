/**
 * Format the date for database
 * @param {date} date the date to generate
 * @returns YYYY-MM-DD format
 */
export default function formatDateForDatabase(date) {
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}
