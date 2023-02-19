import type { ICounterColor } from "@/@types/counters";
import { z } from "zod";

const RecordIncrementValue = z
  .number({
    required_error: "Cannot be empty",
    invalid_type_error: "Cannot be empty",
  })
  .min(1, "Invalid increment");

export const RecordSchema = z.object({
  id: z.string(),
  counterId: z.string(),
  incrementValue: RecordIncrementValue,
  createdAt: z.number(),
  labels: z.array(z.string()),
  description: z.string(),
});

export type IRecord = z.infer<typeof RecordSchema>;

export const RecordFormSchema = z.object({
  incrementValue: RecordIncrementValue,
  labels: z.array(z.string()),
  description: z.string(),
});

export type CustomIncrementEvent = {
  counterId: string;
  counterColor: ICounterColor;
  counterTitle: string;
  latestValue: number;
};
