import type { ReactNode } from 'react';

interface DataTableProps {
  /** Visible caption, also the accessible name of the scroll region. */
  caption: string;
  headers: readonly string[];
  rows: readonly { header: string; cells: readonly ReactNode[] }[];
  /** Label for the first (row header) column. */
  cornerLabel: string;
}

/**
 * Semantic table with a caption, column headers and row headers. The wrapper scrolls sideways on
 * narrow screens and is keyboard focusable, so the table never forces the page to scroll.
 */
export function DataTable({ caption, headers, rows, cornerLabel }: DataTableProps) {
  return (
    <div role="region" aria-label={caption} tabIndex={0} className="overflow-x-auto rounded-xl border border-warm-200 bg-white">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm md:text-base">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className="bg-navy-800 px-4 py-3 font-semibold text-white">
              {cornerLabel}
            </th>
            {headers.map((header) => (
              <th key={header} scope="col" className="bg-navy-800 px-4 py-3 font-semibold text-white">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.header} className="border-t border-warm-200 align-top">
              <th scope="row" className="bg-warm-100 px-4 py-3 font-semibold text-navy-900">
                {row.header}
              </th>
              {row.cells.map((cell, index) => (
                <td key={`${row.header}-${index}`} className="px-4 py-3 text-navy-800">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
