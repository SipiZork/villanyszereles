import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

const ProgressBar = ({ maxStep, step }) => {
  return <StyledProgressBar classNames='a' maxStep={maxStep} step={step}>
    <div className="bar">
      
    </div>
  </StyledProgressBar>
}

const StyledProgressBar = styled.div`
  width: 100%;
  height: .5rem;
  background-color: ${COLORS.bgprimary};
  border-radius: 1rem;
  position: relative;

  .bar {
    border-radius: 1rem;
    height: .5rem;
    position: absolute;
    width: calc(100% /${({ maxStep }) => maxStep} * ${({ step }) => step});
    background-color: ${COLORS.bglightblue};
    z-index: 2;
  }
`;

export default ProgressBar;