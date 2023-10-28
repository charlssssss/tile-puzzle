import { useState } from "react";
import Puzzle from "../components/Puzzle";
import Timer from "../components/Timer";
import Modal from "../components/Modal";
import { AiFillSetting } from "react-icons/ai";
import gameColor from "../utils/gameColor";

const TilePuzzle = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [settings, setSettings] = useState({
    dimension: { x: 3, y: 3 },
    color: 0,
    isTransitionEnabled: true,
  });

  const dimensionOptions = [];
  for (let i = 3; i <= 10; i++) {
    dimensionOptions.push(<option key={i} value={i}>{`${i} x ${i}`}</option>);
  }

  const handleChangeDimension = (e) => {
    const { value } = e.target;
    setSettings((prevState) => ({
      ...prevState,
      dimension: {
        x: value,
        y: value,
      },
    }));
  };

  const handleChangeColorSheme = (e) => {
    const { value } = e.target;
    setSettings((prevState) => ({
      ...prevState,
      color: value,
    }));
  };

  const handleChangeTransitionEnabled = () => {
    setSettings((prevState) => ({
      ...prevState,
      isTransitionEnabled: !prevState.isTransitionEnabled,
    }));
  };

  const SettingsModalContent = () => {
    return (
      <div className="flex flex-col items-center gap-4 text-sm">
        <div>
          <label htmlFor="dimension" className="font-medium">
            Dimension:
          </label>
          <select
            id="dimension"
            className="px-2 py-1"
            defaultValue={settings.dimension.x}
            onChange={handleChangeDimension}
          >
            {dimensionOptions}
          </select>
        </div>

        <div>
          <label htmlFor="color-scheme" className="font-medium">
            Color Scheme:
          </label>
          <select
            id="color-scheme"
            className="px-2 py-1"
            defaultValue={settings.color}
            onChange={handleChangeColorSheme}
          >
            {gameColor.map((color, idx) => (
              <option key={idx} value={idx}>
                {color.name}
              </option>
            ))}
          </select>
        </div>

        <div className="ite flex gap-2">
          <label htmlFor="transition" className="font-medium">
            Tile Transition
          </label>
          <input
            id="transition"
            type="checkbox"
            checked={settings.isTransitionEnabled}
            onChange={handleChangeTransitionEnabled}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center font-gabarito">
      <button
        className={`absolute right-4 top-4 z-10 rounded-lg p-2 active:scale-95 ${
          gameColor[settings.color].correctTile
        } ${gameColor[settings.color].correctText}`}
        onClick={() => setIsSettingModalOpen(true)}
      >
        <AiFillSetting size={25} />
      </button>

      <Modal
        isOpen={isSettingModalOpen}
        setIsOpen={() => setIsSettingModalOpen(false)}
        modalTitle={"Puzzle Settings"}
        modalContent={SettingsModalContent()}
        modalButton={"Save"}
        color={settings.color}
      />

      <Timer
        time={time}
        setTime={setTime}
        isActive={isActive}
        setIsActive={setIsActive}
        color={settings.color}
      />

      <Puzzle
        settings={settings}
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
