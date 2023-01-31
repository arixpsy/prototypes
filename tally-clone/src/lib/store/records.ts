import { writable } from "svelte/store";
import { defaultRecordStoreValues } from "../../utils/defaults";
import type { IRecord } from "@/@types/records";

const storedRecords = JSON.parse(localStorage.getItem("records") || "null");

export const records = writable<Array<IRecord>>(
  storedRecords || defaultRecordStoreValues
);

records.subscribe((value) =>
  localStorage.setItem("records", JSON.stringify(value))
);
