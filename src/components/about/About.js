import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

import headerBg from '../../styles/images/electrical_bg_1.jpg';

const Header = () => {

  const [path, setPath] = useState();
  const [path2, setPath2] = useState();
  const [path3, setPath3] = useState();

  useEffect(() => {
    let positionX = 0;
    let positionY = Math.floor(Math.random() * 50);
    let direction = 1;
    let currentPath;
    let currentPath2;
    let currentPath3;
    currentPath = `M${positionX},${positionY}`;
    currentPath2 = `M${positionX},${positionY-10}`;
    currentPath3 = `M${positionX},${positionY+10}`;
    while (positionX < document.querySelector('.random-wires').clientWidth) {
      let directionPositive = true;
      if (direction === 1) {
        directionPositive = Math.random() < 0.8;
        if (directionPositive) {
          positionX += Math.floor(Math.random() * (200 - 50) + 50);
        } else {
          positionX -= Math.floor(Math.random() * (200 - 50) + 50);
        }
        currentPath += ` ${positionX},${positionY}`;
        currentPath2 += ` ${positionX - 10},${positionY - 10}`;
        currentPath3 += ` ${positionX + 10},${positionY + 10}`;
        direction = 0;
      } else if (direction === 0) {
        if (positionY + 200 > document.querySelector('.random-wires').clientHeight) {
          directionPositive = Math.random() < 0.2;
        } else {
          directionPositive = Math.random() < 0.8;
        }
        console.log(typeof positionY);
        if (directionPositive) {
          positionY += Math.floor(Math.random() * (200 - 50) + 50);
        } else {
          positionY -= Math.floor(Math.random() * (200 - 50) + 50);
        }
        currentPath += ` ${positionX},${positionY}`;
        currentPath2 += ` ${positionX - 10},${positionY - 10}`;
        currentPath3 += ` ${positionX + 10},${positionY + 10}`;
        direction = 1;
      }
    }
    setPath(currentPath);
    setPath2(currentPath2);
    setPath3(currentPath3);
  }, []);

  const pathGenerator = () => {
    console.log(path);
    return path;
  }

  return (
    <StyledAbout>
      <div className="random-wires">
        <svg class="blue">
          <path fill="transparent" stroke="#0095ff" strokeWidth="6" d={path} />
          <path fill="transparent" stroke="black" strokeWidth="6" d={path2} />
          <path fill="transparent" stroke="yellow" strokeWidth="6" strokeDasharray="20 20" strokeDashoffset="1" d={path3} />
          <path fill="transparent" stroke="#62ff00" strokeWidth="6" strokeDasharray="20 20" strokeDashoffset="20" d={path3} />
        </svg>
      </div>
      <div className="dark-bg"></div>
      <div className="about-info">
        <h1>30 éve a szakmában</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar velit in nisi vestibulum accumsan. Cras vestibulum tellus urna, eu feugiat ex tempus et. Donec ut placerat magna, rhoncus finibus eros. Duis eget elit a ipsum viverra gravida at nec tellus. Aenean suscipit id magna a molestie. Suspendisse id laoreet urna. Mauris quis auctor risus. Etiam eget tortor sed mauris fermentum varius nec vel justo. Nunc non sodales magna, eget facilisis massa. Vivamus varius accumsan arcu, ac dignissim tortor lobortis et. Donec sed justo ligula. Nullam sed ornare lacus. Nam nec eros dui. Sed id maximus sem, non accumsan elit. Donec erat ex, efficitur id iaculis gravida, vehicula in purus.</p>
        <p>Aliquam ac erat risus. Suspendisse condimentum iaculis erat eget auctor. Donec ornare, justo et auctor fringilla, neque nisi dignissim dolor, fringilla interdum urna lorem nec neque. Praesent viverra pellentesque ipsum, vel gravida magna accumsan eu. Nunc fringilla augue diam, vitae rutrum mauris lobortis in. Nam commodo interdum consequat. Pellentesque urna ligula, hendrerit a ante ut, ullamcorper pretium neque. In eu lectus pellentesque, feugiat erat sed, aliquet dolor. Fusce maximus nunc eu semper ornare. Sed quis urna metus. Suspendisse posuere lorem et libero tempor, sed molestie dui porta.</p>
        <p>Pellentesque posuere, augue tempor laoreet placerat, nisl neque pulvinar sem, id ultricies arcu nibh id erat. Proin mollis nisi purus. Aliquam at placerat urna. Donec arcu sapien, aliquet id pharetra at, lobortis vitae diam. Fusce dignissim hendrerit venenatis. Suspendisse a tortor vel tortor bibendum malesuada. Donec quis auctor erat, eget congue dui. Nullam orci nulla, volutpat sed vestibulum id, commodo a sapien. In et nisl eget neque rhoncus accumsan. Fusce et dignissim augue.</p>
      </div>
    </StyledAbout>
  )
};

const StyledAbout = styled.article`
  width: 100%;
  background: url(${headerBg});
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLORS.bgdarkerblue};
  padding: 2rem;

  .random-wires {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    svg {
      width: 100%;
      height: 100%;
    }
  }

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