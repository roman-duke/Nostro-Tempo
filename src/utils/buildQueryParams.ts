export function queryFilterBuilder({ filterObj }: { filterObj?: object }) {
  const clauses = [];
  const filterParams: any[] = [];

  if (!filterObj) return { filterClause: "", filterParams };

  for (const key in filterObj) {
    const filterValue = filterObj[key as keyof typeof filterObj] as any;

    if (Array.isArray(filterValue)) {
      const placeholders = filterValue.map(() => '?').join(',');
      clauses.push(`${key} IN (${placeholders})`);
      filterParams.push(...filterValue);
    } else {
      clauses.push(`${key} = ?`);
      filterParams.push(filterValue);
    }
  }

  return {
    filterClause: clauses.length ? "WHERE " + clauses.join(" AND ") : "",
    filterParams,
  };
}
