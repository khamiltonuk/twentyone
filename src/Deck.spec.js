// create a single deck of playing cards
import CreateDeck, { suits, DealTwoCards } from "./Deck";

function countSuits(array, suit) {
  const Hearts = array.filter((card) => card.suit === suit);
  return Hearts.length;
}

describe("CreateDeck", () => {
  it("should return an array with 52 elements", () => {
    expect(CreateDeck().length).toEqual(52);
  });

  it.each(suits)("should contain 13 '%s'", (suit) => {
    expect(countSuits(CreateDeck(), suit)).toEqual(13);
  });

  it("generate 4 Aces each with the numeric value of 1", () => {
    const deck = CreateDeck();
    const Aces = deck.filter((card) => card.value === "Ace");
    expect(Aces.length).toEqual(4);
    expect(Aces.every((ace) => ace.numericValue === 1)).toEqual(true);
  });
});

describe("DealTwoCards", () => {
  it("should deal two cards", () => {
    const deck = CreateDeck();
    expect(DealTwoCards(deck)[0]).toHaveProperty("suit");
    expect(DealTwoCards(deck)[1]).toHaveProperty("suit");
    expect(DealTwoCards(deck)[2].length).toEqual(50);
  });
});
