import React, { useEffect, useState } from 'react';
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
  const [effect, setEffect] = useState();

  const isRevealStep = () => state.game.step === 'REVEAL';

  const isCurrentId = (index) => state.game.revealIndex === index;

  useEffect(() => {
    const index = state.game.revealIndex;
    const card = state.board[index];
    const callback = card?.effect?.method;

    if (state.game.effect === 'chose') {
      if (card?.effect.shouldSelect) {
        setEffect(() => callback);
      } else {
        card?.effect?.method(dispatch, card);
        dispatch({ type: actions.RESET_EFFECT });
      }
    }
  }, [state.game.effect]);

  const chose = (card) => {
    effect(dispatch, card);
  };

  return (
    <CardWrapper>
      <Slot>
        {state.board.map((card, id) => (
          <Flex key={card.id}>
            <Card card={card} onClick={() => chose(card)} />
            {isRevealStep() && isCurrentId(id) && (
              <>
                <Indicator />
                {card.isRevealed ? (
                  <button
                    onClick={() => dispatch({ type: actions.USE_EFFECT, card })}
                  >
                    Utiliser l'effet
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        dispatch({ type: actions.REVEAL_CARD, card })
                      }
                    >
                      Révéler
                    </button>
                    <button
                      onClick={() => dispatch({ type: actions.CASH_IN, card })}
                    >
                      Encaisser
                    </button>
                  </>
                )}
              </>
            )}
          </Flex>
        ))}
      </Slot>
    </CardWrapper>
  );
}
