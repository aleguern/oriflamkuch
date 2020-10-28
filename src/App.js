import React from 'react';
import Counter from './counter';
import { CountProvider } from './count-context';

function App() {
  return (
    <CountProvider>
      <Counter />
    </CountProvider>
  );
}

export default App;
