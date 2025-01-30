"use client";
import DataTable from "@/src/components/DataTable";
import { useDataTableState } from "@/src/states/data-table-slice";
import React, { useEffect } from "react";

const UsersPage = () => {
  const { fetchData, pageSize } = useDataTableState();

  useEffect(() => {
    fetchData(
      "https://679b599233d3168463238bab.mockapi.io/api/v1/users",
      false
    );
  }, [fetchData]);

  return (
    <div>
      <h1>Users List</h1>
      {pageSize}
      <DataTable />
    </div>
  );
};

export default UsersPage;
