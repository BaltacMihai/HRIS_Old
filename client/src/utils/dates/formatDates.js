import formatDateForDatabase from "./formatDateForDatabase";
import formatDateForUser from "./formatDateForUser";
import formatHourForUser from "./formatHourForUser";

export default function formatDates(date) {
  return {
    user: {
      hour: formatHourForUser(date),
      date: formatDateForUser(date),
    },
    database: {
      date: formatDateForDatabase(date),
    },
  };
}
