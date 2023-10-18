import { useEffect } from "react";
import { useState } from "react";

const dimesion = {
  x: 4,
  y: 4,
};

export default function App() {
  const [tiles, setTiles] = useState([]);

  const [emptyTile, setEmptyTile] = useState({
    x: 0,
    y: 0,
  });

  const [tilesAroundEmpty, setTilesAroundEmpty] = useState({
    top: { x: 0, y: 0 },
    bottom: { x: 0, y: 0 },
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  useEffect(() => {
    generateTiles(dimesion);
  }, []);

  const generateTiles = (dimesion) => {
    let tileCount = 1;
    let tileIndex = 0;
    let tileContainer = [];

    // Shuffled tiles (1 - 15 for example).
    const shuffledTiles = shuffleTiles(dimesion.x * dimesion.y);

    for (let i = 0; i < dimesion.y; i++) {
      tileContainer.push([]);
      for (let j = 0; j < dimesion.x; j++) {
        tileContainer[i].push({
          idx: tileCount,
          pos: shuffledTiles[tileIndex],
        });

        // If the tile is the last tile in the array, it will set as the empty tile.
        // And also update the tiles around the empty tile.
        if (shuffledTiles[tileIndex] === dimesion.x * dimesion.y) {
          setEmptyTile({ x: j, y: i });

          setTilesAroundEmpty({
            top: { x: j, y: i - 1 },
            bottom: { x: j, y: i + 1 },
            left: { x: j - 1, y: i },
            right: { x: j + 1, y: i },
          });
        }
        tileIndex++;
        tileCount++;
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

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Handle the key press event here
      // For example, you can check which key was pressed using event.key
      if (event.key === "ArrowLeft") {
        handleMove(
          tilesAroundEmpty.right.x,
          tilesAroundEmpty.right.y,
          tiles[tilesAroundEmpty.right.y][tilesAroundEmpty.right.x].pos,
        );
      } else if (event.key === "ArrowRight") {
        handleMove(
          tilesAroundEmpty.left.x,
          tilesAroundEmpty.left.y,
          tiles[tilesAroundEmpty.left.y][tilesAroundEmpty.left.x].pos,
        );
      } else if (event.key === "ArrowUp") {
        handleMove(
          tilesAroundEmpty.bottom.x,
          tilesAroundEmpty.bottom.y,
          tiles[tilesAroundEmpty.bottom.y][tilesAroundEmpty.bottom.x].pos,
        );
      } else if (event.key === "ArrowDown") {
        handleMove(
          tilesAroundEmpty.top.x,
          tilesAroundEmpty.top.y,
          tiles[tilesAroundEmpty.top.y][tilesAroundEmpty.top.x].pos,
        );
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [tilesAroundEmpty]);

  return (
    <div className="font-gabarito flex h-screen w-screen items-center justify-center">
      <div className="flex w-[500px] flex-wrap items-start justify-center p-5">
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
    </div>
  );
}

const TileContainer = (props) => {
  const tileColor =
    props.idx === props.pos && !props.empty
      ? "bg-orange-500"
      : props.empty
      ? "bg-blue-50"
      : props.hasEmptySide
      ? "bg-blue-500"
      : "bg-blue-700";
  const tileText =
    props.empty || props.idx === props.pos ? "text-black" : "text-blue-50";
  return (
    <div
      className={`h-[100px] w-[100px] border border-blue-100 p-5  transition-all active:scale-90 ${tileColor} ${tileText}`}
      onClick={() => props.handleMove()}
    >
      {props.pos !== dimesion.x * dimesion.y && (
        <h2 className="text-lg">{props.pos}</h2>
      )}
      <p className="text-xs">{props.idx}</p>
    </div>
  );
};
