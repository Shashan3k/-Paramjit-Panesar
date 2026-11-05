import { DataTable } from './DataTable';
import { ACCESS_COMPARISON } from '@/data/practice';

/** Table 1: primary care access options, from ACCESS_COMPARISON. Names no other provider. */
export function ComparisonTable() {
  return (
    <>
      <DataTable
        caption={ACCESS_COMPARISON.caption}
        cornerLabel="What to compare"
        headers={ACCESS_COMPARISON.columns}
        rows={ACCESS_COMPARISON.rows.map((row) => ({ header: row.label, cells: row.cells }))}
      />
      <p className="mt-3 text-sm text-navy-700">{ACCESS_COMPARISON.caption}</p>
    </>
  );
}
