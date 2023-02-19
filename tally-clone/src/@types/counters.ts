import { z } from "zod";
import type { ObjectValues } from "@/@types/commons";
import colors from "tailwindcss/colors";

export const RESET_TYPE = {
  DAY: "Day",
  WEEK: "Week",
  MONTH: "Month",
  YEAR: "Year",
  NEVER: "Never",
} as const;

export type IResetType = ObjectValues<typeof RESET_TYPE>;

export const COUNTER_COLOR = [
  colors.zinc[400],
  colors.neutral[400],
  colors.slate[400],
  colors.slate[500],
  colors.yellow[600],
  colors.orange[500],
  colors.orange[400],
  colors.amber[400],
  colors.yellow[400],
  colors.lime[500],
  colors.emerald[500],
  colors.green[600],
  colors.teal[500],
  colors.teal[400],
  colors.cyan[600],
  colors.blue[300],
  colors.blue[400],
  colors.blue[500],
  colors.indigo[300],
  colors.indigo[400],
  colors.violet[300],
  colors.violet[400],
  colors.purple[300],
  colors.purple[400],
  colors.purple[500],
  colors.fuchsia[300],
  colors.pink[300],
  colors.pink[400],
  colors.pink[500],
  colors.rose[300],
  colors.rose[400],
] as const;

export type ICounterColor = (typeof COUNTER_COLOR)[number];

const CounterTitle = z.string().min(1, "Cannot be empty").max(15, "Too Long");
const CounterResetType = z.nativeEnum(RESET_TYPE);
const CounterTarget = z.number().min(0, "Targets should be 0 or more");
const CounterColor = z.enum(COUNTER_COLOR);
const CounterIncrement = z.number().min(0, "Increments should be 0 or more");

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
