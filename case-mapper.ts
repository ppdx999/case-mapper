export type SnakeToCamel<T extends string> = T extends `${infer L}_${infer R}`
  ? `${L}${Capitalize<SnakeToCamel<R>>}`
  : T;
export type CamelToSnake<T extends string> = T extends `${infer L}${infer R}`
  ? `${L extends Capitalize<L> ? "_" : ""}${Lowercase<L>}${CamelToSnake<R>}`
  : T;

export type CamelToSnakeKeys<T> = T extends Record<string, unknown> ? {
    [K in keyof T as CamelToSnake<string & K>]: CamelToSnakeKeys<T[K]>;
  }
  : T extends Array<infer U> ? Array<CamelToSnakeKeys<U>>
  : T;

export type SnakeToCamelKeys<T> = T extends Record<string, unknown> ? {
    [K in keyof T as SnakeToCamel<string & K>]: SnakeToCamelKeys<T[K]>;
  }
  : T extends Array<infer U> ? Array<SnakeToCamelKeys<U>>
  : T;

export const camelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const snakeToCamel = (str: string) =>
  str.replace(/_[a-z]/g, (letter) => letter[1].toUpperCase());

const isPrimitive = (obj: unknown) => obj === null || typeof obj !== "object";

const isArray = (obj: unknown) => Array.isArray(obj);

const toXCase = (replace: (s: string) => string) => {
  // deno-lint-ignore no-explicit-any
  return function recurse(obj: any) {
    if (isPrimitive(obj)) {
      return obj;
    }
    if (isArray(obj)) {
      // deno-lint-ignore no-explicit-any
      return obj.map((item: any) => recurse(item));
    }

    // deno-lint-ignore no-explicit-any
    const result: any = {};
    Object.keys(obj).forEach((key) => {
      result[replace(key)] = recurse(obj[key]);
    });
    return result;
  };
};

export const camelToSnakeKeys = <T>(obj: T): CamelToSnakeKeys<T> => {
  return toXCase(camelToSnake)(obj);
};

export const snakeToCamelKeys = <T>(obj: T): SnakeToCamelKeys<T> => {
  return toXCase(snakeToCamel)(obj);
};
