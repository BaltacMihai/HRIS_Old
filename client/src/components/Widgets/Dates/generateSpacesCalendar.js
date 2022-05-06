export default function generateSpaces(noOfSpaces) {
  noOfSpaces = ((noOfSpaces + 6) % 7) + 1;
  return [...Array(noOfSpaces)].map((e, i) => {
    if (i > 0) {
      return <div className="calendar_body_item" key={e}></div>;
    }
  });
}
