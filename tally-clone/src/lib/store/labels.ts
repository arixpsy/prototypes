import { defaultLabelsStoreValues } from "@/utils/defaults";
import { writable } from "svelte/store";

const storedLabels = JSON.parse(localStorage.getItem("labels") || "null");

export const labels = writable<Array<string>>(
  storedLabels || defaultLabelsStoreValues
);

labels.subscribe((value) =>
  localStorage.setItem("labels", JSON.stringify(value))
);
