import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByValue,
  reset,
} from "../features/counter";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);

  const numChangeHandler = (value) => {
    setIncrementAmount(value);
  };

  return (
    <section>
      <p>{count}</p>
      <input
        type="number"
        value={incrementAmount}
        onChange={(e) => numChangeHandler(e.target.value)}
      />
      <div>
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment
        </button>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          Decrement
        </button>
        <button
          onClick={() => {
            dispatch(reset());
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            dispatch(incrementByValue(5));
          }}
        >
          Increment By value
        </button>
      </div>
    </section>
  );
};

export default Counter;
