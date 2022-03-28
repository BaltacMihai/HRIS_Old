/**
 * Format the date to get the hour and minutes
 * @param {date} date
 * @returns formated hour
 */
export default function formatHourForUser(date) {
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minute =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return hour + " : " + minute;
}
