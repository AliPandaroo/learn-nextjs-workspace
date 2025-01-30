import { create } from "zustand";
import { devtools } from "zustand/middleware";

type DataItem = {
  [key: string]: any;
};

interface DataTableState {
  /* PAGE */
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;

  /* SORT */
  sortBy: string;
  sortDir: "ASC" | "DESC";

  /* FILTER */
  filters: string[];

  /* DATA */
  columns: string[];
  setColumns: (columns: string[]) => void;
  fetchedData: DataItem[];

  /* ACTIONS */
  setCurrentPage: (page: number) => void;
  calculateTotalPages: (totalItems: number, pageSize: number) => number;
  setPageSize: (size: number) => void;

  setSortBy: (column: string) => void;
  setSortDir: (direction: "ASC" | "DESC") => void;
  resetSort: () => void;

  setFilter: (filter: string | string[]) => void;
  resetFilters: () => void;

  resetTable: () => void;

  /* ASYNC ACTION */
  fetchData: (url: string, supportsPagination?: boolean) => Promise<void>;
}

export const useDataTableState = create<DataTableState>()(
  devtools((set) => ({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,

    sortBy: "",
    sortDir: "ASC",

    filters: [],

    columns: [],
    setColumns: (columns) =>
      set((state: DataTableState) => ({ columns }), undefined, "column/set"),
    fetchedData: (data: DataItem[]) => {
      set(
        (state: DataTableState) => ({ fetchedData: data }),
        undefined,
        "data/fetchedData"
      );
    },

    setCurrentPage: (page) => {
      set(
        (state: DataTableState) => ({ currentPage: page }),
        undefined,
        "page/current"
      );
    },
    calculateTotalPages: (totalItems, pageSize) => {
      return Math.ceil(totalItems / pageSize);
    },
    setPageSize: (size) => {
      set(
        (state) => {
          if (state.totalItems === 0) return {};

          const newTotalPages = state.calculateTotalPages(
            state.totalItems,
            size
          );
          return { pageSize: size, totalPages: newTotalPages };
        },
        undefined,
        "page/size&total"
      );
    },

    setSortBy: (column) =>
      set(
        (state: DataTableState) => ({ sortBy: column }),
        undefined,
        "sort/column"
      ),
    setSortDir: (direction) => {
      set(
        (state: DataTableState) => ({ sortDir: direction }),
        undefined,
        "sort/direction"
      );
    },
    resetSort: () => {
      set(
        (state: DataTableState) => ({ sortBy: "", sortDir: "ASC" }),
        undefined,
        "sort/reset"
      );
    },

    setFilter: (filter) => {
      set(
        (state: DataTableState) => {
          let newFilters: string[];

          if (Array.isArray(filter)) {
            // filter:<[]>
            // PUSH unique filters from the both arrays
            newFilters = [...new Set([...state.filters, ...filter])];
          } else {
            // filter:<string>
            if (state.filters.includes(filter)) {
              // UNSET filter if it exists in filters[]
              newFilters = state.filters.filter((f) => f !== filter);
            } else {
              // SET filter in filters[]
              newFilters = [...state.filters, filter];
            }
          }

          return { filters: newFilters };
        },
        undefined,
        "filter/set"
      );
    },
    resetFilters: () => {
      set(
        (state: DataTableState) => ({ filters: [] }),
        undefined,
        "filter/reset"
      );
    },

    resetTable: () => {
      set(
        {
          currentPage: 1,
          pageSize: 10,
          totalItems: 0,
          totalPages: 0,
          sortBy: "",
          sortDir: "ASC",
          filters: [],
          columns: [],
          fetchedData: [],
        },
        undefined,
        "table/reset"
      );
    },

    fetchData: async (url, supportsPagination = false) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log({ data });

        // get initial values from state
        const { pageSize, currentPage, calculateTotalPages } =
          useDataTableState.getState();

        const items = data || []; // data
        const meta = supportsPagination ? data.meta : {}; // metadata

        const total_items = supportsPagination
          ? meta.total_items
          : items.length;
        const current_page = supportsPagination
          ? meta.current_page
          : currentPage;
        const page_size = supportsPagination ? meta.page_size : pageSize;
        const total_page = supportsPagination
          ? meta.total_pages
          : calculateTotalPages(total_items, page_size);

        // Update state
        set(
          {
            fetchedData: items,
            currentPage: current_page,
            pageSize: page_size,
            totalItems: total_items,
            totalPages: total_page,
          },
          undefined,
          "data/request"
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  }))
);
