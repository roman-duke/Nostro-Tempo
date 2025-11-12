// Utility to convert camelCase to snake_case
export default function camelToSnakeCase(camelCase: string) {
  return camelCase.split("").reduce((prev, curr) => {
    let nextLetter = curr;

    const currCharCode = curr.charCodeAt(0);
    if (currCharCode >= 65 && currCharCode <= 90) {
      nextLetter = `_${curr.toLowerCase()}`;
    }

    return prev + nextLetter;
  }, "");
}

// One-liner utility to convert camelCase → snake_case
// function camelToSnake(key: string) {
//   return key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
// }

// One-liner utility to convert snake_case → camelCase
// snake_case → camelCase
export function snakeToCamel(key: string) {
  return key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

export function snakeToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// TODO: Update the typing of this code after the MVP
// (I'd have probably starteed using an ORM then though)
export function remapKeysToCamel<T extends Record<string, any>>(
  obj: T,
): RemapKeysToCamel<T> {
  if (obj === null || typeof obj !== "object") return obj as any;

  if (Array.isArray(obj)) {
    return obj.map((item) => remapKeysToCamel(item)) as any;
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = snakeToCamelCase(key);
    const value = obj[key];
    (acc as T)[camelKey as keyof typeof acc] =
      value && typeof value === "object" && !(value instanceof Date)
        ? remapKeysToCamel(value)
        : value;
    return acc;
  }, {} as T);
}

export function remapKeysToSnake<T extends Record<string, any>>(
  obj: T,
): RemapKeysToSnake<T> {
  if (obj === null || typeof obj !== "object") return obj as any;

  if (Array.isArray(obj)) {
    return obj.map((item) => remapKeysToSnake(item)) as any;
  }

  return Object.keys(obj).reduce((acc, key) => {
    const snake_key = camelToSnakeCase(key);
    const value = obj[key];
    (acc as T)[snake_key as keyof typeof acc] =
      value && typeof value === "object" && !(value instanceof Date)
        ? remapKeysToSnake(value)
        : value;
    return acc;
  }, {} as T);
}

//============================ Utility types ===================//
type SnakeToCamel<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<SnakeToCamel<Tail>>}`
  : S;

type RemapKeysToCamel<T> = {
  [K in keyof T as K extends string ? SnakeToCamel<K> : K]: T[K] extends object
    ? RemapKeysToCamel<T[K]>
    : T[K];
};

type CamelToSnake<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Tail extends Capitalize<Tail>
    ? Tail extends ""
      ? Head
      : `${Head}_${Uncapitalize<CamelToSnake<Tail>>}`
    : `${Head}${CamelToSnake<Tail>}`
  : S;

type RemapKeysToSnake<T> = {
  [K in keyof T as K extends string ? CamelToSnake<K> : K]: T[K] extends object
    ? RemapKeysToSnake<T[K]>
    : T[K];
};
