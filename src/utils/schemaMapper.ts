// import z, { ZodObject } from "zod";

// export default function schemaMapper<
//   V extends string,
//   T extends ZodObject,
//   S extends keyof T["shape"],
//   R extends Partial<MappedType<T, S, V>>,
// >(inputSchema: T, mapperObj: R) {
//   const outputSchema = {} as ZodObject<T["shape"]>;
//   // const outputSchema = {} as MappedSchema<T, S, V, R>;

//   return outputSchema;
// }

// const eren = z.object({
//   name: z.string(),
//   titanId: z.uuid(),
// });

// const mimi = schemaMapper(eren, { name: "erenJaeger", });

// // Helper types
// type MappedType<
//   T extends ZodObject,
//   K extends keyof T["shape"],
//   V extends string,
// > = {
//   readonly [P in K]: V;
// };

// // type MappedSchema<
// //   T extends ZodObject,
// //   K extends keyof T["shape"],
// //   V extends string,
// //   R extends Partial<MappedType<T, K, V>>
// // > = {
// //   [P in K as ]: string;
// // };


type Eren = {
  name: string,
  age: number,
  gender: "male" | "female",
}

const remappedEren = {
  name: "eren-jaeger",
  gender: "male",
} as const;

// This leverages typescript's key remapping
type MappedType<
  T extends Record<string, PropertyKey>,
  M extends Record<string, PropertyKey>,
> = {
  [P in keyof T as P extends keyof M ? M[P] : P]: T[P];
};

type Test = MappedType<Eren, typeof remappedEren>;
