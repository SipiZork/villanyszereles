import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

const Price = () => {
  return (
    <StyledPrice>
      <div className="dark-bg"></div>
      <h2>Árak</h2>
      <PriceTable>
        <div className="row">
          <div className="cell">Kiszállási díj</div>
          <div className="cell">Csak abban az esetben, hogyha nem kéri a szolgáltatást:
            <PriceTable>
              <div className="row">
                <div className="cell">Buda</div>
                <div className="cell">2500 Ft</div>
              </div>
              <div className="row">
                <div className="cell">Pest</div>
                <div className="cell">3500 Ft</div>
              </div>
            </PriceTable>
          </div>
        </div>
        <div className="row">
          <div className="cell">Hibaelhárítás</div>
          <div className="cell">
            <PriceTable>
            <div className="row">
              <div className="cell">Első fél óra</div>
              <div className="cell">4000 Ft</div>
            </div>
            <div className="row">
              <div className="cell">Minden további megkezdett fél óra</div>
              <div className="cell">2000 Ft</div>
            </div>
            </PriceTable>
          </div>
        </div>
        <div className="row">
        <div className="cell">Biztosítéktábla csere</div>
        <div className="cell">
        <PriceTable>
          <div className="row">
            <div className="cell">4db kismegszakítóig</div>
            <div className="cell">15000 Ft</div>
          </div>
          <div className="row">
            <div className="cell">8db kismegszakítóig</div>
            <div className="cell">28000 Ft</div>
          </div>
        </PriceTable>
      </div>
      </div>
      <div className="row">
        <div className="cell">Villanytűzhely beüzemelés</div>
        <div className="cell">8000 Ft-tól</div>
      </div>
      <div className="row">
        <div className="cell">Felújítás</div>
        <div className="cell">Egyéni megbeszélés szerint</div>
      </div>
      </PriceTable>
    </StyledPrice>
  )
}

const StyledPrice = styled.article`
  padding-top: 1rem;
  background: ${COLORS.bgdarkerblue};
  color: ${COLORS.textprimary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Oswald', sans-serif;
  align-items: center;

  h2 {
    position: relative;
    font-size: 3rem;
  }
`;

const PriceTable = styled.div`
  position: relative;
  justify-content: center;
  flex-direction: column;
  display: flex;
  gap: .25rem;
  font-size: 1.2rem;
  width: 100%;
  padding: 2rem;
  .row {
    display: flex;
    flex-grow: 1;
    gap: .25rem;
    .cell {
      &:nth-child(1) {
        border-right: none;
        background: ${ COLORS.bgdarkerblue };
      }
      &:nth-child(2) {
        background: ${ COLORS.bgdarkblue };
      }
      flex: 1;
      gap: .25rem;
      display: flex;
      padding: .5rem;
      flex-direction: column;
      border: 1px solid rgba(0,0,0,.25);
      justify-content: center;
      .row {
        .cell {
          background: ${ COLORS.bgdarkerblue };
          box-shadow: 2px 2px 2px rgba(0,0,0,.35);
        }
      }
    }
    &:not(:nth-child(1)) {
      .cell {
      border-top: none;
      }
    }
  }
`;

export default Price;
