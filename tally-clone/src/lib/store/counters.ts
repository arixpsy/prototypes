import { writable } from "svelte/store";
import { defaultCounterStoreValues } from "../../utils/defaults";
import type { ICounter } from "@/utils/types";

const storedCounters = JSON.parse(localStorage.getItem("counters"));

export const counters = writable<Array<ICounter>>(
  storedCounters || defaultCounterStoreValues
);

counters.subscribe((value) => localStorage.setItem('counters', JSON.stringify(value)))
