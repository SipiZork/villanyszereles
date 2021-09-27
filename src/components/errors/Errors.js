import React from 'react'
import styled from 'styled-components';

const Errors = ({ errors }) => {
  return (
    <StyledErrors>
      {errors.map((error, i) => (
        <div className={`error ${error.type}`} key={i}>
          {error.msg}
        </div>
     ))}
    </StyledErrors>
  )
}

const StyledErrors = styled.div`
  position: fixed;
  right: 1rem;
  top: 4.5rem;
  z-index: 10;
  max-width: 90%;
  width: 450px;
  height: auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .error {
    margin: .5rem 0;
    width: 90%;
    border-radius: 1rem;
    color: white;
    font-size: 1.3rem;
    text-align: center;
    padding: .5rem;

    &.warning {
      color: white;
      background-color: rgba(200, 0, 0, .7);
    }

    &.access {
      color: white;
      background-color: rgba(0, 200, 0, .7);
    }

    &:nth-child(:not(:first-child)) {
      margin-bottom: .5rem;
    }
  }
`;

export default Errors
