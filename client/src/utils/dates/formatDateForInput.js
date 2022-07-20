import { CustomDateFormat } from "./CustomDateFormat";

/**
 * Format the date for user
 * @param {dateToConvert} date the date to user
 * @returns DD.MM.YYYY format
 */
export default function formatDateForInput(dateToConvert) {
  return new CustomDateFormat(dateToConvert).form();
}
