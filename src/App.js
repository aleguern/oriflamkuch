import React from 'react';
import { useCount } from './count-context';
import Board from './components/Board';
import Hand from './components/Hand';

function App() {
  const [state, dispatch] = useCount();
  return (
    <>
      <Board cards={state.board} />
      <Hand cards={state.hand} />
    </>
  );
}

export default App;
