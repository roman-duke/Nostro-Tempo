import z, { ZodObject } from "zod";

export default function generateSchema<T extends ZodObject>(
  schema: T,
  mapper: (key: string) => string,
) {
  const newShape: Record<string, keyof T["shape"]> = {};

  for (const key in schema.shape) {
    newShape[mapper(key)] = schema.shape[key];
  }

  return z.object(newShape);
}
