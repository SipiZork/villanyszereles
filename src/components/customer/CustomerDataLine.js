import React, {Fragment} from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

const CustomerDataLine = ({ title, value, modifier, modify, className, callBack, onClick, ...props}) => {
  return (
    <StyledCustomerDataLine {...props}>
      <div className={`data-line${className ? ` ${className}` : ''}`} >
        <div className="title">{title}</div>
        <div className="value">{value}</div>
      </div>
      {modifier &&
        <div className={`modifier${className? ` ${className}` : ''}`}>
        {modify === 'callBack' &&
          (<Fragment>
            <div onClick={() => onClick()}>
              <i className={`fas ${callBack ? 'fa-times' : 'fa-check'}`}></i>
            </div>
          </Fragment>)
        }
        </div>
      }
    </StyledCustomerDataLine>
  )
}

const StyledCustomerDataLine = styled.div`
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid ${COLORS.bglightblue};
  }

  &:hover {
    .data-line {
      filter: brightness(1);
    }
    .modifier {
      right: -3rem;
    }
  }

  &:nth-child(odd) {
    .data-line {
      background-color: ${COLORS.bgdark};
    }
  }

  &:nth-child(even) {
    .data-line {
      background-color: ${COLORS.bgprimary};
    }
  }

  .data-line {
    position: relative;
    width: 100%;
    height: 2.5rem;
    font-size: 1.3rem;
    display: flex;
    color: white;
    font-family: 'Oswald', sans-serif;
    align-items: center;
    flex-direction: row;
    padding: 1.5rem;
    justify-content: space-between;
    filter: brightness(.85);
    z-index: 2;
  
    &.warning {
      color: red;
      font-weight: 600;
    }

    &.information {
      color: green;
      font-weight: 600;
      color: ${COLORS.bglightblue};
    }

    &.important {
      color: green;
      font-weight: 600;
      color: #7bf542;
    }
  }

  .modifier {
    position: absolute;
    right: 0;
    top: 0;
    width: 2.5rem;
    height: 2.5rem;
    transition: all .25s;
    padding: 1.5rem;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    cursor: pointer;
    color: white;

    &.warning {
      background-color: #7bf542;
      color: black;
    }
    &.important {
      background-color: red;
    }
  }
`;

export default CustomerDataLine;
