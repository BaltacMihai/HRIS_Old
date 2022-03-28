import React, { useEffect, useState } from "react";
import usePostEvent from "./postEvent";
import usePostEventsAllocation from "./postEventsAlocation";
import useUserId from "./User";

export default function useFreeDay(id, date) {
  let newEvent = usePostEvent(date);

  usePostEventsAllocation(id, newEvent.id);
}
