// create a single deck of playing cards
import CreateDeck, {
  suits,
  DealTwoCards,
  dealCards,
  findCardPosition,
} from "./Deck";

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

describe("DealTwoCards", () => {
  it("should deal two cards", () => {
    const deck = CreateDeck();
    expect(DealTwoCards(deck)[0]).toHaveProperty("suit");
    expect(DealTwoCards(deck)[1]).toHaveProperty("suit");
    expect(DealTwoCards(deck)[2].length).toEqual(50);
  });
});

describe("dealCards", () => {
  it("should deal two cards", () => {
    const deck = CreateDeck();

    expect(dealCards(deck, 2).length).toEqual(3);

    expect(dealCards(deck, 4).length).toEqual(5);
  });
});

describe("sprite", () => {
  it("should return the Ace of heart's sprite location", () => {
    const card = {
      suit: "Hearts",
      value: "Ace",
      numericValue: 11,
    };

    const spritePosition = findCardPosition(card);

    expect(spritePosition).toHaveProperty("name", "HeartsAce");
    expect(spritePosition.position).toHaveProperty("x", 140);
    expect(spritePosition.position).toHaveProperty("y", 1330);
  });
});
