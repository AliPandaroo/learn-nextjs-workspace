import React from "react";
type DataItem = {
  [key: string]: any;
};

interface DataTableProps {
  columns: string[];
  pageSize: number;
  filters: string[];
  sortBy: string;
  sortDir: "ASC" | "DESC";
  data: DataItem[];
}
const DataTable: React.FC<DataTableProps> = ({ columns, pageSize, data }) => {
  return (
    <div>
      <h1>Data Table</h1>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        {data && Array.isArray(data) && (
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                {columns.map((column) => (
                  <React.Fragment key={column}>
                    {column == "ID" && <td key={column}>{user.id}</td>}
                    {column != "ID" && <td key={column}>{user[column]}</td>}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default DataTable;
