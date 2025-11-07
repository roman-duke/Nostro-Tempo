export function queryFilterBuilder({ filterObj } : { filterObj?: object }) {
  if (!filterObj) return;

  let sqlFilterConstraint = `WHERE TRUE `;

  for (const key in filterObj) {
    sqlFilterConstraint += `AND ${key} = '${filterObj[key as keyof typeof filterObj]}'`;
  }

  return sqlFilterConstraint;
}
