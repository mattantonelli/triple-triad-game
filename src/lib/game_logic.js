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
    flips = checkNeighbors(played, isStandardFlip, squares, index);

    if (flips.length > 0) {
      await flipCards(played, flips, squares, setSquares, scores, setScores);
    }
  }

  flips = [];

  // Then check for any remaining flips based on active rules
  switch(rule) {
    case("Reverse"):
      flips = checkNeighbors(played, isReverseFlip, squares, index);
      break;
    case("Fallen Ace"):
      flips = checkNeighbors(played, isFallenAceFlip, squares, index);
      break;
  }

  // If cards were flipped based on a rule, display a message then flip them
  if (flips.length > 0) {
    await showMessage("rules", rule.toLowerCase().replace(" ", "_"), 750);
    await flipCards(played, flips, squares, setSquares, scores, setScores);
  }
}

// Checks if neighbors of an index have been flipped using the given function
function checkNeighbors(played, isFlip, squares, index) {
  return adjacentIndexes[index].filter((neighborIndex) => {
    const neighbor = squares[neighborIndex];

    if (neighbor.color && neighbor.color !== played.color) {
      // Translate the square indexes into usable coordinates to determine sides
      const [x1, y1] = indexToCoordinates(index);
      const [x2, y2] = indexToCoordinates(neighborIndex);

      // Collect the card statistics for easy comparison
      const stats = played.card.stats.numeric;
      const neighborStats = neighbor.card.stats.numeric;

      // Check if the neighbor is flipped by the given function by comparing the appropriate sides
      if (x1 > x2) {
        return isFlip(stats.left, neighborStats.right);
      } else if (x1 < x2) {
        return isFlip(stats.right, neighborStats.left);
      } else if (y1 > y2) {
        return isFlip(stats.top, neighborStats.bottom);
      } else {
        return isFlip(stats.bottom, neighborStats.top);
      }
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
function isStandardFlip(cardValue, neighborValue) {
  return cardValue > neighborValue;
}

// Flips if the played card's stats are lower than that of its neighbor on the adjacent side (e.g. 4 < 6)
function isReverseFlip(cardValue, neighborValue) {
  return cardValue < neighborValue;
}

// Flips if the played card has a 1 adjacent to its neighbor's A (1 = A)
function isFallenAceFlip(cardValue, neighborValue) {
  return cardValue === 1 && neighborValue === 10;
}