import z, { ZodObject } from "zod";

// type MappedSchema<T extends ZodObject, V extends keyof T["shape"]> = {
//   [P in V extends keyof ]
// }

export default function schemaMapper<
  T extends ZodObject,
  S extends keyof T["shape"],
  R extends Partial<{
    readonly [P in S]: V;
  }>,
  V extends string,
>(inputSchema: T, mapperObj: R) {
  const outputSchema = {} as ZodObject<T["shape"]>;
  // const outputSchema = {} as MappedSchema<T>;

  return outputSchema;
}

const eren = z.object({
  name: z.string(),
  titanId: z.uuid(),
});

const mimi = schemaMapper(eren, { name: "erenJaeger", titanId: "mikasa" });

// Helper types
type MapperObject<T extends PropertyKey, R> = {
  [P in T]: R;
};
