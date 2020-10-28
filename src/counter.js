import React from 'react';
import { useCount } from './count-context';

const Counter = () => {
  const [state, dispatch] = useCount();

  return (
    <div>
      {state.count}{' '}
      <button onClick={() => dispatch({ type: 'increment' })}></button>
    </div>
  );
};

export default Counter;
