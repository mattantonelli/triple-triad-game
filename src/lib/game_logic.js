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

// Maps rule strings to their flip logic functions
const ruleFunctions = {
  "Fallen Ace": isFallenAceFlip,
  "Reverse": isReverseFlip,
  "Same": isSameFlip
};

// Returns [x, y] coordinates corresponding to the square's index on the board
function indexToCoordinates(index) {
  return [index % 3, Math.floor(index / 3)];
}

// Tries to flip the neighbors for a card played at the given index
export async function processFlips(squares, setSquares, scores, setScores, rule, index, showMessage) {
  const played = squares[index];
  let flips, comboFlips = [];

  // Check for Plus flips first since they take priority
  if (rule === "Plus") {
    comboFlips = checkPlusFlips(played, squares, index);
  }

  // Check for standard flips first if the Reverse rule is not in play
  if (rule !== "Reverse") {
    flips = checkNeighbors(played, isStandardFlip, squares, index);

    // Exclude Plus flips since we must flip them later to potentially execute combos
    flips = flips.filter((i) => !comboFlips.includes(i));

    if (flips.length > 0) {
      await flipCards(played, flips, squares, setSquares, scores, setScores);
    }
  }

  // Check for any remaining flips based on the active rule
  if (rule && Object.keys(ruleFunctions).includes(rule)) {
    flips = checkNeighbors(played, ruleFunctions[rule], squares, index);

    // If any cards were flipped based on a rule
    if (flips.length > 0) {
      // Display the rule message unless it was Reverse
      if (rule !== "Reverse") {
        await showMessage("rules", rule.toLowerCase().replace(" ", "_"), 750);
      }

      // and flip the cards
      await flipCards(played, flips, squares, setSquares, scores, setScores);
    }
  }

  // Execute Plus/Same flips, then check for combos
  if (comboFlips.length > 0) {
    // Display the rule message and flip them
    await showMessage("rules", rule.toLowerCase().replace(" ", "_"), 750);
    await flipCards(played, comboFlips, squares, setSquares, scores, setScores);

    // Keep checking for combo flips until no more cards can be flipped.
    while (comboFlips.length > 0) {
      // Try to execute standard flips from each flipped card
      comboFlips = comboFlips.flatMap((index) => {
        return checkNeighbors(squares[index], isStandardFlip, squares, index);
      });

      // If any cards were combo'd, display the combo message and flip them.
      if (comboFlips.length > 0) {
        await showMessage("rules", "combo", 750);
        await flipCards(played, comboFlips, squares, setSquares, scores, setScores);
      }
    }
  }
}

// Returns the number of initial flips made by a card played at the given index
export async function countFlips(squares, rule, index) {
  const played = squares[index];
  let flips = [];

  // Check for Plus flips first since they have special logic
  if (rule === "Plus") {
    flips = flips.concat(checkPlusFlips(played, squares, index));
  }

  // Check for standard flips first if the Reverse rule is not in play
  if (rule !== "Reverse") {
    flips = flips.concat(checkNeighbors(played, isStandardFlip, squares, index));
  }

  // Check for any remaining flips based on the active rule
  if (rule && Object.keys(ruleFunctions).includes(rule)) {
    flips = flips.concat(checkNeighbors(played, ruleFunctions[rule], squares, index));
  }

  // Return the number of unique flips
  return new Set(flips).size;
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

// Adds up all adjacent values and flips the cards if this value matches 2+ times
function checkPlusFlips(played, squares, index) {
  const neighbors = adjacentIndexes[index];
  const [x1, y1] = indexToCoordinates(index);
  const stats = played.card.stats.numeric;

  // Sum all of the adjacent sides for the played card's neighbors
  const sums = neighbors.map((neighborIndex) => {
    const neighbor = squares[neighborIndex];

    if (neighbor.card) {
      const [x2, y2] = indexToCoordinates(neighborIndex);
      const neighborStats = neighbor.card.stats.numeric;

      if (x1 > x2) {
        return stats.left + neighborStats.right;
      } else if (x1 < x2) {
        return stats.right + neighborStats.left;
      } else if (y1 > y2) {
        return stats.top + neighborStats.bottom;
      } else {
        return stats.bottom + neighborStats.top;
      }
    }
  });

  // Count the occurrence of each sum
  const counts = {};
  for (const sum of sums) {
    counts[sum] = counts[sum] ? counts[sum] + 1 : 1;
  }

  // And return the indexes for any neighbors where the color is different and the count > 1
  return neighbors.filter((neighborIndex, i) => {
    if (squares[neighborIndex].color !== played.color && sums[i] && counts[sums[i]] > 1) {
      return neighborIndex;
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

// Flips if the played card's stats are equal to its neighbor on the adjacent side (e.g. 4 = 4)
function isSameFlip(cardValue, neighborValue) {
  return cardValue === neighborValue;
}

// Flips if the played card has a 1 adjacent to its neighbor's A (1 = A)
function isFallenAceFlip(cardValue, neighborValue) {
  return cardValue === 1 && neighborValue === 10;
}