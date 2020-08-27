import React from "react";
import { render } from "@testing-library/react";
import Hand from "./Hand";
import CreateDeck, { dealCards } from "./Deck";

test.skip("renders learn react link", () => {
  const twoCards = dealCards(CreateDeck(), 2);
  const player1 = {
    hand: twoCards,
  };
  const { getByText } = render(<Hand />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
