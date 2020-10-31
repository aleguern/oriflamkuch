import React from 'react';
import styled from 'styled-components';
import { useCount } from '../count-context';

const StyledGameStatus = styled.div`
  text-align: center;
  padding: 10px;
  width: 100px;
  margin: 20px auto;
  border: 2px solid palevioletred;
`;

const GameStatus = () => {
  const [state, dispatch] = useCount();

  return (
    <StyledGameStatus>
      {state.game.step === 'PLAY' ? (
        <div>Au joueur {state.game.player}</div>
      ) : (
        <div>On révèle</div>
      )}
      <div>Sens du jeu : →</div>
    </StyledGameStatus>
  );
};

export default GameStatus;
