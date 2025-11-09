export function queryFilterBuilder({ filterObj }: { filterObj?: object }) {
  const clauses = [];
  const filterParams: any[] = [];

  if (!filterObj) return { clause: "", filterParams };

  for (const key in filterObj) {
    const filterValue = filterObj[key as keyof typeof filterObj] as any;

    if (Array.isArray(filterValue)) {
      clauses.push(`${key} IN (?)`);
      filterParams.push(filterValue.join(","));
    } else {
      clauses.push(`${key} = ?`);
      filterParams.push(filterValue);
    }
    // sqlFilterConstraint += `AND ${key} = '${filterValue}'`;
  }

  // return sqlFilterConstraint;
  return {
    filterClause: clauses.length ? "WHERE " + clauses.join(" AND ") : "",
    filterParams,
  };
}
