import { COLORS } from '../../styles/styles';
import styled from 'styled-components';

export const Prices = styled.div`
  position: relative;
  width: 350px;
  height: 100%;
  color: ${COLORS.textprimary};
  font-size: 1.1rem;

  .prices {
    .prices-group {
      display: flex;
      height: 3.3rem;
      align-items: flex-end;
      justify-content: space-between;
      padding: .5rem;
      border-bottom: 1px solid ${COLORS.bgblue};

      &:hover {
        background-color: ${COLORS.bgdarkblue};
      }
    }
  }

  p {
      color: rgba(255,255,255,.7);
      font-size: 2rem;
      text-align: center;
    }
`;

export const StyledPreOffer = styled.article`
  background: ${COLORS.bgdarkblue};
  padding: 2rem 0;
  display: grid;
  grid-gap: .5rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    justify-items: center;
  }

  form {
    grid-column-start: 2;
    @media screen and (max-width: 700px) {
      grid-column-start: 1;
    }
    font-family: 'Raleway', sans-serif;
    display: flex;
    flex-direction: column;
    width: 350px;
    position: relative;
    gap: 1.5rem;

    p {
      color: rgba(255,255,255,.7);
      font-size: 2rem;
      text-align: center;
    }

    .form-group-select {
      width: 100%;
      height: 1.8rem;
      align-items: center;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;

      select {
        width: 40%;
        height: 1.8rem;
        padding-left: .5rem;
        font-size: 1.2rem;
      }

      input[type="checkbox"] {
        position: relative;
        width: 60px;
        height: 20px;
        appearance: none;
        -webkit-appearance: none;
        background: ${COLORS.bglight};
        outline: none;
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0,0,0,.3);
        transition: all .25s;
        cursor: pointer;

        &:before {
          content: '';
          position: absolute;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          top: -2.5px;
          left: -1px;
          background: rgb(200, 200, 200);
          transition: all .25s;
          pointer-events: none;
          box-shadow: 0 1px 3px rgba(0,0,0,.5);
        }

        &:checked {
          background: ${COLORS.bgdarkerblue};

          &:before {
            left: 36px;
            background: ${COLORS.bgdarkblue};
          }
        }
      }

      label {
        color: ${COLORS.textprimary};
        font-size: 1.3rem;
        pointer-events: none;
        opacity: .7;
      }

      input {
        height: 1.8rem;
        width: 1.8rem;
        outline: none;
        border: none;
      }
    }
  }
`;