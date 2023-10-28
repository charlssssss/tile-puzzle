import React, { useEffect } from "react";
import { timerFormat } from "../utils/calculations";
import gameColor from "../utils/gameColor";

function Timer(props) {
  const { color } = props;

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
    <div
      className={`absolute  left-4 top-4 z-10 rounded-lg px-4 py-2 ${gameColor[color].correctText} ${gameColor[color].correctTile}`}
    >
      <p className="stroke-rose-50 text-2xl font-bold">
        {timerFormat(props.time)}
      </p>
    </div>
  );
}

export default Timer;
