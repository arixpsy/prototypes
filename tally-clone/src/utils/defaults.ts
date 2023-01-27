import { COUNTER_COLOR, type ICounter } from "@/@types/counters";
import type { IRecord } from "@/@types/records";
import { nanoid } from "nanoid";
import { DateTime } from "luxon";

export const defaultCounterStoreValues: Array<ICounter> = [
  {
    id: nanoid(),
    title: "Vitamins",
    createdAt: DateTime.now().toSeconds(),
    resetType: "Day",
    target: 0,
    color: COUNTER_COLOR[0],
    incrementValue: 1,
  },
];

export const defaultRecordStoreValues: Array<IRecord> = [];

export const defaultLabelsStoreValues: Array<IRecord> = [];
