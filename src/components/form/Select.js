import React from 'react';
import styled from 'styled-components';

const Select = ({ optionValues, value, onChange, children, ...props }) => {
  console.log(optionValues);
  return (
    <StyledSelect>
      <select value={value} onChange={(e) => onChange(e)} {...props}>
        {optionValues.forEach(value => {
          console.log(value.name);
          return (<option value={value.value}>{value.name}</option>)
        })}
      </select>
      <label>
        {children}
      </label>
    </StyledSelect>
  )
}

const StyledSelect = styled.div`

`;

export default Select;
