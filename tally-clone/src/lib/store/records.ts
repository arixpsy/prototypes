import { writable } from "svelte/store";
import { defaultCounterStoreValues } from "../../utils/defaults";
import type { IRecord } from "@/utils/types";

const storedRecords = JSON.parse(localStorage.getItem("records"));

export const records = writable<Array<IRecord>>(
  storedRecords || defaultCounterStoreValues
);

records.subscribe((value) => localStorage.setItem('records', JSON.stringify(value)))
