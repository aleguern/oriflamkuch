import React from 'react';
import styled from 'styled-components';
import { actions, useCount } from '../count-context';
import hasSelectCard from '../services/card.service';

const StyledSlot = styled.div`
  height: 150px;
  width: 100px;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 1em 1em;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.5;
  }
`;

const Slot = ({ children }) => {
  const [state, dispatch] = useCount();

  const shouldDisplaySlots = () => hasSelectCard(state.hand);

  const selectSlot = (position) => {
    dispatch({ type: actions.ADD_SELECTED_CARD_TO_BOARD, position });
    dispatch({ type: actions.NEXT_PLAYER });
  };

  return (
    <>
      {shouldDisplaySlots() && (
        <StyledSlot onClick={() => selectSlot('start')}>JOUER ICI</StyledSlot>
      )}
      {children}
      {shouldDisplaySlots() && state.board.length > 0 && (
        <StyledSlot onClick={() => selectSlot('end')}>JOUER ICI</StyledSlot>
      )}
    </>
  );
};

export default Slot;
