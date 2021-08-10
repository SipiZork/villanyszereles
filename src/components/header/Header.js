import React from 'react';
import styled from 'styled-components';

import headerBg from '../../styles/images/electrical_bg_1.jpg';

const Header = () => (
  <StyledHeader>
    <div className="dark-bg"></div>
    <div className="header-info">
      <div className="description">
        <p className="underline-container">
          <div className="underline"></div>
          Budapest Villany
        </p>
      </div>
      <div className="name underline-container">
        <p className="underline-container">
          <div className="underline"></div>
          Sipos Zoltán
        </p>
      </div>
      <div className="email underline-container">
        <p className="underline-container">
          <div className="underline"></div>
          siposvillany@gmail.com
        </p>
      </div>
      <div className="tel underline-container">
        <p className="underline-container">
          <div className="underline"></div>
          +36 70 770 7828
        </p>
      </div>
    </div>
  </StyledHeader>
);

const StyledHeader = styled.article`
  /*margin-top: 4rem;*/
  width: 100%;
  background: url(${headerBg});
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: .2rem;

  .header-info {
    position: sticky;
    top: 5rem;
    opacity: 1;
    color: white;
    font-family: 'Oswald', sans-serif;
    font-weight: 500;
    font-style: italic;
    font-size: 3rem;
    display: flex;
    padding-bottom: 3rem;
    flex-direction: column;

    .description {
      font-size: 1.5rem;
      cursor: pointer;
    }

    .name {
      font-size: 3.5rem;
      cursor: pointer;
    }
    
    .email {
      font-size: 2.2rem;
      cursor: pointer;
    }

    .tel {
      font-size: 2.2rem;
      cursor: pointer;
    }
  }
`;

export default Header;