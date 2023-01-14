import type { ICounter } from "@/utils/types";

export const defaultCounterStoreValues: Array<ICounter> = [
  {
    id: 'test1',
    title: "Commits",
    createdAt: 1673370178,
    resetType: "Day",
    target: null,
    color: "bg-slate-400",
    incrementValue: undefined,
  },
  {
    id: 'test2',
    title: "Commits",
    createdAt: 1673370178,
    resetType: "Week",
    target: null,
    color: "bg-lime-400",
    incrementValue: undefined,
  },
  {
    id: 'test3',
    title: "Commits",
    createdAt: 1673370178,
    resetType: "Month",
    target: null,
    color: "bg-blue-400",
    incrementValue: undefined,
  },
  {
    id: 'test4',
    title: "Commits",
    createdAt: 1673370178,
    resetType: "Year",
    target: null,
    color: "bg-yellow-400",
    incrementValue: undefined,
  },
  {
    id: 'test5',
    title: "Commits",
    createdAt: 1673370178,
    resetType: "Never",
    target: null,
    color: "bg-yellow-400",
    incrementValue: undefined,
  },
];