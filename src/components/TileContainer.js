const TileContainer = (props) => {
  const tileColor =
    props.idx === props.pos && !props.empty
      ? "bg-red-500"
      : props.empty
      ? "bg-blue-50"
      : // : props.hasEmptySide
        // ? "bg-blue-500"
        "bg-blue-700";
  const tileText =
    props.empty || props.idx === props.pos ? "text-black" : "text-blue-50";
  return (
    <div
      className={`flex h-[100px] w-[100px] items-center justify-center border border-transparent p-5  transition-all active:scale-90 ${tileColor} ${tileText}`}
      onClick={() => props.handleMove()}
    >
      <h2 className="text-3xl font-bold">{!props.empty && props.pos}</h2>
      {/* <p className="text-xs">{props.idx}</p> */}
    </div>
  );
};

export default TileContainer;
