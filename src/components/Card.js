import React from 'react';
import styled from 'styled-components';

export const StyledCard = styled.div`
  height: 150px;
  width: 100px;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 1em 1em;
  cursor: pointer;
  user-select: none;

  &.isSelected {
    background-color: pink;
  }
`;

export const Image = styled.div`
  width: 100%;
  height: 120px;
  border: 1px solid palevioletred;
  margin: 10px 0;
`;

export default function Card(props) {
  const title = props.card.title || 'title undefined';

  return (
    <StyledCard {...props}>
      <div>{title}</div>
      <Image />
    </StyledCard>
  );
}
