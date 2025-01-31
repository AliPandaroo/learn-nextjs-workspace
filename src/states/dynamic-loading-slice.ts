import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type DynamicLoading = {
  loadingStates: Record<string, boolean>;
};

interface DynamicLoadingState extends DynamicLoading {
  // DynamicLoading
  setLoading: (key: string, isLoading: boolean) => void; // e.g. setLoading("usersList", true)
  clearLoading: (key?: string | string[]) => void; // if key is not mentioned, it will reset all loadings
}

export const useDynamicLoadingState = create<DynamicLoadingState>()(
  devtools((set) => ({
    loadingStates: {},

    setLoading: (key: string, isLoading: boolean) => {
      set(
        (state) => {
          const iskeyExists = state.loadingStates.hasOwnProperty(key);

          // isLoading is falsy ?
          if (!isLoading) {
            // the key exists ?
            if (iskeyExists) {
              return {
                loadingStates: { ...state.loadingStates, [key]: isLoading },
              };
            } else {
              console.warn(`The "${key}" state doesn't exist!`);
              return state;
            }
          } else {
            // isLoading is truthy ?
            if (iskeyExists) {
              console.warn(`The "${key}" state is already exists`);
              return state;
            } else {
              return {
                loadingStates: {
                  ...state.loadingStates,
                  [key]: isLoading,
                },
              };
            }
          }
        },
        undefined,
        `loading:${key}/set`
      );
    },

    clearLoading: (key) => {
      set(
        (state) => {
          // key is mentioned ?
          if (key) {
            // <string>
            if (typeof key === "string") {
              // key exists in state ?
              const isKeyExists = state.loadingStates.hasOwnProperty(key);

              if (isKeyExists) {
                const { [key]: _, ...rest } = state.loadingStates; // DISCARD the specified key
                return { loadingStates: rest }; // REMOVE the state.loadingStates[key]
              } else {
                return { loadingStates: state.loadingStates }; // KEEP all safe
              }
            } else {
              // <string[]>
              const newLoadingStates = { ...state.loadingStates };
              key.forEach((k) => {
                if (newLoadingStates.hasOwnProperty(k)) {
                  delete newLoadingStates[k]; // DISCARD the specified key
                } else {
                  console.warn(`The state for key "${k}" doesn't exist!`);
                }
              });
              return { loadingStates: newLoadingStates };
            }
          } else {
            // If no key is mentioned, CLEAR ALL loadings
            return { loadingStates: {} };
          }
        },
        undefined,
        `loading:${Array.isArray(key) ? "Multiple" : key || "All"}/clear`
      );
    },
  }))
);
