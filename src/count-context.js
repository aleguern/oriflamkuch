import React from 'react';
const CountStateContext = React.createContext();
const CountDispatchContext = React.createContext();

const CARDS = [
  {
    isSelected: false,
    isRevealed: true,
    money: 1,
    id: 0,
    name: 'ESPION',
    effect: `Volez 1 à un joueur dont l'une des cartes est adjacentes`,
  },
  {
    isSelected: false,
    isRevealed: true,
    money: 0,
    id: 1,
    name: 'SEIGNEUR',
    effect: `Gagnez 1 et 1 supplémentaire par carte adjacente de votre famille`,
  },
  {
    isSelected: false,
    isRevealed: true,
    money: 0,
    id: 2,
    name: 'ARCHER',
    effect: `Éliminez la première ou la dernière carte de la file`,
  },
  {
    isSelected: false,
    isRevealed: true,
    money: 0,
    id: 3,
    name: 'DECRET ROYAL',
    effect: `Déplacez une carte n'importe où dans la file sauf sur une autre carte. Défaussez le Décret Royal`,
  },
  {
    isSelected: false,
    isRevealed: true,
    money: 0,
    id: 4,
    name: 'SOLDAT',
    effect: `Éliminez une carte adjacente`,
  },
  {
    isSelected: false,
    isRevealed: true,
    money: 0,
    id: 5,
    name: 'HÉRITIER',
    effect: `S'il n'y a pas d'autre carte révélée du même nom, gagnez 2`,
  },
  {
    isSelected: false,
    isRevealed: true,
    money: 0,
    id: 6,
    name: 'ASSASSINAT',
    effect: `Éliminez une carte n'importe où dans la file. Défaussez l'assassinat`,
  },
  {
    isSelected: false,
    isRevealed: true,
    money: 0,
    id: 7,
    name: 'CHANGEFORME',
    effect: `Copiez la capacité d'un personnage révélé adjacent`,
  },
  {
    isSelected: false,
    isRevealed: true,
    money: 0,
    id: 8,
    name: 'EMBUSCADE',
    effect: `Embuscade`,
  },
  {
    isSelected: false,
    isRevealed: true,
    money: 0,
    id: 9,
    name: 'COMPLOT',
    effect: `Gagnez le double de pièces présents sur le complot. Défaussez le complot`,
  },
];

export const STEPS = { PLAY: 'PLAY', REVEAL: 'REVEAL' };

const PLAYERS = ['Antoine', 'Sloane', 'Benjamin'];

const gameState = {
  hand: CARDS.filter((el, id) => id < 5),
  board: [],
  game: {
    turn: 1,
    player: PLAYERS[0],
    step: STEPS.PLAY,
    revealIndex: 0,
  },
};

export const actions = {
  ADD_CARD_TO_BOARD: 'ADD_CARD_TO_BOARD',
  SELECT_CARD: 'SELECT_CARD',
  ADD_SELECTED_CARD_TO_BOARD: 'ADD_SELECTED_CARD_TO_BOARD',
  NEXT_PLAYER: 'NEXT_PLAYER',
  REVEAL_CARD: 'REVEAL_CARD',
};

function countReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case actions.ADD_SELECTED_CARD_TO_BOARD: {
      const selectedCard = state.hand.find((card) => card.isSelected);

      selectedCard.isRevealed = false;

      const addToEnd = [...state.board, selectedCard];
      const addToStart = [selectedCard, ...state.board];

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
