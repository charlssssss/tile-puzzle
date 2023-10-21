import { useEffect } from "react";
import { useState } from "react";

const Puzzle = (props) => {
  const [tiles, setTiles] = useState([]);

  const [emptyTile, setEmptyTile] = useState({ x: 0, y: 0 });

  const [tilesAroundEmpty, setTilesAroundEmpty] = useState({
    top: { x: 0, y: 0 },
    bottom: { x: 0, y: 0 },
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  useEffect(() => {
    generateTiles(props.dimension);
  }, []);

  useEffect(() => {
    if (handleSolvedPuzzle(props.dimension)) {
      props.setIsFinished(true);
      props.setIsActive(false);
    }
  }, [tiles]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { top, bottom, left, right } = tilesAroundEmpty;
      if (!props.isFinished) {
        try {
          switch (event.key) {
            case "ArrowLeft":
              handleMove(right.x, right.y, tiles[right.y][right.x].pos);
              startTimer();
              break;
            case "ArrowRight":
              handleMove(left.x, left.y, tiles[left.y][left.x].pos);
              startTimer();
              break;
            case "ArrowUp":
              handleMove(bottom.x, bottom.y, tiles[bottom.y][bottom.x].pos);
              startTimer();
              break;
            case "ArrowDown":
              handleMove(top.x, top.y, tiles[top.y][top.x].pos);
              startTimer();
              break;
            case "Enter":
              resetTimer();
              break;
            case " ":
              pauseTimer();
              break;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        event.key === "Enter" && resetTimer();
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [tilesAroundEmpty]);

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
        startTimer();
      } else {
        alert("nope! can't move");
      }
    }
  };

  const handleSolvedPuzzle = (dimension) => {
    const totalTiles = dimension.x * dimension.y - 1;
    let sameIndexPosCount = 0;

    tiles.map((outer) => {
      outer.map((inner) => {
        if (inner.idx === inner.pos) sameIndexPosCount++;
      });
    });

    return sameIndexPosCount === totalTiles;
  };

  const generateTiles = (dimension) => {
    const totalTiles = dimension.x * dimension.y;
    let tileCount = 1;
    let tileIndex = 0;
    let tileContainer = [];

    // Shuffled tiles (1 - 15 for example).
    const shuffledTiles = shuffleTiles(totalTiles);

    for (let i = 0; i < dimension.y; i++) {
      tileContainer.push([]);
      for (let j = 0; j < dimension.x; j++) {
        tileContainer[i].push({
          idx: tileCount,
          pos: shuffledTiles[tileIndex],
        });

        // If the tile is the last tile in the array, it will set as the empty tile.
        // And also update the tiles around the empty tile.
        if (shuffledTiles[tileIndex] === totalTiles) {
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

  const startTimer = () => {
    props.setIsActive(true);
  };

  const pauseTimer = () => {
    props.setIsActive(false);
  };

  const resetTimer = () => {
    generateTiles(props.dimension);
    props.setIsActive(false);
    props.setTime(0);
    props.setIsFinished(false);
  };

  return (
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
  );
};

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

export default Puzzle;