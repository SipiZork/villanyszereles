import React, { useState, createRef, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import AdminPage from './pages/AdminPage/AdminPage';
import PdfPage from './pages/PdfPage/PdfPage';

import GlobalStyle from './components/GlobalStyle';
import Navbar from './components/navbar/Navbar';
import Errors from './components/errors/Errors';
import CustomerPage from './pages/CustomerPage/CustomerPage';

const App = () => {
  const [activePage, setActivePage] = useState(0);
  const [errors, setErrors] = useState([]);
  const [pdf, setPdf] = useState(false);
  const location = useLocation();

  const addError = (errorsArray) => {
    setErrors(errorsArray);
    setTimeout(() => {
      setErrors([]);
    }, 4000);
  }

  const changeActivePage = (number, ref) => {
    const width = window.innerWidth > 600 ? 16 : window.innerWidth > 400 ? 14 : 12;
    window.scrollTo(0, ref.current.offsetTop - (4 * width));
    setActivePage(number);
  }

  const handleScroll = (headerHeight, aboutHeight, progressHeight, offerHeight) => {
      const pageY = window.pageYOffset;
      if (pageY < headerHeight) { setActivePage(0); }
      else if (pageY < headerHeight + aboutHeight) { setActivePage(1); }
      else if (pageY < headerHeight + aboutHeight + progressHeight) { setActivePage(2); }
      else if (pageY < headerHeight + aboutHeight + progressHeight + offerHeight) { setActivePage(4); }
      /*else if (pageY < headerHeight + aboutHeight + progressHeight + referencesHeight + offerHeight) { setActivePage(4); }*/
  }

  useEffect(() => {
    const headerHeight = document.querySelector('#header') !== null ? document.querySelector('#header').clientHeight : 0;
    const aboutHeight = document.querySelector('#about') !== null ? document.querySelector('#about').clientHeight : 0;
    const progressHeight = document.querySelector('#progress') !== null ? document.querySelector('#progress').clientHeight : 0;
    /*const referencesHeight = document.querySelector('#references') !== null ? document.querySelector('#references').clientHeight : 0;*/
    const offerHeight = document.querySelector('#offer') !== null ? document.querySelector('#offer').clientHeight : 0;
    if(location.pathname.split('/')[location.pathname.split('/').length-1] === 'pdf') {setPdf(true) } else { setPdf(false)}
    window.addEventListener('scroll', () => {
      handleScroll(headerHeight, aboutHeight, progressHeight, offerHeight);
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerRef = createRef();
  const aboutRef = createRef();
  const progressRef = createRef();
  const referencesRef = createRef();
  const offerRef = createRef();

  return (
    <div className="App">
      <GlobalStyle />
      {errors &&
        <Errors errors={errors} />
      }
      {!pdf &&
        <Navbar changeActivePage={changeActivePage} activePage={activePage} headerRef={headerRef} aboutRef={aboutRef} progressRef={progressRef} referencesRef={referencesRef} offerRef={offerRef} />
      }
      <Switch>
        <Route exact path='/'>
          <HomePage addError={addError} headerRef={headerRef} aboutRef={aboutRef} progressRef={progressRef} referencesRef={referencesRef} offerRef={offerRef} />
        </Route>
        <Route path='/admin'>
          <AdminPage />
        </Route>
        <Route exact path='/customer/:id'>
          <CustomerPage />
        </Route>
        <Route path='/customer/:id/pdf'>
          <PdfPage />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
