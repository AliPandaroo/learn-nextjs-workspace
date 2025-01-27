"use client";
import React from "react";
import NumberFlow from "@number-flow/react";

import { useSmartCounterState } from "../states/smart-counter-slice";

export const SmartCounter: React.FC = () => {
  const {
    count,
    getCurrentCount,
    increment,
    decrement,
    incrementTo,
    decrementTo,
    incrementBy,
    decrementBy,
    multipleBy,
    dividedBy,
    moduloBy,
    calculatePercent,
    setCountByPercent,
    asyncAction,
    truncate,
  } = useSmartCounterState();

  const handleAsyncChange = async (func: () => void) => {
    await asyncAction(func, 2000); // Execute the action after a delay of 2000 milliseconds
    console.log(`Count after async change is now ${getCurrentCount()}`);
  };

  const handleCalculatePercent = (percent: number) => {
    const result = calculatePercent(percent);
    alert(`${percent}% of ${count} is ${result}`);
  };

  const handleTruncate = () => {
    const truncatedValue = truncate();
  };

  return (
    <div className="p-5">
      <div className="flex gap-2 items-baseline justify-start w-fit">
        <h1>Current Count :</h1>
        <NumberFlow
          value={count ?? 60}
          suffix="number"
          className="group text-3xl md:text-6xl [&::part(right)]:ms-1 [&::part(right)]:text-sm"
        />
      </div>
      <div className="flex w-full max-w-[500px] gap-1 flex-wrap place-content-between place-items-center mx-auto">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={() => incrementBy(5)}>Increment by 5</button>
        <button onClick={() => decrementBy(5)}>Decrement by 5</button>
        <button onClick={() => multipleBy(2)}>Multiply by 2</button>
        <button onClick={() => dividedBy(2)}>Divide by 2</button>
        <button onClick={() => moduloBy(3)}>Modulo by 3</button>
        <button onClick={() => handleCalculatePercent(75)}>
          Calculate 75% of Count
        </button>
        <button onClick={() => setCountByPercent(33)}>Set Count to 33%</button>
        <button onClick={() => setCountByPercent(25)}>Set Count to 25%</button>
        <button onClick={() => handleAsyncChange(() => multipleBy(2))}>
          Multiply by 2 After Delay
        </button>
        <button onClick={handleTruncate}>Truncate Count</button>
        <button onClick={() => incrementTo(23)}>Increment to 23</button>
        <button onClick={() => decrementTo(5)}>Decrement to 5</button>
      </div>
    </div>
  );
};

export default SmartCounter;
