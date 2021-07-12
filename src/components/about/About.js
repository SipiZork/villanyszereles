import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

import headerBg from '../../styles/images/electrical_bg_1.jpg';

const Header = () => (
  <StyledAbout>
    <div className="dark-bg"></div>
    <div className="about-info">
      <h1>30 éve a szakmában</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar velit in nisi vestibulum accumsan. Cras vestibulum tellus urna, eu feugiat ex tempus et. Donec ut placerat magna, rhoncus finibus eros. Duis eget elit a ipsum viverra gravida at nec tellus. Aenean suscipit id magna a molestie. Suspendisse id laoreet urna. Mauris quis auctor risus. Etiam eget tortor sed mauris fermentum varius nec vel justo. Nunc non sodales magna, eget facilisis massa. Vivamus varius accumsan arcu, ac dignissim tortor lobortis et. Donec sed justo ligula. Nullam sed ornare lacus. Nam nec eros dui. Sed id maximus sem, non accumsan elit. Donec erat ex, efficitur id iaculis gravida, vehicula in purus.</p>
      <p>Aliquam ac erat risus. Suspendisse condimentum iaculis erat eget auctor. Donec ornare, justo et auctor fringilla, neque nisi dignissim dolor, fringilla interdum urna lorem nec neque. Praesent viverra pellentesque ipsum, vel gravida magna accumsan eu. Nunc fringilla augue diam, vitae rutrum mauris lobortis in. Nam commodo interdum consequat. Pellentesque urna ligula, hendrerit a ante ut, ullamcorper pretium neque. In eu lectus pellentesque, feugiat erat sed, aliquet dolor. Fusce maximus nunc eu semper ornare. Sed quis urna metus. Suspendisse posuere lorem et libero tempor, sed molestie dui porta.</p>
      <p>Pellentesque posuere, augue tempor laoreet placerat, nisl neque pulvinar sem, id ultricies arcu nibh id erat. Proin mollis nisi purus. Aliquam at placerat urna. Donec arcu sapien, aliquet id pharetra at, lobortis vitae diam. Fusce dignissim hendrerit venenatis. Suspendisse a tortor vel tortor bibendum malesuada. Donec quis auctor erat, eget congue dui. Nullam orci nulla, volutpat sed vestibulum id, commodo a sapien. In et nisl eget neque rhoncus accumsan. Fusce et dignissim augue.</p>
    </div>
  </StyledAbout>
);

const StyledAbout = styled.article`
  width: 100%;
  background: url(${headerBg});
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLORS.bgdarkerblue};
  padding: 2rem;

  .about-info {
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 4rem;
    max-width: 1300px;
    padding-bottom: 4rem;
    opacity: 1;
    color: white;
    z-index: 1;
    font-family: 'Oswald', sans-serif;
    font-weight: 300;
    font-style: italic;
    letter-spacing: .025rem;
    text-align: justify;
    font-size: 1.4rem;
    flex-direction: column;
    gap: 1.5rem;

    h1 {
      text-align: center;
    }
  }
`;

export default Header;