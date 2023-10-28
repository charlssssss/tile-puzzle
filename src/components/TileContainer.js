const TileContainer = (props) => {
  const tileColor =
    props.idx === props.pos && !props.empty
      ? "bg-[#171717]"
      : props.empty
      ? "bg-[#ffffff]"
      : // : props.hasEmptySide
        // ? "bg-blue-500"
        "bg-[#494949]";
  const tileText =
    props.empty || props.idx === props.pos ? "text-white" : "text-blue-50";
  return (
    <div
      className={`relative flex h-[100px] w-[100px] items-center justify-center overflow-hidden p-5 transition-all active:scale-90 ${tileColor} ${tileText}
      `}
      onClick={() => props.handleMove()}
    >
      <h2 className="text-3xl font-bold">{!props.empty && props.pos}</h2>
      {/* <p className="text-xs">{props.idx}</p> */}
    </div>
  );
};

export default TileContainer;
