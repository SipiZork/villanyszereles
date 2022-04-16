import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';
import ImageGallery from '../ImageGallery/ImageGallery';

const References = ({ referencesRef, showImageViewer, showImage, imageArray }) => {

  return (
    <StyledReferences id="references" ref={referencesRef}>
      <div className="dark-bg"></div>
      <h2>Referenciák</h2>
      <ImageGallery images={imageArray} showImageViewer={showImageViewer} showImage={showImage} />
   </StyledReferences>
  )
}

const StyledReferences = styled.article`
  position: relative;
  padding-top: 1rem;
  background: ${COLORS.bgdarkerblue};
  color: ${COLORS.textprimary};
  display: flex;
  flex-direction: column;
  font-family: 'Oswald', sans-serif;
  align-items: center;
  z-index: 4;

  h2 {
    position: relative;
    font-size: 3rem;
  }
`;

export default References;
