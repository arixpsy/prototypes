import type { ICounterColor } from "@/@types/counters";
import { z } from "zod";

export const RecordSchema = z.object({
  id: z.string(),
  counterId: z.string(),
  incrementValue: z.number().min(1),
  latestValue: z.number(),
  createdAt: z.number(),
  labels: z.array(z.string()),
  description: z.string(),
});

export type IRecord = z.infer<typeof RecordSchema>;

export type CustomIncrementEvent = {
  counterId: string;
  counterColor: ICounterColor;
  counterTitle: string;
  latestValue: number;
};
