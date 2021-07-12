import React, {Fragment} from 'react';
import Header from '../../components/header/Header';
import About from '../../components/about/About';
import Progression from '../../components/Progression/Progression';
import Price from '../../components/price/Price';

const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <About />
      <Progression />
      <Price />
    </Fragment>
  );
};

export default HomePage;