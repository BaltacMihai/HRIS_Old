export default function generateSpaces(noOfSpaces) {
  return [...Array(noOfSpaces)].map((e, i) => {
    if (i > 0) {
      return <div className="calendar_body_item" key={e}></div>;
    }
  });
}
