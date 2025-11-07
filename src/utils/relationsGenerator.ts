export default function relationsBuilder<
  T extends { id: string },
  S extends string,
>(arr: T[], relationSearchKey: S, relationKey: string) {
  const map = new Map<string, object>();

  // Find all the keys that do not belong in the top level.
  const relationKeyArr: Extract<keyof T, string>[] = [];
  for (const key in arr[0]) {
    if (key.startsWith(relationSearchKey)) {
      relationKeyArr.push(key);
    }
  }

  const result = arr.reduce((acc, curr) => {
    if (!acc.has(curr.id)) {
      const restOfObj = {} as typeof curr;

      for (const key in curr) {
        if (!key.startsWith(relationSearchKey)) {
          restOfObj[key] = curr[key];
        }
      }

      const nestedVal = Object.fromEntries(
        relationKeyArr.map((val) => [
          val.replace(`${relationSearchKey}_`, ""),
          curr[val],
        ]),
      );

      const newObj = {
        ...restOfObj,
        [relationKey]: [nestedVal],
      };

      acc.set(curr.id, newObj);
    } else {
      const mapValue = acc.get(curr.id) as object;

      const nestedVal = Object.fromEntries(
        relationKeyArr.map((val) => [
          val.replace(`${relationSearchKey}_`, ""),
          curr[val],
        ]),
      );

      (mapValue[relationKey as keyof typeof mapValue] as object[]).push(
        nestedVal,
      );
    }

    return acc;
  }, map);

  return Array.from(result.values());
}
