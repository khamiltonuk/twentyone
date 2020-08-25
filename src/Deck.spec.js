// create a single deck of playing cards
import { suits } from "./Constants";
import CreateDeck, { dealCards } from "./Deck";

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

  it("generate 4 Aces each with the numeric value of 11", () => {
    // arrange
    const deck = CreateDeck();

    //act
    const aces = deck.filter((card) => card.value === "Ace");

    /*
    const card = {
      value: "Ace"
      suit: "hearts"
      numbericValue: 11
    }

    const card = {
      value: "2"
      suit: "hearts"
      numbericValue: 2
    }
    */

    // expect
    expect(aces.length).toEqual(4);
    expect(aces.every((ace) => ace.numericValue === 11)).toEqual(true);
  });

  it("should return a deck where Jacks, Queens & Kings have a numericValue of 10", () => {
    const deck = CreateDeck();

    const faceCards = deck.filter(
      (card) =>
        card.value === "Jack" || card.value === "Queen" || card.value === "King"
    );

    expect(faceCards.length).toEqual(12);
    expect(faceCards.every((card) => card.numericValue === 10)).toEqual(true);
  });

  it("should return a deck of where cards 2 to 10 have the numeric value 2 to 10 ", () => {
    const deck = CreateDeck();
    const twos = deck.filter((card) => card.value === "2");
    expect(twos.every((twos) => twos.numericValue === 2)).toEqual(true);
  });
});

describe("dealCards", () => {
  it("should deal a predefined number of cards", () => {
    const deck = CreateDeck();

    expect(dealCards(deck, 2).length).toEqual(3);

    expect(dealCards(deck, 4).length).toEqual(5);
  });

  it("should retain all the cards in the pack", () => {
    const deck = CreateDeck();

    expect(dealCards(deck, 2).flat().length).toEqual(52);
  });
});
