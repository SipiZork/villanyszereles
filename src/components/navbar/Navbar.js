import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../styles/styles';

const Navbar = ({ activePage, changeActivePage, aboutRef, progressRef, headerRef, offerRef, referencesRef }) => {
  const scrollPls = (ref) => {
    
  }
  return(<Nav>
    <Logo>
      <h1>Budapest Villany</h1>
    </Logo>
    <ul>
      <li onClick={() => changeActivePage(0, headerRef)} className={activePage === 0 ? 'active' : ''}>Főoldal</li>
      <li onClick={() => changeActivePage(1, aboutRef)} className={activePage === 1 ? 'active' : ''}>Rólam</li>
      <li onClick={() => changeActivePage(2, progressRef)} className={activePage === 2 ? 'active' : ''}>Folyamat</li>
      <li onClick={() => changeActivePage(3, referencesRef)} className={activePage === 3 ? 'active' : ''}>Referencia</li>
      {/*<li onClick={() => changeActivePage(4, offerRef)} className={activePage === 4 ? 'active' : ''}>Kalkulátor</li>*/}
    </ul>
  </Nav>);
};

const Nav = styled.nav`
  position: fixed;
  z-index: 30;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  height: 4rem;
  background: ${COLORS.bgdark};
  justify-content: space-between;
  padding: 0 2rem;
  font-size: 1.2rem;
  align-items: center;
  color: ${COLORS.textprimary};
  font-family: 'Raleway', sans-serif;
  ul {
    display: flex;
    list-style: none;
    a {
        text-decoration: none;
        color: ${COLORS.textprimary};
      }
    li {
      padding: 0.5rem 1rem;
      cursor: pointer;
      &.active {
        background: ${COLORS.bgdarkblue};
        color: ${COLORS.textblue}
      }
    }
  }
`;

const Logo = styled.div`
  
`;

export default Navbar;