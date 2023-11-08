import { countFlips } from "@/lib/game_logic";

const AI_COLOR = "red";

// Processes the "best" move for the AI based on the greatest number of initial flips
export async function processAITurn(squares, rule, playableCards, playCard) {
  const cards = playableCards(AI_COLOR, true);
  const startTime = Date.now();
  let bestMove = { card: {}, index: -1, flips: -1 };

  // For each square on the board
  for(let i = 0; i < squares.length; i++) {
    // Skip occupied squares
    if (squares[i].card) {
      continue;
    }

    // For each playable card in the AI's hand
    for (const card of cards) {
      // Count how many cards would be flipped if the card was played at the given index
      let newSquares = squares.map((square) => ({...square}));
      newSquares[i] = { color: AI_COLOR, card: card };
      const flips = await countFlips(newSquares, rule, i);

      // If this number exceeds the number of cards flipped by the best move, save it
      if (flips > bestMove.flips) {
        bestMove = { card: card, index: i, flips: flips };
      }
    }
  }

  // Ensure the AI has waited at least 1 second before making its move
  const processingTime = (Date.now() - startTime);
  if (processingTime < 1000) {
    await new Promise(resolve => setTimeout(resolve, 1000 - processingTime));
  }

  // Play the best move
  await playCard(bestMove.card, AI_COLOR, bestMove.index);
}