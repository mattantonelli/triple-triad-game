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
  let flips;

  // Check for standard flips first if the Reverse rule is not in play
  if (rule !== "Reverse") {
    flips = checkNeighbors(played, checkStandardFlip, squares, index);

    if (flips.length > 0) {
      await flipCards(played, flips, squares, setSquares, scores, setScores);
    }
  }

  flips = [];

  // Then check for any remaining flips based on active rules
  switch(rule) {
    case("Reverse"):
      flips = checkNeighbors(played, checkReverseFlip, squares, index);
      break;
    case("Fallen Ace"):
      flips = checkNeighbors(played, checkFallenAceFlip, squares, index);
      break;
  }

  // If cards were flipped based on a rule, display a message then flip them
  if (flips.length > 0) {
    await showMessage("rules", rule.toLowerCase().replace(" ", "_"), 750);
    await flipCards(played, flips, squares, setSquares, scores, setScores);
  }
}

// Checks if neighbors of an index have been flipped using the given function
function checkNeighbors(played, checkFlip, squares, index) {
  return adjacentIndexes[index].filter((neighborIndex) => {
    const neighbor = squares[neighborIndex];

    if (neighbor.color && neighbor.color !== played.color) {
      // Translate the square indexes into usable coordinates to determine sides
      const [x1, y1] = indexToCoordinates(index);
      const [x2, y2] = indexToCoordinates(neighborIndex);

      // Collect the card statistics for easy comparison
      const stats = played.card.stats.numeric;
      const neighborStats = neighbor.card.stats.numeric;

      // Check for flips using the given function
      return checkFlip(stats, x1, y1, neighborStats, x2, y2);
    }
  });
}

// Flips the given cards to the played card's color and updates the scores
async function flipCards(played, flippedIndexes, squares, setSquares, scores, setScores) {
  for (const i of flippedIndexes) {
    const flipped = squares[i];
    const flippedColor = flipped.color;

    flipped.color = played.color;

    scores[played.color] += 1;
    scores[flippedColor] -= 1;
  }

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

// Flips if the played card's stats exceed that of its neighbor on the adjacent side (e.g. 6 > 4)
function checkStandardFlip(stats, x1, y1, neighborStats, x2, y2) {
  return (x1 > x2 && stats.left   > neighborStats.right)  ||
         (x1 < x2 && stats.right  > neighborStats.left)   ||
         (y1 > y2 && stats.top    > neighborStats.bottom) ||
         (y1 < y2 && stats.bottom > neighborStats.top);
}

// Flips if the played card's stats are lower than that of its neighbor on the adjacent side (e.g. 4 < 6)
function checkReverseFlip(stats, x1, y1, neighborStats, x2, y2) {
  return (x1 > x2 && stats.left   < neighborStats.right)  ||
         (x1 < x2 && stats.right  < neighborStats.left)   ||
         (y1 > y2 && stats.top    < neighborStats.bottom) ||
         (y1 < y2 && stats.bottom < neighborStats.top);
}

// Flips if the played card has a 1 adjacent to its neighbor's A (1 = A)
function checkFallenAceFlip(stats, x1, y1, neighborStats, x2, y2) {
  return (x1 > x2 && stats.left   === 1 && neighborStats.right === 10)  ||
         (x1 < x2 && stats.right  === 1 && neighborStats.left === 10)   ||
         (y1 > y2 && stats.top    === 1 && neighborStats.bottom === 10) ||
         (y1 < y2 && stats.bottom === 1 && neighborStats.top === 10);
}