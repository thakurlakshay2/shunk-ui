"use-client";

import { useEffect, useState } from "react";
import { Pagination } from "../Pagination";
import {
  tableHeadingClassName,
  tableRowsStringClassName,
} from "../styles/commonStyles";
import { DataTableProps, TableRows } from "./typings";

export const Datatable: React.FC<DataTableProps> = ({
  headers,
  rows,
  columnSizes,
}) => {
  const [showRow, setShowRows] = useState<TableRows[][]>(rows.slice(0, 25));
  useEffect(() => {
    setShowRows(rows.slice(0, 25));
  }, [rows]);
  return (
    <div className="flex flex-col w-[100%]">
      <div className=" overflow-x-auto pb-4">
        <div className="block">
          <div className="overflow-x-auto w-full  border rounded-lg border-gray-300 h-70vh">
            <table className="relative w-full rounded-xl">
              <thead className="sticky top-0 bg-gray-50 z-10">
                <tr className="bg-gray-50">
                  {headers.map((header, idx) => {
                    return (
                      <th
                        key={header.field}
                        scope="col"
                        style={{
                          minWidth: columnSizes
                            ? `${columnSizes[idx]}%`
                            : "auto",
                        }}
                        className={tableHeadingClassName}
                      >
                        {header.component}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 w-100">
                {showRow.map((rowData, id) => {
                  return (
                    <tr
                      style={{ width: "100%" }}
                      key={id + "rowData"}
                      className="bg-white transition-all duration-500 hover:bg-gray-50"
                    >
                      {rowData.map((row, idx) => {
                        return (
                          <td
                            style={{
                              minWidth: columnSizes
                                ? `${columnSizes[idx]}%`
                                : "auto",
                            }}
                            key={row.field}
                            className={
                              row.className || tableRowsStringClassName
                            }
                          >
                            {row.component}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <nav
            className="flex items-center justify-center py-4 "
            aria-label="Table navigation"
          >
            <ul className="flex items-center justify-center text-sm h-auto gap-12">
              <Pagination
                pageSize={25}
                defaultSelectedPage={0}
                total={rows.length}
                onClick={function (pageNumber: number): void {
                  const start = pageNumber * 25;
                  const end = (pageNumber + 1) * 25;
                  setShowRows(rows.slice(start, end));
                }}
              />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
