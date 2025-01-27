import { create } from "zustand";

interface SmartCounterState {
  count: number;
  getCurrentCount: () => number; // ACCESS to the current count without re-rendering
  increment: () => void; // count+1
  decrement: () => void; // count-1
  incrementTo: (target: number) => void; // reach to a TARGET number
  decrementTo: (target: number) => void; // reach to a TARGET number
  incrementBy: (value: number) => void; // count+value
  decrementBy: (value: number) => void; // count-value
  multipleBy: (value: number) => void; // result of count*value
  dividedBy: (value: number) => void; // racket of count/value
  moduloBy: (value: number) => void; // remaining of count/value
  calculatePercent: (percent: number) => number; // percent of the count
  setCountByPercent: (percent: number) => void; // SET count to a specific percent of its current value
  asyncAction: (action: () => void, delay?: number) => Promise<void>; // ASYNCNOUSLY execute an action after a delay
  truncate: () => void; // MAKE count an intiger
}

export const useSmartCounterState = create<SmartCounterState>((set) => ({
  count: 0,

  getCurrentCount: (): number => {
    // PREVENT TO USE "set()" cause triggers to re-render and reflect the updated value
    return useSmartCounterState.getState().count as number;
  },

  increment: () =>
    set((state) => ({ count: Number((state.count + 1).toFixed(2)) })),
  decrement: () =>
    set((state) => ({ count: Number((state.count - 1).toFixed(2)) })),

  incrementTo: (target) => {
    const interval = setInterval(() => {
      set((state) => {
        if (state.count < target) {
          return { count: Math.min(state.count + 1, target) };
        } else {
          clearInterval(interval);
          console.log("CANNOT REACH TO TARGET");
          return state;
        }
      });
    }, 200);
  },
  decrementTo: (target) => {
    const interval = setInterval(() => {
      set((state) => {
        if (state.count > target) {
          return { count: Math.max(state.count - 1, target) };
        } else {
          clearInterval(interval);
          console.log("CANNOT REACH TO TARGET");
          return state;
        }
      });
    }, 100);
  },

  incrementBy: (value) =>
    set((state) => ({ count: Number((state.count + value).toFixed(2)) })),
  decrementBy: (value) =>
    set((state) => ({ count: Number((state.count - value).toFixed(2)) })),

  multipleBy: (value) =>
    set((state) => ({ count: Number((state.count * value).toFixed(2)) })),
  dividedBy: (value) =>
    set((state) => ({ count: Number((state.count / value).toFixed(2)) })),
  moduloBy: (value) =>
    set((state) => ({ count: Number((state.count % value).toFixed(2)) })),

  truncate: () => set((state) => ({ count: Math.floor(state.count) })),

  calculatePercent: (percent): number => {
    const currentCount = useSmartCounterState.getState().count;
    const newCount = (percent / 100) * currentCount;
    return Number(newCount.toFixed(2));
  },
  setCountByPercent: (percent) =>
    set((state) => {
      const newCount = (state.count / 100) * percent;
      return { count: Number(newCount.toFixed(2)) };
    }),

  asyncAction: async (action, delay = 1000) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        action();
        resolve();
      }, delay);
    });
  },
}));
