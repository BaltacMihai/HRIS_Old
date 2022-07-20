import { CustomDateFormat } from "./CustomDateFormat";

/**
 * Format the date to get the hour and minutes
 * @param {date} date
 * @returns formated hour
 */
export default function formatHourForUser(dateToConvert) {
  return new CustomDateFormat(dateToConvert).getHour();
}
