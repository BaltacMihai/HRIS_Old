import { CustomDateFormat } from "./CustomDateFormat";

/**
 * Format the date for database
 * @param {date} date the date to generate
 * @returns YYYY-MM-DD format
 */
export default function formatDateForDatabase(dateToConvert) {
  return new CustomDateFormat(dateToConvert).database();
}
