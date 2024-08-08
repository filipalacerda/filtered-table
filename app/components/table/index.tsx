import type { Product, Property } from "../../types/types";

type TableProps = {
  headers: Property[];
  rows: Product[];
};

/**
 * Creates a table component given the data strucutre of `products` object.
 * Each row has an array of cells
 * @param param0
 */
const Table = ({ headers, rows }: TableProps) => {
  return (
    <table className="min-w-full text-left text-sm font-light text-surface">
      <thead className="border-b border-neutral-200 font-medium">
        <tr>
          {headers.map((header) => (
            <th key={header.id} scope="col" className="px-6 py-4">
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row: Product) => (
          <tr key={row.id} className="border-b border-neutral-200">
            {row.property_values.map((cell) => (
              <td
                key={cell.property_id}
                className="whitespace-nowrap px-6 py-4"
              >
                {cell.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
