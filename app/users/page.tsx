"use client";
import DataTable from "@/src/components/DataTable";
import { useDataTableState } from "@/src/store/data-table-slice";
import { useDynamicLoadingState } from "@/src/store/dynamic-loading-slice";
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

  const { loadingStates, setLoading, clearLoading } = useDynamicLoadingState();

  async function GetUsers() {
    setLoading("users_list", true);
    setLoading("payments_list", true);
    setLoading("orders_list", true);
    setLoading("order_list", true);

    try {
      await fetchData(
        "https://679b599233d3168463238bab.mockapi.io/api/v1/users",
        false
      );
    } catch (error) {
    } finally {
      console.log("Data fetched successfully!");
      setLoading("users_list", false);
      clearLoading("orders_list");
      clearLoading(["users_list", "payments_list"]);
    }
  }

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
    GetUsers();
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
