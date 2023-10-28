import { useState } from "react";
import Puzzle from "../components/Puzzle";
import Timer from "../components/Timer";
import Modal from "../components/Modal";
import { AiFillSetting } from "react-icons/ai";

const TilePuzzle = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [settings, setSettings] = useState({
    dimension: {
      x: 3,
      y: 3,
    },
    color: {},
  });

  const SettingsModalContent = () => {
    return (
      <div>
        <label htmlFor="dimension">dimension: </label>
        <select
          id="dimension"
          defaultValue={settings.dimension.x}
          onChange={(e) => {
            const { value } = e.target;
            setSettings((prevState) => ({
              ...prevState,
              dimension: {
                x: value,
                y: value,
              },
            }));
          }}
        >
          <option value="3">3x3</option>
          <option value="4">4x4</option>
          <option value="5">5x5</option>
          <option value="6">6x6</option>
          <option value="7">7x7</option>
          <option value="8">8x8</option>
          <option value="9">9x9</option>
          <option value="10">10x10</option>
        </select>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center font-gabarito">
      <button
        className="absolute right-4 top-4 z-10 rounded-lg bg-[#171717] p-2 active:scale-95"
        onClick={() => setIsSettingModalOpen(true)}
      >
        <AiFillSetting size={25} color="white" />
      </button>

      <Modal
        isOpen={isSettingModalOpen}
        setIsOpen={() => setIsSettingModalOpen(false)}
        modalTitle={"Puzzle Settings"}
        modalContent={SettingsModalContent()}
        modalButton={"Save"}
      />

      <Timer
        time={time}
        setTime={setTime}
        isActive={isActive}
        setIsActive={setIsActive}
      />

      <Puzzle
        dimension={settings.dimension}
        time={time}
        setTime={setTime}
        isActive={isActive}
        setIsActive={setIsActive}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
      />
    </div>
  );
};

export default TilePuzzle;
