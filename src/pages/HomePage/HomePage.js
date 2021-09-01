import React, {Fragment} from 'react';
import Header from '../../components/header/Header';
import About from '../../components/about/About';
import Progression from '../../components/Progression/Progression';
import References from '../../components/References/References';
import PreOffer from '../../components/PreOffer/PreOffer';

const HomePage = ({ aboutRef, progressRef, offerRef, referencesRef, headerRef }) => {
  return (
    <Fragment>
      <Header headerRef={headerRef} />
      <About aboutRef={aboutRef} />
      <Progression progressRef={progressRef} />
      <References referencesRef={referencesRef}/>
      {/*<PreOffer offerRef={offerRef} />*/}
    </Fragment>
  );
};

export default HomePage;