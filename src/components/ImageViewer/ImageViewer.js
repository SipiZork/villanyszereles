import React from 'react';
import styled from 'styled-components';

const ImageViewer = ({ hideImage, imageArray, imageNumber, setImageNumber }) => {

  const changeImageNumber = (direction) => {
    if (direction === 'pre' && imageNumber > 0) {
      setImageNumber(imageNumber - 1);
    }
    if (direction === 'next' && imageNumber < imageArray.length - 1) {
      setImageNumber(imageNumber + 1);
    }
  }

  return (
    <StyledImageViewer>
      <div className="close" onClick={hideImage}>X</div>
      <div className="main">
        <div className="pre-image controller" onClick={() => changeImageNumber('pre')}> {`<`} </div>
        <div className="image">
          <img src={imageArray[imageNumber].src} alt={imageArray[imageNumber].alt} />
        </div>
        <div className="next-image controller" onClick={() => changeImageNumber('next')}> {`>`} </div>
      </div>
    </StyledImageViewer>
  )
}

const StyledImageViewer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,1);
  z-index: 40;
  overflow: hidden;

  .close {
    position: fixed;
    right: 5rem;
    top: 2rem;
    height: 3rem;
    width: 3rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    cursor: pointer;
  }

  .main {
    display: grid;
    grid-template-columns: 4rem auto 4rem;

    .image{
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 90%;
        max-height: 90vh;
      }
    }

    .controller {
      color: white;
      background: rgba(20,20,20,1);
      font-size: 3rem;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4rem;
      cursor: pointer;
      transition: background 500ms;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;

      &:hover {
        background: rgba(30,30,30,1);
      }
    }
  }
`;

export default ImageViewer;