import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

const Input = ({ onChange, children, value, ...props}) => {
  return (
    <StyledInput className="form-group">
      <input onChange={(e) => onChange(e)} value={value} required autoComplete="off" {...props} />
      <label>
        {children}
      </label>
    </StyledInput>
  )
}

const StyledInput = styled.div`
  position: relative;
  width: 100%;
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
      background-color: ${COLORS.inputhover};
      + label {
        opacity: 1;
      }
    }

    &:focus,
    &:valid {
      + label {
        top: -1.5rem;
        left: 0rem;
        opacity: .7;
      }
    }
  }
`;

export default Input;
