import React from 'react';
import { PLAYERS, STEPS, CARDS } from './mocks';
const CountStateContext = React.createContext();
const CountDispatchContext = React.createContext();

const gameState = {
  hand: CARDS.filter((_, id) => id < 6),
  board: [],
  game: {
    player: PLAYERS[0],
    step: STEPS.PLAY,
    revealIndex: 0,
    effect: null,
  },
};

export const actions = {
  ADD_CARD_TO_BOARD: 'ADD_CARD_TO_BOARD',
  SELECT_CARD: 'SELECT_CARD',
  ADD_SELECTED_CARD_TO_BOARD: 'ADD_SELECTED_CARD_TO_BOARD',
  NEXT_PLAYER: 'NEXT_PLAYER',
  REVEAL_CARD: 'REVEAL_CARD',
  USE_EFFECT: 'USE_EFFECT',
  CASH_IN: 'CASH_IN',
  CHANGE_STEP: 'CHANGE_STEP',
  KILL: 'KILL',
};

function countReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case actions.ADD_SELECTED_CARD_TO_BOARD: {
      const selectedCard = state.hand.find((card) => card.isSelected);

      const addToEnd = [
        ...state.board,
        { ...selectedCard, isRevealed: true, isSelected: false },
      ];
      const addToStart = [
        { ...selectedCard, isRevealed: true, isSelected: false },
        ...state.board,
      ];

      return {
        ...state,
        hand: state.hand.filter((card) => !card.isSelected),
        board: action.position === 'start' ? addToStart : addToEnd,
      };
    }
    case actions.SELECT_CARD: {
      if (state.game.step === STEPS.REVEAL) return state;

      return {
        ...state,
        hand: state.hand.map((card) =>
          card.id === action.card.id ? { ...card, isSelected: true } : card
        ),
      };
    }
    case actions.REVEAL_CARD: {
      return {
        ...state,
        board: state.board.map((card) =>
          card.id === action.card.id ? { ...card, isRevealed: true } : card
        ),
        game: { ...state.game, revealIndex: state.game.revealIndex + 1 },
      };
    }
    case actions.CASH_IN: {
      return {
        ...state,
        board: state.board.map((card) =>
          card.id === action.card.id ? { ...card, money: card.money + 1 } : card
        ),
        game: {
          ...state.game,
          revealIndex: state.game.revealIndex + 1,
        },
      };
    }
    case actions.USE_EFFECT: {
      return {
        ...state,
        game: {
          ...state.game,
          effect: 'chose',
        },
      };
    }
    case actions.CHANGE_STEP: {
      return {
        ...state,
        game: {
          ...state.game,
          step: action.step,
          revealIndex: 0,
          player: PLAYERS[0],
        },
      };
    }
    case actions.KILL: {
      console.log(action.card);

      return {
        ...state,
        board: state.board.filter((card) => card.id !== action.card.id),
      };
    }
    case actions.NEXT_PLAYER: {
      const currentPlayerIndex = PLAYERS.findIndex(
        (player) => player === state.game.player
      );

      return {
        ...state,
        game: {
          ...state.game,
          player: PLAYERS[currentPlayerIndex + 1],
          step:
            currentPlayerIndex + 1 === PLAYERS.length
              ? STEPS.REVEAL
              : STEPS.PLAY,
        },
      };
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
