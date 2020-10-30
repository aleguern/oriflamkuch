import React from 'react';
import styled from 'styled-components';
import Card from './Card';

export const CardWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Board(props) {
  const cards = props.cards || [];

  return (
    <CardWrapper>
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </CardWrapper>
  );
}
