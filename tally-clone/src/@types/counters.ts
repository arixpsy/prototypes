import { z } from "zod";
import type { ObjectValues } from "@/@types/commons";

export const RESET_TYPE = {
  DAY: "Day",
  WEEK: "Week",
  MONTH: "Month",
  YEAR: "Year",
  NEVER: "Never",
} as const;

export type IResetType = ObjectValues<typeof RESET_TYPE>;

export const COUNTER_COLOR = [
  "bg-zinc-400",
  "bg-neutral-400",
  "bg-slate-400",
  "bg-slate-500",
  "bg-yellow-600",
  "bg-orange-500",
  "bg-orange-400",
  "bg-amber-400",
  "bg-yellow-400",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-green-600",
  "bg-teal-500",
  "bg-teal-400",
  "bg-cyan-600",
  "bg-blue-300",
  "bg-blue-400",
  "bg-blue-500",
  "bg-indigo-300",
  "bg-indigo-400",
  "bg-violet-300",
  "bg-violet-400",
  "bg-purple-300",
  "bg-purple-400",
  "bg-purple-500",
  "bg-fuchsia-300",
  "bg-pink-300",
  "bg-pink-400",
  "bg-pink-500",
  "bg-rose-300",
  "bg-rose-400",
] as const;

export type ICounterColor = typeof COUNTER_COLOR[number];

const CounterTitle = z.string().min(1).max(15);
const CounterResetType = z.nativeEnum(RESET_TYPE)
const CounterTarget = z.number().min(0)
const CounterColor = z.enum(COUNTER_COLOR)
const CounterIncrement = z.number().min(0)

export const CounterSchema = z.object({
  id: z.string(),
  title: CounterTitle,
  resetType: CounterResetType,
  target: CounterTarget,
  color: CounterColor,
  incrementValue: CounterIncrement,
  createdAt: z.number(),
});

export type ICounter = z.infer<typeof CounterSchema>;

export const CounterFormSchema = z.object({
  title: CounterTitle,
  resetType: CounterResetType,
  target: CounterTarget,
  color: CounterColor,
  incrementValue: CounterIncrement,
  // Additional Form fields
  hasTarget: z.boolean(),
  hasCustomIncrement: z.boolean(),
});
