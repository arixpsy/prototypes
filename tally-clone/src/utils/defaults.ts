import { COUNTER_COLOR, type ICounter, type IRecord } from "@/utils/types";
import { nanoid } from "nanoid";
import { DateTime } from "luxon";

export const defaultCounterStoreValues: Array<ICounter> = [
  {
    id: nanoid(),
    title: "Vitamins",
    createdAt: DateTime.now().toSeconds(),
    resetType: "Day",
    target: null,
    color: COUNTER_COLOR[0],
    incrementValue: 1,
  },
];

export const defaultRecordStoreValues: Array<IRecord> = [];
