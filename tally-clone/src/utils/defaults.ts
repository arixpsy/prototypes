import type { ICounter, IRecord } from "@/utils/types";

export const defaultCounterStoreValues: Array<ICounter> = [
  {
    id: "test1",
    title: "Commits",
    createdAt: 1673370178,
    resetType: "Day",
    target: null,
    color: "bg-slate-500",
    incrementValue: undefined,
  },
  {
    id: "test2",
    title: "Commits",
    createdAt: 1673370178,
    resetType: "Week",
    target: null,
    color: "bg-green-500",
    incrementValue: undefined,
  },
  {
    id: "test3",
    title: "Commits",
    createdAt: 1673370178,
    resetType: "Month",
    target: null,
    color: "bg-blue-500",
    incrementValue: undefined,
  },
  {
    id: "test4",
    title: "Commits",
    createdAt: 1673370178,
    resetType: "Year",
    target: null,
    color: "bg-yellow-500",
    incrementValue: undefined,
  },
  {
    id: "test5",
    title: "Commits",
    createdAt: 1673370178,
    resetType: "Never",
    target: null,
    color: "bg-yellow-500",
    incrementValue: undefined,
  },
];

export const defaultRecordStoreValues: Array<IRecord> = [];
