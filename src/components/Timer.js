import React, { useEffect } from "react";
import { timerFormat } from "../utils/calculations";

function Timer(props) {
  useEffect(() => {
    let timerInterval;

    if (props.isActive) {
      timerInterval = setInterval(() => {
        props.setTime((prevTime) => prevTime + 100);
      }, 100);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [props.isActive, props.time]);

  return (
    <div className="absolute  left-4 top-4  rounded-lg bg-red-500 px-4 py-2  font-rubik text-white drop-shadow-lg">
      <p className="stroke-rose-50 text-2xl font-medium">
        {timerFormat(props.time)}
      </p>
    </div>
  );
}

export default Timer;
