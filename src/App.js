import React, { useState, createRef } from 'react';
import { Route } from 'react-router-dom';

import GlobalStyle from './components/GlobalStyle';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';

const App = () => {

  const [activePage, setActivePage] = useState(0);
  const changeActivePage = (number, ref) => {
    const width = window.innerWidth > 600 ? 16 : window.innerWidth > 400 ? 14 : 12;
    console.log(width);
    console.log(ref.current);
    window.scrollTo(0, ref.current.offsetTop - (4 * width));
    setActivePage(number);
  }

  const headerRef = createRef();
  const aboutRef = createRef();
  const progressRef = createRef();
  const referencesRef = createRef();
  const offerRef = createRef();

  return (
    <div className="App">
      <GlobalStyle />
      <Navbar changeActivePage={changeActivePage} activePage={activePage} headerRef={headerRef} aboutRef={aboutRef} progressRef={progressRef} referencesRef={referencesRef} offerRef={offerRef} />
      <Route path='' exact>
        <HomePage headerRef={headerRef} aboutRef={aboutRef} progressRef={progressRef} referencesRef={referencesRef} offerRef={offerRef} />
      </Route>
    </div>
  );
}

export default App;
