import CreateDeck, { shuffleDeck, dealCards } from "./Deck";

export default function startGame() {
  return {
    deck: shuffleDeck(CreateDeck()),
    dealer: {
      score: 0,
      hand: [],
    },
    players: [
      {
        name: "Sam",
        score: 0,
        hand: [],
      },
    ],
  };
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
      return {
        ...state,
        deck: restOfDeck,
        dealer: {
          ...state.dealer,
          hand: [topCard, thirdCard],
        },
        players: state.players.map((player) => ({
          ...player,
          hand: [secondCard, fourthCard],
        })),
      };
    default:
      throw new Error();
  }
}
