export const shuffleTiles = (length) => {
  const tilesArray = Array.from({ length }, (_, index) => index + 1);
  for (let i = tilesArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tilesArray[i], tilesArray[j]] = [tilesArray[j], tilesArray[i]];
  }
  tilesArray[tilesArray.indexOf(16)] = 0;

  return tilesArray;
};

export const isSolvable = (puzzle) => {
  let parity = 0;
  let gridWidth = 4;
  let row = 0;
  let blankRow = 0;
  for (let i = 0; i < puzzle.length; i++) {
    if (i % gridWidth == 0) {
      // advance to next row
      row++;
    }
    if (puzzle[i] == 0) {
      blankRow = row;
      continue;
    }
    for (var j = i + 1; j < puzzle.length; j++) {
      if (puzzle[i] > puzzle[j] && puzzle[j] != 0) {
        parity++;
      }
    }
  }

  if (gridWidth % 2 == 0) {
    if (blankRow % 2 == 0) {
      return parity % 2 == 0;
    } else {
      return parity % 2 != 0;
    }
  } else {
    return parity % 2 == 0;
  }
};

export const isTilesAroundEmpty = (tilesAroundEmpty, x, y) => {
  const { top, bottom, left, right } = tilesAroundEmpty;
  if (
    (top.x === x && top.y === y) ||
    (bottom.x === x && bottom.y === y) ||
    (left.x === x && left.y === y) ||
    (right.x === x && right.y === y)
  ) {
    return true;
  }
  return false;
};

export const isTileEmpty = (emptyTile, x, y) => {
  if (emptyTile.x === x && emptyTile.y === y) {
    return true;
  } else {
    return false;
  }
};

export const isPuzzleSolved = (tilesArray, dimension) => {
  const totalTiles = dimension.x * dimension.y - 1;
  let sameIndexPosCount = 0;

  tilesArray.map((outer) => {
    outer.map((inner) => {
      if (inner.idx === inner.pos) sameIndexPosCount++;
    });
  });

  return sameIndexPosCount === totalTiles;
};
