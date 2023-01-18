type ObjectValues<T> = T[keyof T];

export const RESET_TYPE = {
  DAY: "Day",
  WEEK: "Week",
  MONTH: "Month",
  YEAR: "Year",
  NEVER: "Never",
} as const;

export type IResetType = ObjectValues<typeof RESET_TYPE>;

export const COUNTER_COLOR = [
  'bg-zinc-400',
  'bg-neutral-400',
  'bg-slate-400',
  'bg-slate-500',
  'bg-yellow-600',
  'bg-orange-500',
  'bg-orange-400',
  'bg-amber-400',
  'bg-yellow-400',
  'bg-lime-500',
  'bg-emerald-500',
  'bg-green-600',
  'bg-teal-500',
  'bg-teal-400',
  'bg-cyan-600',
  'bg-blue-300',
  'bg-blue-400',
  'bg-blue-500',
  'bg-indigo-300',
  'bg-indigo-400',
  'bg-violet-300',
  'bg-violet-400',
  'bg-purple-300',
  'bg-purple-400',
  'bg-purple-500',
  'bg-fuchsia-300',
  'bg-pink-300',
  'bg-pink-400',
  'bg-pink-500',
  'bg-rose-300',
  'bg-rose-400'
] as const

export type ICounterColor = typeof COUNTER_COLOR[number]

export type ICounter = {
  id: string;
  title: string;
  createdAt: number;
  resetType: IResetType;
  target?: number;
  color: string;
  incrementValue?: number;
};

export type IRecord = {
  counterId: string;
  incrementValue: number;
  latestValue: number;
  createdAt: number;
};
