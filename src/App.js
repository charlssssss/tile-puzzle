import { useState } from "react";
import Puzzle from "./components/Puzzle";
import Timer from "./components/Timer";
import Modal from "./components/Modal";

export default function App() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const dimension = {
    x: 4,
    y: 4,
  };

  const FinishedModalContent = () => {
    return (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at sem
        sem. Nulla eget tellus in sem mollis eleifend sed vitae augue. Donec eu
        quam lacus. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus.
      </p>
    );
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-blue-50 font-gabarito">
      <Modal
        isOpen={isFinished}
        setIsOpen={() => setIsFinished(false)}
        modalTitle={"Puzzle Solved!"}
        modalContent={FinishedModalContent()}
        modalButton={"Play Again"}
      />

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
