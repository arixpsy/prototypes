import { DateTime, type DateTimeUnit } from "luxon";
import type { ICounter, IRecord } from "@/utils/types";

export const getCurrentCount = (
  counter: ICounter,
  record?: IRecord
): number => {
  const recordCreatedAt = record?.createdAt;
  if (!recordCreatedAt) return 0;

  const recordDate = DateTime.fromSeconds(recordCreatedAt);
  switch (counter.resetType) {
    case "Never":
      return record?.latestValue || 0;
    default:
      if (
        recordDate
          .startOf(counter.resetType.toLowerCase() as DateTimeUnit)
          .toMillis() ===
        DateTime.now()
          .startOf(counter.resetType.toLowerCase() as DateTimeUnit)
          .toMillis()
      ) {
        return record?.latestValue || 0;
      } else return 0;
  }
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
