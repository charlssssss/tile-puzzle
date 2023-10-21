import React, { useEffect } from "react";

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

  const minutes = Math.floor(props.time / 60000);
  const seconds = Math.floor((props.time % 60000) / 1000);

  return (
    <div className="absolute  left-4 top-4  rounded-lg bg-red-500 px-4 py-2  font-rubik text-white drop-shadow-lg">
      <p className="stroke-rose-50 text-2xl font-medium tracking-wider">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
    </div>
  );
}

export default Timer;
