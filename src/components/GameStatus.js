import React, { useEffect } from 'react';
import styled from 'styled-components';
import { actions, useCount } from '../count-context';
import { STEPS, PLAYERS } from '../mocks';

const StyledGameStatus = styled.div`
  text-align: center;
  padding: 10px;
  width: 200px;
  margin: 20px auto;
  border: 2px solid palevioletred;
`;

const GameStatus = () => {
  const [state, dispatch] = useCount();

  useEffect(() => {
    const { step, revealIndex } = state.game;

    if (revealIndex === state.board.length && step === STEPS.REVEAL) {
      dispatch({ type: actions.CHANGE_STEP, step: STEPS.PLAY });
    }
  }, [state.game]);

  return (
    <StyledGameStatus>
      {state.game.step === 'PLAY' ? (
        <div>
          À <strong>{state.game.player}</strong> de jouer
        </div>
      ) : (
        <div>On révèle</div>
      )}
      <div>Sens du jeu : →</div>
    </StyledGameStatus>
  );
};

export default GameStatus;
