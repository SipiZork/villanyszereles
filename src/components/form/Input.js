import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

const Input = ({ onChange, children, value, placeholder, ...props}) => {
  return (
    <StyledInput>
      <input onChange={(e) => onChange(e)} value={value} required autoComplete="off" {...props} />
      <label>
        {children}
      </label>
      {placeholder &&
        <div className="placeholder">{placeholder}</div>
      }
    </StyledInput>
  )
}

const StyledInput = styled.div`
  position: relative;
  width: 45%;
  height: 2.6rem;
  @media screen and (max-width: 600px) {
    width: 90%;
  }

  .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1.2rem;
    height: 1.8rem;
    opacity: .8;
    padding: 0 1rem;
    display: none;
  }
  label {
    color: ${COLORS.textprimary};
    font-size: 1.3rem;
    position: absolute;
    top: 0;
    left: 1rem;
    height: 1.8rem;
    transition: all .25s;
    pointer-events: none;
    opacity: .5;
  }
  input {
    padding: 0 1rem;
    top: 0;
    left: 0;
    height: 1.8rem;
    width: 100%;
    border: 1px solid yellow;
    font-size: 1.2rem;
    background-color: transparent;
    outline: none;
    border: none;
    color: ${COLORS.textprimary};
    border-bottom: 1px solid ${COLORS.bgblue};
    
    &:hover {

    }

    &:focus,
    &:valid {
      + label {
        top: -1rem;
        font-size: 1rem;
      }
    }
    &:focus {
        + .placeholder {
          display: block;
        }
      
    }
  }
`;

export default Input;
