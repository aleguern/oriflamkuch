import React from 'react';
const CountStateContext = React.createContext();
const CountDispatchContext = React.createContext();

const CARDS = [
  { id: 0, title: '1', isSelected: false },
  { id: 1, title: '2', isSelected: false },
  { id: 2, title: '3', isSelected: false },
  { id: 3, title: '4', isSelected: false },
  { id: 4, title: '5', isSelected: false },
];

const gameState = {
  hand: CARDS,
  board: [],
};

export const actions = {
  ADD_CARD_TO_BOARD: 'ADD_CARD_TO_BOARD',
  SELECT_CARD: 'SELECT_CARD',
  ADD_SELECTED_CARD_TO_BOARD: 'ADD_SELECTED_CARD_TO_BOARD',
};

function countReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case actions.ADD_CARD_TO_BOARD: {
      return {
        ...state,
        hand: state.hand.filter((card) => card.id !== action.card.id),
        board: [...state.board, action.card],
      };
    }
    case actions.ADD_SELECTED_CARD_TO_BOARD: {
      const addToEnd =  [...state.board, state.hand.find((card) => card.isSelected)];
      const addToStart =  [ state.hand.find((card) => card.isSelected),...state.board];

      return {
        ...state,
        hand: state.hand.filter((card) => !card.isSelected),
        board: action.position === 'start' ? addToStart : addToEnd,
      };
    }
    case actions.SELECT_CARD: {
      return {
        ...state,
        hand: state.hand.map((card) =>
          card.id === action.card.id ? { ...card, isSelected: true } : card
        ),
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
