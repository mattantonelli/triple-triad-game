// Returns a list of adjacent indexes for checking flips.
// 0 1 2
// 3 4 5
// 6 7 8
const adjacentIndexes = [
  [1, 3],
  [0, 2, 4],
  [1, 5],
  [0, 4, 6],
  [1, 5, 7, 3],
  [2, 4, 8],
  [3, 7],
  [4, 6, 8],
  [5, 7]
];

// Returns [x, y] coordinates corresponding to the square's index on the board
function indexToCoordinates(index) {
  return [index % 3, Math.floor(index / 3)];
}

// Tries to flip the neighbors for a card played at the given index
export async function checkFlips(squares, setSquares, scores, setScores, rule, index, showMessage) {
  const played = squares[index];

  for (const neighborIndex of adjacentIndexes[index]) {
    const neighbor = squares[neighborIndex];

    if (neighbor.color && neighbor.color !== played.color) {
      // Translate the square indexes into usable coordinates to determine sides
      const [x1, y1] = indexToCoordinates(index);
      const [x2, y2] = indexToCoordinates(neighborIndex);

      // Collect the card statistics for easy comparison
      const stats = played.card.stats.numeric;
      const neighborStats = neighbor.card.stats.numeric;

      await checkStandardFlip(played, stats, x1, y1, neighbor, neighborStats, x2, y2,
        squares, setSquares, scores, setScores);

      switch(rule) {
        case "Fallen Ace":
          await checkFallenAceFlip(played, stats, x1, y1, neighbor, neighborStats, x2, y2,
            squares, setSquares, scores, setScores, showMessage);
          return;
      }
    }
  }
}

// Flips the neighbor to the played card's color and updates the scores
async function flipNeighbor(played, neighbor, squares, setSquares, scores, setScores) {
  const neighborColor = neighbor.color;
  neighbor.color = played.color;

  scores[played.color] += 1;
  scores[neighborColor] -= 1;

  // Update the squares and scores. Set the state using copies since they may be mutated later.
  setSquares(squares.map((square) => ({...square})));
  setScores({...scores});

  // Add a short delay for the flip animation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

function logFlip(type, played, neighbor, x2, y2) {
  console.log(`${type} Flip: ${neighbor.card.name} (${x2}, ${y2}) from ${neighbor.color} to ${played.color}`);
}

// Flips if the played card's stats exceed that of its neighbor on the adjacent side (e.g. 6 > 4)
async function checkStandardFlip(played, stats, x1, y1, neighbor, neighborStats, x2, y2, squares, setSquares, scores, setScores) {
  if (
    (x1 > x2 && stats.left   > neighborStats.right)  ||
    (x1 < x2 && stats.right  > neighborStats.left)   ||
    (y1 > y2 && stats.top    > neighborStats.bottom) ||
    (y1 < y2 && stats.bottom > neighborStats.top)
  ) {
    logFlip("Standard", played, neighbor, x2, y2);
    await flipNeighbor(played, neighbor, squares, setSquares, scores, setScores);
  }
}

// Flips if the played card has a 1 adjacent to its neighbor's A (1 = A)
async function checkFallenAceFlip(played, stats, x1, y1, neighbor, neighborStats, x2, y2, squares, setSquares, scores, setScores, showMessage) {
  if (
    (x1 > x2 && stats.left   === 1 && neighborStats.right === 10)  ||
    (x1 < x2 && stats.right  === 1 && neighborStats.left === 10)   ||
    (y1 > y2 && stats.top    === 1 && neighborStats.bottom === 10) ||
    (y1 < y2 && stats.bottom === 1 && neighborStats.top === 10)
  ) {
    logFlip("Fallen Ace", played, neighbor, x2, y2);
    await showMessage("rules", "fallen_ace", 750);
    await flipNeighbor(played, neighbor, squares, setSquares, scores, setScores);
  }
}