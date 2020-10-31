import React from 'react';
import styled from 'styled-components';
import { actions, useCount } from '../count-context';
import Card from './Card';
import Slot from './Slot';

const Indicator = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  width: 1px;
  margin: 20px auto;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

export default function Board() {
  const [state, dispatch] = useCount();

  const isRevealStep = () => state.game.step === 'REVEAL';

  const isCurrentId = (index) => state.game.revealIndex === index;

  return (
    <CardWrapper>
      <Slot>
        {state.board.map((card, id) => (
          <Flex key={card.id}>
            <Card card={card} />
            {isRevealStep() && isCurrentId(id) && (
              <>
                <Indicator />
                <button
                  onClick={() => dispatch({ type: actions.REVEAL_CARD, card })}
                >
                  Révéler
                </button>
                {card.isRevealed ? (
                  <button>Utiliser l'effet</button>
                ) : (
                  <button>Encaisser</button>
                )}
              </>
            )}
          </Flex>
        ))}
      </Slot>
    </CardWrapper>
  );
}
