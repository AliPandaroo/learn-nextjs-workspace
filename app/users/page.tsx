"use client";
import DataTable from "@/src/components/DataTable";
import { useDataTableState } from "@/src/states/data-table-slice";
import React, { useEffect } from "react";

const UsersPage = () => {
  const {
    fetchData,
    fetchedData,
    setPageSize,
    pageSize,
    setColumns,
    columns,
    setSortBy,
    sortBy,
    setSortDir,
    sortDir,
    setFilter,
    filters,
    resetTable,
  } = useDataTableState();

  useEffect(() => {
    setColumns([
      "ID",
      "fullname",
      "username",
      "email",
      "address",
      "phone",
      "createdAt",
    ]);
    console.log({ columns: useDataTableState.getState().columns });
    fetchData(
      "https://679b599233d3168463238bab.mockapi.io/api/v1/users",
      false
    );
  }, [fetchData]);

  return (
    <div>
      <h1>Users List</h1>
      <button onClick={() => setPageSize(pageSize * 2)}>
        page size = multiple
      </button>

      <button onClick={() => resetTable()}>Reset Table</button>
      {pageSize}
      <DataTable
        columns={columns}
        pageSize={pageSize}
        filters={[]}
        sortBy={sortBy}
        sortDir={sortDir}
        data={fetchedData}
      />
    </div>
  );
};

export default UsersPage;
