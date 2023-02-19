import { DateTime, type DateTimeUnit } from "luxon";
import type { ICounter } from "@/@types/counters";
import type { IRecord } from "@/@types/records";

export const getCurrentCount = (
  counter: ICounter,
  records: Array<IRecord>
): number => {
  if (records.length === 0) return 0;
  let filterStartRange: DateTime;
  const filterEndRange = DateTime.now()
    .set({ millisecond: -1, second: 0, minute: 0, hour: 0 })
    .plus({ days: 1 });

  switch (counter.resetType) {
    case "Never":
      return records.reduce((p, c) => p + c.incrementValue, 0);
    default:
      filterStartRange = DateTime.now().startOf(
        counter.resetType.toLowerCase() as DateTimeUnit
      );
  }

  const filteredRecords = records.filter(
    (r) =>
      r.createdAt < filterEndRange.toSeconds() &&
      r.createdAt > filterStartRange.toSeconds()
  );
  return filteredRecords.reduce((p, c) => p + c.incrementValue, 0);
};

export const getCounterTypeLabel = (counter: ICounter): string => {
  switch (counter.resetType) {
    case "Year":
      return "Yearly";
    case "Month":
      return "Monthly";
    case "Week":
      return "Weekly";
    case "Day":
      return "Daily";
    default:
      return "";
  }
};
