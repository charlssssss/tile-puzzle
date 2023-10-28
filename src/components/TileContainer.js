import gameColor from "../utils/gameColor";

const TileContainer = (props) => {
  const { color, isTransitionEnabled } = props.settings;

  const transition = isTransitionEnabled ? "transition-all" : "";
  const tileColor =
    props.idx === props.pos && !props.empty
      ? gameColor[color].correctTile
      : props.empty
      ? "bg-[#ffffff]"
      : // : props.hasEmptySide
        // ? "bg-blue-500"
        gameColor[color].defaultTile;
  const tileText =
    props.empty || props.idx === props.pos
      ? gameColor[color].correctText
      : gameColor[color].defaultText;
  const tileCursor =
    props.idx === props.pos && !props.empty
      ? "cursor-default"
      : props.empty
      ? "cursor-not-allowed"
      : props.hasEmptySide
      ? "cursor-pointer"
      : "cursor-not-allowed";
  return (
    <div
      className={`relative flex h-[100px] w-[100px] items-center justify-center overflow-hidden p-5 active:scale-90 ${tileCursor} ${transition} ${tileColor} ${tileText}
      `}
      onClick={() => props.handleMove()}
    >
      <h2 className="text-3xl font-bold">{!props.empty && props.pos}</h2>
      {/* <p className="text-xs">{props.idx}</p> */}
    </div>
  );
};

export default TileContainer;
