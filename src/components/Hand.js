import React from 'react';
import styled from 'styled-components';
import { useCount } from '../count-context';
import { CardWrapper } from '../styles';
import Card from './Card';

const StyledHand = styled.div`
  position: fixed;
  bottom: 20px;
  width: 100%;
  justify-content: center;
`;

export default function Hand(props) {
  const [state, dispatch] = useCount();

  const selectCard = (card) => {
    dispatch({ type: 'SELECT_CARD', card });
  };

  return (
    <StyledHand>
      <CardWrapper>
        {state.hand.length === 0 ? (
          <p>Plus de cartes</p>
        ) : (
          state.hand.map((card) => (
            <Card
              className={card.isSelected ? 'isSelected' : ''}
              card={card}
              onClick={() => selectCard(card)}
              key={card.id}
            />
          ))
        )}
      </CardWrapper>
    </StyledHand>
  );
}
