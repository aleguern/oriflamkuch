import React from 'react';
import styled from 'styled-components';
import { useCount } from '../count-context';
import isBoardEmpty from '../services/board.service';
import hasSelectCard from '../services/card.service';
import Card from './Card';
import FieldWrapper from './FieldWrapper';

export const CardWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export default function Board(props) {
  const [state, dispatch] = useCount();

  return (
    <CardWrapper>
      <FieldWrapper>
        {!isBoardEmpty(state.board) &&
          state.board.map((card) => <Card card={card} key={card.id} />)}
      </FieldWrapper>
    </CardWrapper>
  );
}
