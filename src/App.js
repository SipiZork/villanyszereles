import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import GlobalStyle from './components/GlobalStyle';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';

const App = () => {

  const [activePage, setActivePage] = useState(0);
  const changeActivePage = number => {
    setActivePage(number);
  }

  return (
    <div className="App">
      <GlobalStyle />
      {/*<Navbar changeActivePage={changeActivePage} activePage={activePage} />*/}
      <Route path='' exact>
        <HomePage />
      </Route>
    </div>
  );
}

export default App;
