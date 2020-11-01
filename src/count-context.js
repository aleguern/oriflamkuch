import React from 'react';
import { PLAYERS, SEIGNEURS, STEPS } from './mocks';
const CountStateContext = React.createContext();
const CountDispatchContext = React.createContext();

const numberOfSideSiblings = (array, element) => {
  const cardIndex = array.findIndex((card) => card.id === element.id);

  return [array[cardIndex - 1], array[cardIndex + 1]].reduce(
    (acc, curr) => (curr ? acc + 1 : acc),
    0
  );
};

const updateObject = (oldObject, newValues) =>
  Object.assign({}, oldObject, newValues);

const updateItemInArray = (array, itemId, updateItemCallback) =>
  array.map((item) => (item.id !== itemId ? item : updateItemCallback(item)));

const cardAlreadySelected = (cards) => cards.some(card => card.isSelected)

const gameState = {
  hand: SEIGNEURS.filter((_, id) => id < 6),
  board: [],
  game: {
    player: PLAYERS[0],
    step: STEPS.PLAY,
    revealIndex: 0,
    effect: null,
  },
  players: PLAYERS.reduce((obj, item) => ((obj[item] = { money: 1 }), obj), {}),
};

export const actions = {
  SELECT_CARD: 'SELECT_CARD',
  ADD_SELECTED_CARD_TO_BOARD: 'ADD_SELECTED_CARD_TO_BOARD',
  NEXT_PLAYER: 'NEXT_PLAYER',
  REVEAL_CARD: 'REVEAL_CARD',
  USE_EFFECT: 'USE_EFFECT',
  CASH_IN: 'CASH_IN',
  CHANGE_STEP: 'CHANGE_STEP',
  KILL: 'KILL',
  SEIGNEUR: 'SEIGNEUR',
  RESET_EFFECT: 'RESET_EFFECT',
};

function countReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case actions.ADD_SELECTED_CARD_TO_BOARD: {
      const selectedCard = state.hand.find((card) => card.isSelected);

      const addToEnd = [
        ...state.board,
        { ...selectedCard, isRevealed: false, isSelected: false },
      ];
      const addToStart = [
        { ...selectedCard, isRevealed: false, isSelected: false },
        ...state.board,
      ];

      return updateObject(state, {
        hand: state.hand.filter((card) => !card.isSelected),
        board: action.position === 'start' ? addToStart : addToEnd,
      });
    }
    case actions.SELECT_CARD: {
      if (state.game.step === STEPS.REVEAL || cardAlreadySelected(state.hand)) return state;

      return updateObject(state, {
        hand: state.hand.map((card) =>
          card.id === action.card.id ? { ...card, isSelected: true } : card
        ),
      });
    }
    case actions.REVEAL_CARD: {
      console.log(
        state.players[action.card.player],
        [action.card.player],
        action.card
      );
      return updateObject(state, {
        board: updateItemInArray(state.board, action.card.id, (card) =>
          updateObject(card, { isRevealed: true })
        ),
        game: updateObject(state.game, {
          revealIndex: state.game.revealIndex + 1,
        }),
        players: updateObject(state.players, {
          [action.card.player]: {
            money: state.players[action.card.player].money + action.card.money,
          },
        }),
      });
    }
    case actions.SEIGNEUR: {
      const money = numberOfSideSiblings(state.board, action.card);

      return updateObject(state, {
        game: { ...state.game, revealIndex: state.game.revealIndex + 1 },
        players: {
          ...state.players,
          Antoine: { money: state.players.Antoine.money + 1 + money },
        },
      });
    }
    case actions.CASH_IN: {
      return updateObject(state, {
        board: state.board.map((card) =>
          card.id === action.card.id ? { ...card, money: card.money + 1 } : card
        ),
        game: {
          ...state.game,
          revealIndex: state.game.revealIndex + 1,
        },
      });
    }
    case actions.USE_EFFECT: {
      return updateObject(state, {
        game: {
          ...state.game,
          effect: 'chose',
        },
      });
    }
    case actions.RESET_EFFECT: {
      return updateObject(state, {
        game: {
          ...state.game,
          effect: null,
        },
      });
    }
    case actions.CHANGE_STEP: {
      return updateObject(state, {
        game: {
          ...state.game,
          step: action.step,
          revealIndex: 0,
          player: PLAYERS[0],
        },
      });
    }
    case actions.KILL: {
      return updateObject(state, {
        board: state.board.filter((card) => card.id !== action.card.id),
        game: { ...state.game, revealIndex: state.game.revealIndex + 1 },
      });
    }
    case actions.NEXT_PLAYER: {
      const currentPlayerIndex = PLAYERS.findIndex(
        (player) => player === state.game.player
      );

      return updateObject(state, {
        game: {
          ...state.game,
          player: PLAYERS[currentPlayerIndex + 1],
          step:
            currentPlayerIndex + 1 === PLAYERS.length
              ? STEPS.REVEAL
              : STEPS.PLAY,
        },
      });
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = React.useReducer(countReducer, gameState);
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}
function useCountState() {
  const context = React.useContext(CountStateContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
}
function useCountDispatch() {
  const context = React.useContext(CountDispatchContext);
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider');
  }
  return context;
}
function useCount() {
  return [useCountState(), useCountDispatch()];
}

export { CountProvider, useCount };
