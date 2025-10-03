import { ZodObject } from "zod";

/**
 * ### TODO - Support remapping of nested objects.
 * Maps the keys of a Zod object schema into new keys during transformation.
 *
 * This function takes an input zod schema (`inputSchema`) and a mapper object (`mapperObj`).
 *
 * The mapper defines how keys in the schema should be renamed when the schema's `.transform()` is applied.
 *
 * For each key in the input data:
 * - If the key exists in `mapperObj`, the value will be assigned to the new mapped key.
 * - Otherwise, the key is preserved as-is.
 *
 * ### Example
 * ```ts
 * const inputSchema = z.object({
 *   name: z.string(),
 *   age: z.number(),
 *   titanId: z.string(),
 * });
 *
 * const mapperObj = {
 *   name: "eren-jaeger",
 *   titanId: "titan_id",
 * };
 *
 * const mappedSchema = schemaMapper(inputSchema, mapperObj);
 * 
 * mappedSchema.parse({ name: "Eren", age: 19, titanId: "57584-88293" })
 *
 * // Output: { "eren-jaeger": "Eren", age: 19, "titan_id": "57584-88293" }
 * ```
 * @param inputSchema - The Zod schema to transform.
 *
 * @param mapperObj - An object mapping schema keys to new key names.
 */
export default function schemaMapper<
  V extends string,
  T extends ZodObject,
  R extends MappedType<T, V>,
>(inputSchema: T, mapperObj: Partial<R>) {
  const outputSchema = {} as MappedSchema<T, R>;

  return inputSchema.transform((data) => {
    for (const key in data) {
      if (key in mapperObj) {
        // @ts-ignore
        outputSchema[mapperObj[key]] = data[key];
      } else {
        //@ts-ignore
        outputSchema[key] = data[key];
      }
    }
    return outputSchema;
  });
}

// Helper types
type MappedType<T extends ZodObject, V extends string> = {
  readonly [P in keyof T["shape"]]: V;
};

type MappedSchema<
  T extends ZodObject,
  R extends {
    [P in keyof T["shape"]]: string;
  },
> = {
  [P in keyof T["shape"] as P extends keyof R ? R[P] : P]: T["shape"][P];
};
