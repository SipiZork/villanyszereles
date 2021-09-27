import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

const SoonPage = ({ SoonRef }) => {
  return (
    <StyledSoonPage id='soon' ref={SoonRef} >
      HAMAROSAN
    </StyledSoonPage>
  )
}

const StyledSoonPage = styled.article`
  background: ${COLORS.bgdarkestblue};
  padding: 2rem 0;
  display: flex;
  font-size: 1.5rem;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  color: ${COLORS.textprimary};
  font-family: 'Raleway', sans-serif;
`;

export default SoonPage;