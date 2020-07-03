import startGame, { gameReducer } from "./Game";

describe("GameState", () => {
  describe("Dealer", () => {
    test("should init with a score of zero", () => {
      expect(startGame().dealer).toHaveProperty("score", 0);
    });
    test("should init with an empty hand", () => {
      expect(startGame().dealer).toHaveProperty("hand", []);
    });
  });
  describe("Player", () => {
    test("should init with at least one player", () => {
      expect(startGame().players).toHaveLength(1);
    });

    test("should init with a score of zero", () => {
      expect(startGame().players[0]).toHaveProperty("score", 0);
    });

    test("should init with an empty hand", () => {
      expect(startGame().players[0]).toHaveProperty("hand", []);
    });
  });
  describe("GameReducer", () => {
    test("should deal 2 cards to each player", () => {
      // setup
      const initialState = startGame();
      const action = {
        type: "initialDeal",
      };

      // act
      const dealState = gameReducer(initialState, action);

      // expect
      expect(dealState.deck).toHaveLength(48);
      expect(dealState.dealer.hand).toHaveLength(2);
      expect(dealState.players[0].hand).toHaveLength(2);
    });
  });
});
