export const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
const values = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];

export default function CreateDeck() {
  let deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = {};
      card.suit = suits[i];
      card.value = values[j];

      card.numericValue = j;

      if (card.value === "Ace") {
        card.numericValue = 1;
      }

      if (
        card.value === "Jack" ||
        card.value === "Queen" ||
        card.value === "King"
      ) {
        card.numericValue = 10;
      }

      deck.push(card);
    }
  }

  return deck;
}

export function shuffleDeck(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function DealTwoCards(deck) {
  const [topCard, secondCard, ...rest] = deck;
  return [topCard, secondCard, rest];
}