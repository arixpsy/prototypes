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
  'border-zinc-400',
  'border-neutral-400',
  'border-slate-400',
  'border-slate-500',
  'border-yellow-600',
  'border-orange-500',
  'border-orange-400',
  'border-amber-400',
  'border-yellow-400',
  'border-lime-500',
  'border-emerald-500',
  'border-green-600',
  'border-teal-500',
  'border-teal-400',
  'border-cyan-600',
  'border-blue-300',
  'border-blue-400',
  'border-blue-500',
  'border-indigo-300',
  'border-indigo-400',
  'border-violet-300',
  'border-violet-400',
  'border-purple-300',
  'border-purple-400',
  'border-purple-500',
  'border-fuchsia-300',
  'border-pink-300',
  'border-pink-400',
  'border-pink-500',
  'border-rose-300',
  'border-rose-400'
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
