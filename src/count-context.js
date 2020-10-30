import React from 'react';
const CountStateContext = React.createContext();
const CountDispatchContext = React.createContext();

const CARDS = [
  { id: 0, title: '0' },
  { id: 1, title: '0' },
  { id: 2, title: '0' },
  { id: 3, title: '0' },
  { id: 4, title: '0' },
];

const gameState = {
  hand: CARDS,
  board: [],
};

export const actions = {
  ADD_CARD_TO_BOARD: 'ADD_CARD_TO_BOARD',
};

function countReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case actions.ADD_CARD_TO_BOARD: {
      return {
        ...state,
        hand: state.hand.filter((card) => card.id !== action.card.id),
        board: [...state.board, action.card]
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
