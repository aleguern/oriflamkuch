import React from 'react';
import styled from 'styled-components';
import { useCount } from '../count-context';
import isBoardEmpty from '../services/board.service';
import hasSelectCard from '../services/card.service';

const Field = styled.div`
  height: 150px;
  width: 100px;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 1em 1em;
  cursor: pointer;
  user-select: none;
`;

const FieldWrapper = ({ children }) => {
  const [state, dispatch] = useCount();

  const shouldDisplayFields = () =>
    !isBoardEmpty(state.board) && hasSelectCard(state.hand);

  const selectField = (position) => {
    dispatch({ type: 'ADD_SELECTED_CARD_TO_BOARD', position });
  };

  return (
    <>
      {shouldDisplayFields() && <Field onClick={() => selectField('start')} />}
         {children}
      {shouldDisplayFields() && <Field onClick={() => selectField('end')} />}
    </>
  );
};

export default FieldWrapper;
