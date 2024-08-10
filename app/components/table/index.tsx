import type { Product, Property } from "../../types/types";

import "./styles.css";

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
    <table className="table">
      <thead className="table-header">
        <tr>
          {headers.map((header) => (
            <th key={header.id} scope="col" className="header-cell">
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row: Product) => (
            <tr key={row.id} className="table-row">
              {row.property_values.map((cell) => (
                <td key={cell.property_id} className="cell">
                  {cell.value}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td className="cell no-results" colSpan={headers.length}>
              No results found! Please try another search combination.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
