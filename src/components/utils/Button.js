import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

const Button = ({ onClick, children, type, inverted, ...props }) => {
  return (
    <StyledButton onClick={onClick} type={type} {...props}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  width: 100%;
  height: 3.5rem;
  font-size: 1.5rem;
  background-color: ${COLORS.bgdarkerblue};
  color: ${COLORS.textbutton};
  font-family: 'Raleway', sans-serif;
  transition: all .25s;
  outline: none;
  border: none;
  margin: 1rem 0 2rem 0;
  transition: all .25s;

  &:disabled {
    pointer-events: none;
    filter: grayscale(1);
    opacity: .6;
  }

  &.dark {
    background-color: ${COLORS.bgprimary};
    &:hover {
      background-color: ${COLORS.bgdark};
    }
  }

  &:hover {
    cursor: pointer;
    background-color: ${COLORS.bgdarkblue};
    color: ${COLORS.textbuttonhover};
  }
`;

export default Button;
