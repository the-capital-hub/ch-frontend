import React, { useState, useEffect } from "react";
import "./table.scss";

const Table = ({ hidden, page, setTable, data }) => {
  const initialData = {
    rows: [],
  };

  const [tableData, setTableData] = useState(initialData);

  useEffect(() => {
    setTableData(data);
    // console.log(data);
  }, [data]);

  const addColumn = () => {
    setTableData((prevData) => ({
      rows: prevData.rows.map((row) => ({
        ...row,
        values: [...row.values, ""],
      })),
    }));
  };

  const addRow = () => {
    const columnName = prompt(
      "Enter a name for the new row:",
      `Row ${tableData.rows.length + 1}`
    );

    if (columnName !== null) {
      const newRow = {
        label: columnName,
        values: Array(tableData.rows[0].values.length).fill(""),
      };
      setTableData((prevData) => ({
        rows: [...prevData.rows, newRow],
      }));
    }
  };

  const handleValueChange = (rowIndex, colIndex, value) => {
    const updatedData = {
      rows: tableData.rows.map((row, rIndex) => ({
        ...row,
        values:
          rIndex === rowIndex
            ? row.values.map((v, cIndex) => (cIndex === colIndex ? value : v))
            : row.values,
      })),
    };
    setTableData(updatedData);
    setTable(updatedData);
  };

  return (
    <>
      <div className="table-container">
        <h2 className={hidden && "hidden"}>Projections</h2>

        <table>
          <tbody>
            {tableData?.rows?.map((row, rowIndex) => (
              <tr key={row.label}>
                <th>{row.label}</th>
                {row?.values.map((value, colIndex) => (
                  <td key={`${row.label}${colIndex}`}>
                    {page === "oneLinkEditPage" ? (
                      <input
                        className="table_input"
                        placeholder="0"
                        value={value}
                        onChange={(e) =>
                          handleValueChange(rowIndex, colIndex, e.target.value)
                        }
                      />
                    ) : (
                      `${value}`
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {page === "oneLinkEditPage" && (
          <button
            onClick={addRow}
            className="add_row_btn startup"
            style={{ marginRight: "10px" }}
          >
            + Add Row
          </button>
        )}
        {page === "oneLinkEditPage" && (
          <button onClick={addColumn} className="add_row_btn startup">
            + Add Column
          </button>
        )}
      </div>
    </>
  );
};

export default Table;
