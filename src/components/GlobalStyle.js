import { createGlobalStyle } from 'styled-components';
import { COLORS, ARROW } from '../styles/styles';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
    @media screen and (max-width: 400px) {
      font-size: 12px;
    }
  }

  .dark-bg {
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: .7;
    position: absolute;
    top: 0;
    left: 0;
  }

  article {
    position: relative;
    min-height: calc(100vh - 4rem);
  }

  .arrow {
    display: flex;
    padding: 0 1.5rem;
    flex-direction: column;
    &.right {
      .end {
        justify-content: flex-end;
      }
      .bottom {
        justify-content: flex-end;
      }
      .bottom {
        position: relative;
        right: -${ARROW.lineWidth}px;
      }
      .line, .line-up, .bottom-arrow {
        background: ${COLORS.bgdarkblue};
      }
    }
    &.left {
      .start {
        justify-content: flex-end;
      }
      .bottom {
        position: relative;
        left: -${ARROW.lineWidth}px;
      }
      .line, .line-up, .bottom-arrow {
        background: ${COLORS.bgdarkerblue};
      }
    }
    .start, .end {
      display: flex;
    }
    .line {
      width: 100%;
      height: ${ARROW.lineWidth}px;
      
    }
    .line-up {
      width: ${ARROW.lineWidth}px;
      height: ${ARROW.lineWidth * 3}px;
    }
    .bottom {
      display: flex;
    }
    .bottom-arrow {
      width: ${ARROW.lineWidth * 3}px;
      height: ${ARROW.lineWidth * 3}px;
      clip-path: polygon(50% 100%, 0 0, 100% 0);
    }
  }

  .underline-container {
    position: relative;
    display: inline-block;

    .underline {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: .25rem;
      background: ${COLORS.textprimary};
    }

    &:hover {
      .underline {
        animation: underline .4s 1 forwards;
      }

      @keyframes underline {
        0% {
          width: 0;
        } 100% {
          width: 100%;
        }
      }
    }
  }

`;

export default GlobalStyle;