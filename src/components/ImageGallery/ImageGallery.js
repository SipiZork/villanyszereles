import React from 'react';
import styled from 'styled-components';

const ImageGallery = ({ images, showImage }) => {
  console.log(images);
  return (
    <StyledImageGallery>
      {images.map((image, i) => (
        <img src={image.src} alt={image.alt} onClick={() => showImage(i)} />
      ))}
    </StyledImageGallery>
  );
};

const StyledImageGallery = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 1rem;
  flex-wrap: wrap;
  grid-template-columns: auto auto auto auto auto;
  grid-template-row: auto auto auto auto auto;
  gap: 1rem;

  img {
    max-width: 200px;
    transform: scale(1);
    transition: transform 500ms, filter 500ms;
    filter: grayscale(70%);
    cursor: pointer;

    &:hover {
      transform: scale(1.03);
      filter: grayscale(0%);
    }
  }
`;

export default ImageGallery;