import React from 'react';
import { CardWrapper } from './Board';
import { actions, useCount } from '../count-context';
import styled from 'styled-components';
import Card from './Card';

const StyledHand = styled.div`
  position: fixed;
  bottom: 20px;
  width: 100%;
  justify-content: center;
`;

export default function Hand(props) {
  const [state, dispatch] = useCount();
  const cards = props.cards || [];

  const playCard = (card) => {
    dispatch({ type: 'ADD_CARD_TO_BOARD', card });
  };

  return (
    <StyledHand>
      <CardWrapper>
        {cards.length === 0 ? (
          <p>Plus de cartes</p>
        ) : (
          cards.length > 0 &&
          cards.map((card) => (
            <Card card={card} onClick={(e) => playCard(card)} key={card.id} />
          ))
        )}
      </CardWrapper>
    </StyledHand>
  );
}
