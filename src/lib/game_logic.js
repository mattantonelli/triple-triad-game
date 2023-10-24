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
export function checkFlips(squares, scores, index) {
  const played = squares[index];

  adjacentIndexes[index].forEach((neighborIndex) => {
    const neighbor = squares[neighborIndex];

    if (neighbor.color && neighbor.color !== played.color) {
      // Translate the square indexes into usable coordinates to determine sides
      const [x1, y1] = indexToCoordinates(index);
      const [x2, y2] = indexToCoordinates(neighborIndex);

      // Collect the card statistics for easy comparison
      const stats = played.card.stats.numeric;
      const neighborStats = neighbor.card.stats.numeric;

      checkStandardFlip(played, stats, x1, y1, neighbor, neighborStats, x2, y2, scores);
    }
  });
}

// Flips the neighbor to the played card's color and updates the scores
function flipNeighbor(played, neighbor, scores) {
    const neighborColor = neighbor.color;
    neighbor.color = played.color;

    scores[played.color] += 1;
    scores[neighborColor] -= 1;
}

// Flips if the played card's stats exceed that of its neighbor on the adjacent side (e.g. 6 > 4)
function checkStandardFlip(played, stats, x1, y1, neighbor, neighborStats, x2, y2, scores) {
  if (
    (x1 > x2 && stats.left   > neighborStats.right)  ||
    (x1 < x2 && stats.right  > neighborStats.left)   ||
    (y1 > y2 && stats.top    > neighborStats.bottom) ||
    (y1 < y2 && stats.bottom > neighborStats.top)
  ) {
    console.log(`Standard Flip: ${neighbor.card.name} (${x2}, ${y2}) from ${neighbor.color} to ${played.color}`);
    flipNeighbor(played, neighbor, scores);
  }
}