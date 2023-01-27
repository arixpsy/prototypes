export function deepCloneObject<T extends Object>(obj: T): T {
  return Object.assign(
    {},
    ...Object.entries(obj).map(([k, v]) =>
      typeof v === "object" ? { [k]: deepCloneObject(v) } : { [k]: v }
    )
  ) as T;
}
