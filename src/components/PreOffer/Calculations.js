import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

const Calculations = ({ offers, rooms, size }) => {
  
  const formatter = Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' });
  const ownPriceFormatter = (price) => {
    return price.toString().replace(/\s/g, '.').split(',')[0] + ' Ft';
  }
  
  const writeOffer = (offer, i) => {
    console.log('offer', offer);
    if (offer > 0) {
      return (<div className="prices-group" key={i}>
        <div className="name">Áramkörök kiépítése</div>
        <div className="price">{ownPriceFormatter(formatter.format(offer))}</div>
      </div>);
    }
  }

  return (
    <StyledCalculations>
      <div className="prices">
        {(rooms > 0 && size > 0) &&
          offers.map((offer, i) => {
            writeOffer(offer, i);
          })}
      </div>
    </StyledCalculations>
  )

};

const StyledCalculations = styled.div`
  display: flex;
  height: 3.3rem;
  align-items: flex-end;
  justify-content: space-between;
  padding: .5rem;
  border-bottom: 1px solid ${COLORS.bgblue};

  &:hover {
    background-color: ${COLORS.bgdarkblue};
  }
`;


export default Calculations;