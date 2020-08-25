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
          score: 0,
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

      if (state.gameState === "DEALERS_TURN") {
        if (playerScore > dealerScore) {
          newGameState = "WIN";
        }

        if (dealerScore === playerScore) {
          newGameState = "DRAW";
        }

        if (dealerScore > playerScore) {
          newGameState = "LOSE";
        }

        if (dealerScore > 21) {
          newGameState = "WIN";
        }
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
      let score = findScore(state.dealer.hand);
      let hand = state.dealer.hand;
      let deck = state.deck;

      function dealersTurn() {
        while (score < 17) {
          const [firstCard, remainingCards] = dealCards(deck, 1);
          hand = [firstCard, ...hand];
          deck = remainingCards;
          score = findScore(hand);
        }

        return [hand, deck];
      }

      const [dealersNewHand, remainingDeck] = dealersTurn();

      return {
        ...state,
        deck: remainingDeck,
        gameState: "DEALERS_TURN",
        dealer: {
          ...state.dealer,
          score: findScore(dealersNewHand),
          hand: dealersNewHand,
        },
      };

    default:
      throw new Error();
  }
}
