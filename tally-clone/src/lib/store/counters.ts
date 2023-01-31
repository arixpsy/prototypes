import { writable } from "svelte/store";
import { defaultCounterStoreValues } from "../../utils/defaults";
import type { ICounter } from "@/@types/counters";

const storedCounters = JSON.parse(localStorage.getItem("counters") || "null");

export const counters = writable<Array<ICounter>>(
  storedCounters || defaultCounterStoreValues
);

counters.subscribe((value) =>
  localStorage.setItem("counters", JSON.stringify(value))
);
