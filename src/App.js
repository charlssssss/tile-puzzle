import { useState } from "react";
import Puzzle from "./components/Puzzle";
import Timer from "./components/Timer";

export default function App() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const dimension = {
    x: 4,
    y: 4,
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-blue-50 font-gabarito">
      <Timer
        time={time}
        setTime={setTime}
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <Puzzle
        dimension={dimension}
        time={time}
        setTime={setTime}
        isActive={isActive}
        setIsActive={setIsActive}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
      />
    </div>
  );
}
