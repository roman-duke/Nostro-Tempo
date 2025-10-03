import z, { ZodObject } from "zod";

export default function schemaMapper<
  V extends string,
  T extends ZodObject,
  R extends MappedType<T, V>,
>(inputSchema: T, mapperObj: Partial<R>) {
  // const outputSchema = {} as ZodObject<T["shape"]>;
  const outputSchema = {} as MappedSchema<T, R>;

  return outputSchema;
}

const eren = z.object({
  name: z.string(),
  titanId: z.uuid(),
});

const mimi = schemaMapper(eren, { name: "erenJaeger", titanId: "eren", jere: ""});

// Helper types
type MappedType<
  T extends ZodObject,
  V extends string,
> = {
  readonly [P in keyof T["shape"]]: V;
};

type MappedSchema<
  T extends ZodObject,
  R extends {
    [P in keyof T["shape"]]: string;
  }
> = {
  [P in keyof T["shape"] as P extends keyof R ? R[P] : P]: T["shape"][P];
};
