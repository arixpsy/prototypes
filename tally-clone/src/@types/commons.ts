export type ObjectValues<T> = T[keyof T];

export const KEY_EVENT = {
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  N_KEY: 78,
  E_KEY: 69,
} as const;

export type IKeyEvent = ObjectValues<typeof KEY_EVENT>;
