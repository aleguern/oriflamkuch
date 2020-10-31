import React from 'react';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import Hand from './components/Hand';

function App() {
  return (
    <>
      <GameStatus />
      <Board />
      <Hand />
    </>
  );
}

export default App;
