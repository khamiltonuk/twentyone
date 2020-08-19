import CreateDeck, { shuffleDeck, dealCards } from "./Deck";

export default function startGame() {
  return {
    deck: shuffleDeck(CreateDeck()),
    gameState: "PREDEAL",
    dealer: {
      score: 0,
      hand: [],
    },
    player: {
      name: "Sam",
      score: 0,
      hand: [],
    },
  };
}

export function findScore(hand) {
  //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  return hand.reduce((accumulator, card) => {
    return accumulator + card.numericValue;
  }, 0);
}

export function gameReducer(state, action) {
  switch (action.type) {
    case "initialDeal":
      const [
        topCard,
        secondCard,
        thirdCard,
        fourthCard,
        restOfDeck,
      ] = dealCards(state.deck, 4);
      const newDealerHand = [topCard, thirdCard];
      const newPlayersHand = [secondCard, fourthCard];
      return {
        ...state,
        deck: restOfDeck,
        gameState: "INPLAY",
        dealer: {
          ...state.dealer,
          score: findScore(newDealerHand),
          hand: newDealerHand,
        },
        player: {
          ...state.player,
          score: findScore(newPlayersHand),
          hand: newPlayersHand,
        },
      };
    case "checkScore":
      const dealerScore = state.dealer.score;
      const playerScore = state.player.score;

      let newGameState = state.gameState;

      if (playerScore > 21) {
        newGameState = "LOSE";
      }

      if (dealerScore > 21) {
        newGameState = "WIN";
      }

      if (dealerScore === 21) {
        newGameState = "LOSE";
      }

      if (playerScore === 21) {
        newGameState = "WIN";
      }

      if (dealerScore === 21 && playerScore === 21) {
        newGameState = "DRAW";
      }

      return {
        ...state,
        gameState: newGameState,
      };
    case "dealPlayerCard":
      const [firstCard, remainingCards] = dealCards(state.deck, 1);
      const newHand = [firstCard, ...state.player.hand];
      return {
        ...state,
        deck: remainingCards,
        player: {
          ...state.player,
          score: findScore(newHand),
          hand: newHand,
        },
      };

    case "startNewGame":
      return startGame();

    case "stand":
      return;

    default:
      throw new Error();
  }
}
