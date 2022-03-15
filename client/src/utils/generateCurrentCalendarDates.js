export default function generateCurrentCalendarDates(noOfDays) {
  return [...Array(noOfDays)].map((e, i) => {
    if (i > 0) {
      return (
        <abbr className="calendar_body_item" id={"day-" + i} key={"day-" + i}>
          {i}
        </abbr>
      );
    }
  });
}
