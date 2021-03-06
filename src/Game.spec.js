import startGame, { gameReducer, findScore } from "./Game";
import CreateDeck, { dealCards, shuffleDeck } from "./Deck";

describe("GameState", () => {
  describe("GetScore", () => {
    test("should be able to work out the score", () => {
      const [firstCard, secondCard, thirdHand, ,] = dealCards(
        shuffleDeck(CreateDeck()),
        3
      );
      const player = {
        hand: [firstCard, secondCard, thirdHand],
      };

      const totalScore =
        firstCard.numericValue +
        secondCard.numericValue +
        thirdHand.numericValue;

      expect(findScore(player.hand)).toEqual(totalScore);
    });
  });

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
      expect(startGame()).toHaveProperty("player");
    });

    test("should init with a score of zero", () => {
      expect(startGame().player).toHaveProperty("score", 0);
    });

    test("should init with an empty hand", () => {
      expect(startGame().player).toHaveProperty("hand", []);
    });
  });

  describe("GameReducer", () => {
    describe("initialDeal", () => {
      test("should deal 2 cards to each player", () => {
        // setup
        const initialState = startGame();

        // act
        const action = {
          type: "initialDeal",
        };
        const dealState = gameReducer(initialState, action);

        // expect
        expect(dealState.deck).toHaveLength(48);
        expect(dealState.dealer.hand).toHaveLength(2);
        expect(dealState.player.hand).toHaveLength(2);
      });

      test("should update score", () => {
        // setup
        const initialState = startGame();
        expect(initialState.dealer.score).toEqual(0);
        expect(initialState.player.score).toEqual(0);

        // act
        const action = {
          type: "initialDeal",
        };
        const dealState = gameReducer(initialState, action);

        // expect
        expect(dealState.dealer.score).toEqual(0);
        expect(dealState.player.score).not.toEqual(0);
      });
    });

    describe("check score", () => {
      test("should check if dealer has blackjack", () => {
        // setup
        const initialState = startGame();

        // act
        const updatedState = {
          ...initialState,
          dealer: {
            ...initialState.dealer,
            score: 21,
          },
        };
        const action = {
          type: "checkScore",
        };
        const dealState = gameReducer(updatedState, action);

        expect(dealState.gameState).toEqual("LOSE");
      });
      test("should check if draw if both players have 21", () => {
        // setup
        const initialState = startGame();

        // act
        const updatedState = {
          ...initialState,
          dealer: {
            ...initialState.dealer,
            score: 21,
          },
          player: {
            ...initialState.player,
            score: 21,
          },
        };
        const action = {
          type: "checkScore",
        };
        const dealState = gameReducer(updatedState, action);

        expect(dealState.gameState).toEqual("DRAW");
      });

      test("should check if player has 21", () => {
        // setup
        const initialState = startGame();

        // act
        const updatedState = {
          ...initialState,
          player: {
            ...initialState.player,
            score: 21,
          },
        };
        const action = {
          type: "checkScore",
        };
        const dealState = gameReducer(updatedState, action);

        expect(dealState.gameState).toEqual("WIN");
      });

      test("should check if game should continue when no winner", () => {
        // setup
        const initialState = startGame();

        // act
        const updatedState = {
          ...initialState,
          dealer: {
            ...initialState.dealer,
            score: 7,
          },
          player: {
            ...initialState.player,
            score: 2,
          },
        };
        const action = {
          type: "checkScore",
        };
        const dealState = gameReducer(updatedState, action);

        expect(dealState.gameState).toEqual(initialState.gameState);
      });

      describe("After the dealers turn", () => {
        test("should check if dealer score is higher", () => {
          // setup
          const initialState = startGame();

          // act
          const updatedState = {
            ...initialState,
            gameState: "DEALERS_TURN",
            dealer: {
              ...initialState.dealer,
              score: 7,
            },
            player: {
              ...initialState.player,
              score: 2,
            },
          };
          const action = {
            type: "checkScore",
          };
          const dealState = gameReducer(updatedState, action);

          expect(dealState.gameState).toEqual("LOSE");
        });

        test("should check if player score is higher", () => {
          // setup
          const initialState = startGame();

          // act
          const updatedState = {
            ...initialState,
            gameState: "DEALERS_TURN",
            dealer: {
              ...initialState.dealer,
              score: 2,
            },
            player: {
              ...initialState.player,
              score: 7,
            },
          };
          const action = {
            type: "checkScore",
          };
          const dealState = gameReducer(updatedState, action);

          expect(dealState.gameState).toEqual("WIN");
        });

        test("should check if player score is equal", () => {
          // setup
          const initialState = startGame();

          // act
          const updatedState = {
            ...initialState,
            gameState: "DEALERS_TURN",
            dealer: {
              ...initialState.dealer,
              score: 7,
            },
            player: {
              ...initialState.player,
              score: 7,
            },
          };
          const action = {
            type: "checkScore",
          };
          const dealState = gameReducer(updatedState, action);

          expect(dealState.gameState).toEqual("DRAW");
        });

        test("should check if player score is equal", () => {
          // setup
          const initialState = startGame();

          // act
          const updatedState = {
            ...initialState,
            gameState: "DEALERS_TURN",
            dealer: {
              ...initialState.dealer,
              score: 23,
            },
            player: {
              ...initialState.player,
              score: 7,
            },
          };
          const action = {
            type: "checkScore",
          };
          const dealState = gameReducer(updatedState, action);

          expect(dealState.gameState).toEqual("WIN");
        });
      });

      test("should go bust if the player gets over 21", () => {
        // setup
        const initialState = startGame();

        // act
        const updatedState = {
          ...initialState,
          dealer: {
            ...initialState.dealer,
            score: 7,
          },
          player: {
            ...initialState.player,
            score: 22,
          },
        };
        const action = {
          type: "checkScore",
        };
        const dealState = gameReducer(updatedState, action);

        expect(dealState.gameState).toEqual("LOSE");
      });

      test("player should win if dealer gets over 21", () => {
        // setup
        const initialState = startGame();

        // act
        const updatedState = {
          ...initialState,
          dealer: {
            ...initialState.dealer,
            score: 22,
          },
          player: {
            ...initialState.player,
            score: 7,
          },
        };
        const action = {
          type: "checkScore",
        };
        const dealState = gameReducer(updatedState, action);

        expect(dealState.gameState).toEqual("WIN");
      });
    });

    describe("Stand", () => {
      test("should change the game state to dealer's turn", () => {
        // setup
        const initialState = startGame();

        // act
        const action = {
          type: "stand",
        };
        const dealState = gameReducer(initialState, action);

        // assert
        expect(dealState.gameState).toEqual("DEALERS_TURN");
      });
    });

    describe("Start new game", () => {
      test("should begin a game with scores at zero", () => {
        // setup
        const initialState = startGame();
        const updatedState = {
          ...initialState,
          dealer: {
            ...initialState.dealer,
            score: 22,
          },
          player: {
            ...initialState.player,
            score: 7,
          },
        };

        // act
        const action = {
          type: "startNewGame",
        };
        const dealState = gameReducer(updatedState, action);

        // assert
        expect(dealState.dealer.score).toEqual(0);
        expect(dealState.player.score).toEqual(0);
      });

      test("should begin a game with empty hand", () => {
        // setup
        const initialState = startGame();

        // act
        const updatedState = {
          ...initialState,
          dealer: {
            ...initialState.dealer,
            hand: [2, 3],
          },
          player: {
            ...initialState.player,
            hand: [67, 34],
          },
        };
        const action = {
          type: "startNewGame",
        };
        expect(updatedState.dealer.hand).toHaveLength(2);
        expect(updatedState.player.hand).toHaveLength(2);

        const { dealer, player } = gameReducer(updatedState, action);

        // assert
        expect(dealer.hand).toHaveLength(0);
        expect(player.hand).toHaveLength(0);
      });
    });
  });
});
