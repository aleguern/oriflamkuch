import { actions } from './count-context';

export const CARDS = [
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: {
      shouldSelect: true,
      method: (dispatch, card) => {
        dispatch({ type: actions.KILL, card });
      },
    },
    id: 6,
    name: 'ASSASSINAT',
    description: `Éliminez une carte n'importe où dans la file. Défaussez l'assassinat`,
  },
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: null,
    id: 0,
    name: 'ESPION',
    description: `Volez 1 à un joueur dont l'une des cartes est adjacentes`,
  },
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: {
      shouldSelect: false,
      method: (dispatch, card) => {
        dispatch({ type: actions.SEIGNEUR, card });
      },
    },
    id: 1,
    name: 'SEIGNEUR',
    description: `Gagnez 1 et 1 supplémentaire par carte adjacente de votre famille`,
  },
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: (dispatch, card) => {
      dispatch({ type: actions.KILL, card });
    },
    id: 2,
    name: 'ARCHER',
    description: `Éliminez la première ou la dernière carte de la file`,
  },
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: null,
    id: 3,
    name: 'DECRET ROYAL',
    description: `Déplacez une carte n'importe où dans la file sauf sur une autre carte. Défaussez le Décret Royal`,
  },
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: (dispatch, card) => {
      dispatch({ type: actions.KILL, card });
    },
    id: 4,
    name: 'SOLDAT',
    description: `Éliminez une carte adjacente`,
  },
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: null,
    id: 5,
    name: 'HÉRITIER',
    description: `S'il n'y a pas d'autre carte révélée du même nom, gagnez 2`,
  },
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: null,
    id: 7,
    name: 'CHANGEFORME',
    description: `Copiez la capacité d'un personnage révélé adjacent`,
  },
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: null,
    id: 8,
    name: 'EMBUSCADE',
    description: `Embuscade`,
  },
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: null,
    id: 9,
    name: 'COMPLOT',
    description: `Gagnez le double de pièces présents sur le complot. Défaussez le complot`,
  },
];

export const STEPS = { PLAY: 'PLAY', REVEAL: 'REVEAL' };

export const PLAYERS = ['Antoine', 'Sloane'];

export const SEIGNEURS = [
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: {
      shouldSelect: false,
      method: (dispatch, card) => {
        dispatch({ type: actions.SEIGNEUR, card });
      },
    },
    id: 1,
    name: 'SEIGNEUR',
    description: `Gagnez 1 et 1 supplémentaire par carte adjacente de votre famille`,
  },
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: {
      shouldSelect: false,
      method: (dispatch, card) => {
        dispatch({ type: actions.SEIGNEUR, card });
      },
    },
    id: 2,
    name: 'SEIGNEUR',
    description: `Gagnez 1 et 1 supplémentaire par carte adjacente de votre famille`,
  },
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: {
      shouldSelect: false,
      method: (dispatch, card) => {
        dispatch({ type: actions.SEIGNEUR, card });
      },
    },
    id: 3,
    name: 'SEIGNEUR',
    description: `Gagnez 1 et 1 supplémentaire par carte adjacente de votre famille`,
  },
  {
    isSelected: false,
    isRevealed: true,
    player: 'Antoine',
    money: 0,
    effect: {
      shouldSelect: false,
      method: (dispatch, card) => {
        dispatch({ type: actions.SEIGNEUR, card });
      },
    },
    id: 4,
    name: 'SEIGNEUR',
    description: `Gagnez 1 et 1 supplémentaire par carte adjacente de votre famille`,
  },
];
