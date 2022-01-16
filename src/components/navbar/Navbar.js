import React, {useState, Fragment, useEffect} from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router';
import { Link } from 'react-router-dom'

import LogoHorizontal from '../../styles/images/siposvillany_logo_horizontal.svg';
import { COLORS } from '../../styles/styles';

const Navbar = ({ activePage, changeActivePage, aboutRef, progressRef, headerRef, offerRef, referencesRef }) => {
  const history = useHistory();
  const location = useLocation();

  const [admin, setAdmin] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/admin') {
      setAdmin(false);
    }
    // vedd majd ki
    setAdmin(false);
  }, [])

  return (<Nav>
    <Link to="/">
      <Logo>
        <img src={LogoHorizontal} alt="logo" />
      </Logo>
    </Link>
    <div className={`menu-btn ${open ? 'open' : 'close'}`} onClick={() => setOpen(!open)}>
      <div className="menu-btn__hamburger"></div>
    </div>
    <ul className={`menu-items ${open ? 'open' : 'close'}`}>
      {admin &&
        <li onClick={() => history.push('/admin')}>Érdeklődök</li>
      }
      {!admin &&
        <Fragment>
        <li onClick={() => { changeActivePage(0, headerRef); setOpen(false)}} className={activePage === 0 ? 'active' : ''}>Kapcsolat</li>
        <li onClick={() => { changeActivePage(1, aboutRef); setOpen(false)}} className={activePage === 1 ? 'active' : ''}>Rólam</li>
        <li onClick={() => { changeActivePage(2, progressRef); setOpen(false)}} className={activePage === 2 ? 'active' : ''}>Folyamat</li>
          {/*<li onClick={() => changeActivePage(3, referencesRef)} className={activePage === 3 ? 'active' : ''}>Referencia</li>
        <li onClick={() => { changeActivePage(4, offerRef); setOpen(false)}} className={activePage === 4 ? 'active attention' : 'attention'}>Kalkulátor</li>*/}
        </Fragment>
      }
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

  .menu-btn {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transform: scale(1.5);

    &:not(.open) {
      :hover {
        .menu-btn__hamburger {
          width:80%;
          :before {
            width:70%;
            transform: translate(-3px, -6px) rotate(-45deg);
          }
          :after {
            width:70%;
            transform: translate(-3px, 6px) rotate(45deg);
          }
        }
      }
    }

    &.open {
      .menu-btn__hamburger {
        background-color: transparent;
        :before {
          transform: translateX(0px) rotate(-45deg);
        }
        :after {
          transform: translateX(0px) rotate(45deg);
        }
      }
      :hover {
        .menu-btn__hamburger {
          :before {
            width:80%;
            transform: translate(3px, 7px) rotate(-45deg);
          }
          :after {
            width:80%;
            transform: translate(3px, -7px) rotate(45deg);
          }
        }
      }
    }

    .menu-btn__hamburger {
      width: 100%;
      height: 1px;
      background-color: white;
      border-radius: 10px;
      transition: all .3s ease-in-out;

      &:before,
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: white;
        border-radius: 10px;
        transition: all .3s ease-in-out;
      }
      &:before {
        transform: translateY(-7px);
      }
      &:after {
        transform: translateY(7px);
      }
    }
    @media screen and (min-width: 800px) {
      display: none;
    }
  }
  .menu-items {
    display: flex;
    list-style: none;
    transition: all .25s;
    a {
        text-decoration: none;
        color: ${COLORS.textprimary};
      }
    li {
      padding: 0.5rem 1rem;
      cursor: pointer;
      &.active,
      &:hover {
        background: ${COLORS.bgdarkblue};
        color: ${COLORS.textblue}
      }
      &.attention {
        background: yellow;
        color: black;
        font-weight: 700;
      }
    }
    @media screen and (max-width: 800px) {
      position: absolute;
      justify-content: space-around;
      top: 4rem;
      right: 0;
      height: 15rem;
      width: 10rem;
      display: flex;
      flex-direction: column;
      transform: translateX(10rem);
      background-color: ${COLORS.bgdark};

      li {
        display: flex;
        flex-grow: 1;
        align-items: center;
      }

      &.open {
        transform: translateX(0);
      }
    }
    @media screen and (max-width: 500px) {
      transform: translateX(100vw);
      width: 100vw;
      height: calc(100vh - 4rem);
      justify-content: flex-start;
      li {
        height: 5rem;
        justify-content: center;
        flex-grow: 0;
        font-size: 1.5rem;
      }
    }
  }
`;

const Logo = styled.div`
  margin-top: .25rem;
  img {
    width: 15rem;
  }
`;

export default Navbar;