import { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import { timerFormat } from "../utils/calculations";
import {
  isPuzzleSolved,
  isSolvable,
  isTileEmpty,
  isTilesAroundEmpty,
  shuffleTiles,
} from "../utils/gameLogic";
import TileContainer from "./TileContainer";

const Puzzle = (props) => {
  const [tiles, setTiles] = useState([]);
  const [moveCount, setMoveCount] = useState(0);

  const [emptyTile, setEmptyTile] = useState({ x: 0, y: 0 });

  const [tilesAroundEmpty, setTilesAroundEmpty] = useState({
    top: { x: 0, y: 0 },
    bottom: { x: 0, y: 0 },
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  const handleMove = (xIndex, yIndex, pos) => {
    if (isTileEmpty(emptyTile, xIndex, yIndex)) {
      alert("huh?");
    } else {
      if (isTilesAroundEmpty(tilesAroundEmpty, xIndex, yIndex)) {
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
        setMoveCount((prevState) => prevState + 1);
      } else {
        alert("nope! can't move");
      }
    }
  };

  const generateTiles = (dimension) => {
    const totalTiles = dimension.x * dimension.y;
    let tileCount = 1;
    let tileIndex = 0;
    let tileContainer = [];

    // Shuffled tiles (1 - 15 for example).
    const shuffledTiles = shuffleTiles(totalTiles);

    if (isSolvable(shuffledTiles, props.dimension.x)) {
      for (let i = 0; i < dimension.y; i++) {
        tileContainer.push([]);
        for (let j = 0; j < dimension.x; j++) {
          tileContainer[i].push({
            idx: tileCount,
            pos: shuffledTiles[tileIndex],
          });

          // If the tile is the last tile in the array, it will set as the empty tile.
          // And also update the tiles around the empty tile.
          if (shuffledTiles[tileIndex] === 0) {
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
    } else {
      generateTiles(props.dimension);
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
    setMoveCount(0);
    props.setIsActive(false);
    props.setTime(0);
    props.setIsFinished(false);
  };

  useEffect(() => {
    generateTiles(props.dimension);
  }, [props.dimension]);

  useEffect(() => {
    if (isPuzzleSolved(tiles, props.dimension)) {
      props.setIsFinished(true);
      props.setIsActive(false);
    }
  }, [tiles]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { top, bottom, left, right } = tilesAroundEmpty;
      if (!isPuzzleSolved(tiles, props.dimension)) {
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
            default:
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

  return (
    <>
      <Modal
        isOpen={props.isFinished}
        setIsOpen={() => props.setIsFinished(false)}
        modalTitle={"Puzzle Solved!"}
        modalContent={FinishedModalContent(props.time, moveCount)}
        modalButton={"Play Again"}
        closeModalEvent={resetTimer}
      />

      <div className="flex flex-col">
        {tiles.map((yTile, yIndex) => {
          return (
            <div className="flex" key={yIndex}>
              {yTile.map((xTile, xIndex) => {
                return (
                  <TileContainer
                    key={xTile.idx}
                    {...xTile}
                    empty={isTileEmpty(emptyTile, xIndex, yIndex)}
                    hasEmptySide={isTilesAroundEmpty(
                      tilesAroundEmpty,
                      xIndex,
                      yIndex,
                    )}
                    handleMove={() => handleMove(xIndex, yIndex, xTile.pos)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

const FinishedModalContent = (time, moveCount) => {
  return (
    <p>{`You solved the puzzle in ${timerFormat(
      time,
    )}s with ${moveCount} moves.`}</p>
  );
};

export default Puzzle;
