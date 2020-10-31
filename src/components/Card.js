import React from 'react';
import styled from 'styled-components';

export const StyledCard = styled.div`
  height: 150px;
  width: 100px;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 10px 0.5em;
  cursor: pointer;
  user-select: none;
  background: ${({ card }) => (card.isRevealed ? 'white' : 'palevioletred')};

  &.isSelected {
    background-color: pink;
  }
`;

const Description = styled.div`
  margin: 10px 0;
  font-size: 12px;
`;

const MoneyCount = styled.div`
  color: white;
`;

export default function Card(props) {
  const name = props.card.name || 'title undefined';
  const effect = props.card.effect || 'description undefined';
  const isRevealed = props.card.isRevealed || false;
  const money = props.card.money || 0;

  return (
    <StyledCard {...props}>
      {isRevealed ? (
        <>
          <div>{name}</div>
          <Description>{effect}</Description>
        </>
      ) : (
        <MoneyCount>{money !== 0 && money }</MoneyCount>
      )}
    </StyledCard>
  );
}
