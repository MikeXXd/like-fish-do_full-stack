import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek
} from "date-fns";
import { RITUAL_TIME_BASE } from "../constants";
import { Ritual } from "../contexts/Ritual";

// providing the sorting value for the rituals based on the remaining time within it's timeBase and frequency

export default function ritualTimeSortingValue(ritual: Ritual) {
  const now = new Date();
  let endOfTimebase: Date;
  let startOfTimebase: Date;

  //  if the ritual is already performed the required number of times, return 100% to put it at the end of the list
  if (ritual.performed.length >= ritual.frequency) return 100;
  // Calculate persentage of time remaining in the current timebase
  if (ritual._timeBase === RITUAL_TIME_BASE[0]) {
    // daily
    endOfTimebase = endOfDay(now);
    startOfTimebase = startOfDay(now);
  } else if (ritual._timeBase === RITUAL_TIME_BASE[1]) {
    // weekly
    endOfTimebase = endOfWeek(now, { weekStartsOn: 1 });
    startOfTimebase = startOfWeek(now, { weekStartsOn: 1 });
  } else if (ritual._timeBase === RITUAL_TIME_BASE[2]) {
    // monthly
    endOfTimebase = endOfMonth(now);
    startOfTimebase = startOfMonth(now);
  } else {
    throw new Error("Invalid _timeBase value");
  }
  const msUntilEndOfTimebase = endOfTimebase.getTime() - now.getTime();
  const msInTimebase = endOfTimebase.getTime() - startOfTimebase.getTime();
  const remainingTimeInPersentage = msUntilEndOfTimebase / (msInTimebase / 100);

  // Calculate the remaining frequency of the ritual / the result will be divisor for the remaining time !!! it must 1 or more, cannot be 0 !!!
  const remainingFrequency = ritual.frequency - ritual.performed.length;
  const frequencyDivisor = remainingFrequency < 1 ? 1 : remainingFrequency;

  return remainingTimeInPersentage / frequencyDivisor;
}
