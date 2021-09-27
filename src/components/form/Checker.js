import React from 'react'
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

const Checker = ({ onChange, checked, children, ...props }) => {
  if (children === 'Mosógép') {
    console.log(checked);
  }
  return (
    <StyledChecker className="form-group-checker">
      <input checked={checked} onChange={onChange} {...props} />
      <label>
        {children}
      </label>
    </StyledChecker>
  )
}

const StyledChecker = styled.div`
  width: 40%;
  height: 1.8rem;
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
      width: 90%;
  }

  input[type="checkbox"] {
    position: relative;
    width: 50px;
    height: 15px;
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
      width: 22px;
      height: 22px;
      border-radius: 50%;
      top: -3.5px;
      left: -1px;
      background: rgb(200, 200, 200);
      transition: all .25s;
      pointer-events: none;
      box-shadow: 0 1px 3px rgba(0,0,0,.5);
    }

    &:checked {
      background: ${COLORS.bgdarkerblue};

      &:before {
        left: 30px;
        background: ${COLORS.bgdarkblue};
      }
    }
  }

  label {
    color: ${COLORS.textprimary};
    font-size: 1.1rem;
    pointer-events: none;
    opacity: .7;
  }

  input {
    height: 1.8rem;
    width: 1.8rem;
    outline: none;
    border: none;
  }
`;

export default Checker;
