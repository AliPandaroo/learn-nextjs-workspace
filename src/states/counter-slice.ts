import { create } from "zustand";
interface CounterState {
  count: number;
  increament: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounter = create<CounterState>((set) => ({
  count: 0,
  increament: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set(() => ({ count: 0 })),
}));
