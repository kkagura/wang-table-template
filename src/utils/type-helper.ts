export type UnknownObject = Record<string, unknown>;

export type MergeObject<T extends readonly UnknownObject[]> =
  T extends readonly [infer First, ...infer Rest]
    ? First extends UnknownObject
      ? Rest extends readonly UnknownObject[]
        ? First & MergeObject<Rest>
        : First
      : never
    : {};
