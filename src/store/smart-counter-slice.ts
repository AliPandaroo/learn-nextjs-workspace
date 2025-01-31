import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SmartCounterState {
  count: number;
  allowNegative: boolean; // Flag negative value

  getCurrentCount: () => number; // ACCESS to the current count without re-rendering

  increment: () => void; // count+1
  decrement: () => void; // count-1

  incrementBy: (value: number) => void; // count+value
  decrementBy: (value: number) => void; // count-value

  multipleBy: (value: number) => void; // result of count*value
  dividedBy: (value: number) => void; // racket of count/value
  moduloBy: (value: number) => void; // remaining of count/value

  absolute?: () => void; // MAKE count positive
  truncate: () => void; // MAKE count an integer

  calculatePercent: (percent: number) => number; // percent of the count
  setCountByPercent: (percent: number) => void; // SET count to a specific percent of its current value

  incrementTo: (target: number) => void; // reach to a TARGET number
  decrementTo: (target: number) => void; // reach to a TARGET number

  asyncAction: (action: () => void, delay?: number) => Promise<void>; // ASYNCHRONOUSLY execute an action after a delay
}

export const useSmartCounterState = create<SmartCounterState>()(
  devtools((set) => ({
    count: 0,
    allowNegative: true,

    getCurrentCount: (): number => {
      return useSmartCounterState.getState().count;
    },

    increment: () => {
      set(
        (state) => ({ count: Number((state.count + 1).toFixed(2)) }),
        undefined,
        "counter/increment"
      );
    },

    decrement: () => {
      set(
        (state) => {
          if (state.allowNegative || state.count > 0) {
            return { count: Number((state.count - 1).toFixed(2)) };
          }
          console.log("The value is minimum!");
          return state;
        },
        undefined,
        "counter/decrement"
      );
    },

    incrementBy: (value) => {
      set(
        (state) => ({ count: Number((state.count + value).toFixed(2)) }),
        undefined,
        "counter/incrementBy"
      );
    },

    decrementBy: (value) => {
      set(
        (state) => {
          if (state.allowNegative || state.count > value) {
            return { count: Number((state.count - value).toFixed(2)) };
          }
          console.log("The value is minimum!");
          return state;
        },
        undefined,
        "counter/decrementBy"
      );
    },

    multipleBy: (value) => {
      set(
        (state) => ({ count: Number((state.count * value).toFixed(2)) }),
        undefined,
        "counter/multipleBy"
      );
    },

    dividedBy: (value) => {
      if (value === 0) {
        console.error("Cannot divide by zero");
        return; // Or handle this case as needed
      }
      return set(
        (state) => ({
          count: Number((state.count / value).toFixed(2)),
        }),
        undefined,
        "counter/dividedBy"
      );
    },

    moduloBy: (value) => {
      set(
        (state) => ({ count: Number((state.count % value).toFixed(2)) }),
        undefined,
        "counter/moduloBy"
      );
    },

    truncate: () => {
      set(
        (state) => ({ count: Math.floor(state.count) }),
        undefined,
        "counter/truncate"
      );
    },

    calculatePercent: (percent): number => {
      const currentCount = useSmartCounterState.getState().count;
      const newCount = (percent / 100) * currentCount;
      return Number(newCount.toFixed(2));
    },

    setCountByPercent: (percent) => {
      set(
        (state) => {
          const newCount = (state.count / 100) * percent;
          return { count: Number(newCount.toFixed(2)) };
        },
        undefined,
        "counter/setCountByPercent"
      );
    },

    incrementTo: (target) => {
      const incrementCount = (currentCount: number) =>
        Math.min(currentCount + 1, target);

      const shouldContinueIncrementing = (
        count: number,
        allowNegative: boolean
      ) => (allowNegative || count >= 0) && count < target;

      const handleIncrement = (state: SmartCounterState) => {
        const { count, allowNegative } = state;
        if (shouldContinueIncrementing(count, allowNegative)) {
          return { count: incrementCount(count) };
        } else {
          console.log("CANNOT REACH TO TARGET!");
          clearInterval(interval);
          return state;
        }
      };

      const interval = setInterval(() => {
        set(
          (state) => handleIncrement(state),
          undefined,
          "counter/incrementTo"
        );
      }, 200);
    },

    decrementTo: (target) => {
      const decrementCount = (currentCount: number) =>
        Math.max(currentCount - 1, target);

      const shouldContinueDecrementing = (
        count: number,
        allowNegative: boolean
      ) => (allowNegative || count <= target) && count > target;

      const handleDecrement = (state: SmartCounterState) => {
        const { count, allowNegative } = state;
        if (shouldContinueDecrementing(count, allowNegative)) {
          return { count: decrementCount(count) };
        } else {
          console.log("CANNOT REACH TO TARGET!");
          clearInterval(interval);
          return state;
        }
      };

      const interval = setInterval(() => {
        set(
          (state) => handleDecrement(state),
          undefined,
          "counter/decrementTo"
        );
      }, 200);
    },

    asyncAction: async (action, delay = 1000) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          action();
          resolve();
        }, delay);
      });
    },
  }))
);
