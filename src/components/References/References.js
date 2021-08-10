import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

const References = () => {
  return (
    <StyledReferences>
      <div className="dark-bg"></div>
      <h2>Referenciák</h2>
      <p>Feltöltés alatt...</p>
   </StyledReferences>
  )
}

const StyledReferences = styled.article`
  padding-top: 1rem;
  background: ${COLORS.bgdarkerblue};
  color: ${COLORS.textprimary};
  display: flex;
  flex-direction: column;
  font-family: 'Oswald', sans-serif;
  align-items: center;

  h2 {
    position: relative;
    font-size: 3rem;
  }
`;

export default References;
