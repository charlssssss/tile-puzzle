import { useEffect } from "react";
import { useState } from "react";

const dimesion = {
  x: 4,
  y: 4,
};

export default function App() {
  const [tiles, setTiles] = useState([]);

  const [emptyTile, setEmptyTile] = useState({
    x: Math.floor(Math.random() * dimesion.x),
    y: Math.floor(Math.random() * dimesion.y),
  });

  const [tilesAroundEmpty, setTilesAroundEmpty] = useState({
    top: { x: emptyTile.x, y: emptyTile.y - 1 },
    bottom: { x: emptyTile.x, y: emptyTile.y + 1 },
    left: { x: emptyTile.x - 1, y: emptyTile.y },
    right: { x: emptyTile.x + 1, y: emptyTile.y },
  });

  useEffect(() => {
    generateDimension(dimesion);
  }, []);

  const generateDimension = (dimesion) => {
    let tileCount = 1;
    let tilesIndex = 0;
    let tileContainer = [];
    const shuffledTilesArray = shuffleTiles(dimesion.x * dimesion.y);

    for (let i = 0; i < dimesion.y; i++) {
      tileContainer.push([]);
      for (let j = 0; j < dimesion.x; j++) {
        tileContainer[i].push({
          idx: tileCount,
          pos: shuffledTilesArray[tilesIndex],
        });
        tileCount++;
        tilesIndex++;
      }
    }

    setTiles(tileContainer);
  };

  const shuffleTiles = (length) => {
    const tilesArray = Array.from({ length }, (_, index) => index + 1);

    for (let i = tilesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tilesArray[i], tilesArray[j]] = [tilesArray[j], tilesArray[i]];
    }
    return tilesArray;
  };

  const isTileEmpty = (xIndex, yIndex) => {
    if (emptyTile.x === xIndex && emptyTile.y === yIndex) {
      return true;
    } else {
      return false;
    }
  };

  const isTilesAroundEmpty = (xIndex, yIndex) => {
    if (
      tilesAroundEmpty.top.x === xIndex &&
      tilesAroundEmpty.top.y === yIndex
    ) {
      return {
        isAroundEmpty: true,
        direction: "down",
      };
    } else if (
      tilesAroundEmpty.bottom.x === xIndex &&
      tilesAroundEmpty.bottom.y === yIndex
    ) {
      return {
        isAroundEmpty: true,
        direction: "up",
      };
    } else if (
      tilesAroundEmpty.left.x === xIndex &&
      tilesAroundEmpty.left.y === yIndex
    ) {
      return {
        isAroundEmpty: true,
        direction: "right",
      };
    } else if (
      tilesAroundEmpty.right.x === xIndex &&
      tilesAroundEmpty.right.y === yIndex
    ) {
      return {
        isAroundEmpty: true,
        direction: "left",
      };
    } else {
      return {
        isAroundEmpty: false,
        direction: null,
      };
    }
  };

  const handleMove = (xIndex, yIndex, pos) => {
    if (isTileEmpty(xIndex, yIndex)) {
      alert("huh?");
    } else {
      if (isTilesAroundEmpty(xIndex, yIndex).isAroundEmpty) {
        setEmptyTile({ x: xIndex, y: yIndex });

        setTilesAroundEmpty({
          top: { x: xIndex, y: yIndex - 1 },
          bottom: { x: xIndex, y: yIndex + 1 },
          left: { x: xIndex - 1, y: yIndex },
          right: { x: xIndex + 1, y: yIndex },
        });

        setTiles((prevState) => {
          return prevState.map((outer, oIdx) =>
            oIdx !== emptyTile.y
              ? outer
              : outer.map((inner, iIdx) =>
                  iIdx === emptyTile.x ? { ...inner, pos } : inner,
                ),
          );
        });
      } else {
        alert("nope! can't move");
      }
    }
  };

  const handler = (event) => {
    // changing the state to the name of the key
    // which is pressed
    console.log(event.key);
  };

  return (
    <>
      <div
        className="flex w-[500px] flex-wrap items-start justify-center border border-blue-500 p-5"
        onKeyPress={(e) => handler(e)}
      >
        {tiles.map((yTile, yIndex) =>
          yTile.map((xTile, xIndex) => {
            return (
              <TileContainer
                key={xTile.idx}
                {...xTile}
                empty={isTileEmpty(xIndex, yIndex)}
                hasEmptySide={isTilesAroundEmpty(xIndex, yIndex).isAroundEmpty}
                handleMove={() => handleMove(xIndex, yIndex, xTile.pos)}
              />
            );
          }),
        )}
      </div>
    </>
  );
}

const TileContainer = (props) => {
  const tileColor = props.empty
    ? "bg-blue-50"
    : props.hasEmptySide
    ? "bg-blue-500"
    : "bg-blue-700";
  const tileText = props.empty ? "text-black" : "text-blue-50";
  return (
    <div
      className={`h-[100px] w-[100px] border border-blue-100 p-5 transition-all active:scale-90 ${tileColor} ${tileText}`}
      onClick={() => props.handleMove()}
    >
      {props.pos !== dimesion.x * dimesion.y && (
        <h2 className="text-lg">{props.pos}</h2>
      )}
      <p className="text-xs">{props.idx}</p>
    </div>
  );
};
