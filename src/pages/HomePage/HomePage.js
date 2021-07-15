import React, {Fragment} from 'react';
import Header from '../../components/header/Header';
import About from '../../components/about/About';
import Progression from '../../components/Progression/Progression';
import References from '../../components/References/References';

const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <About />
      <Progression />
      <References />
    </Fragment>
  );
};

export default HomePage;