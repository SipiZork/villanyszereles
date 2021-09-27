import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

const CustomerData = ({className, data, name}) => {
  return (
    <StyledCustomerData className={`data ${className}`}>
      {name && `${name}: ` }{data}
    </StyledCustomerData>
  )
}

const StyledCustomerData = styled.div`
  font-size: 1.1rem;
  padding: .25rem .5rem;
  border-radius: .45rem;
  &:nth-child(even) {
    background-color: ${COLORS.bgprimary} ;
  }
  &:nth-child(odd) {
    background-color: ${COLORS.bgdark} ;
  }
`;

export default CustomerData;
