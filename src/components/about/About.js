import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

import headerBg from '../../styles/images/electrical_bg_1.jpg';

const Header = ({ aboutRef }) => {

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
    <StyledAbout id="about" ref={aboutRef}>
      <div className="random-wires">
        {/*<svg class="blue">
          <path fill="transparent" stroke="#0095ff" strokeWidth="6" d={path} />
          <path fill="transparent" stroke="black" strokeWidth="6" d={path2} />
          <path fill="transparent" stroke="yellow" strokeWidth="6" strokeDasharray="20 20" strokeDashoffset="1" d={path3} />
          <path fill="transparent" stroke="#62ff00" strokeWidth="6" strokeDasharray="20 20" strokeDashoffset="20" d={path3} />
        </svg> */}
      </div>
      <div className="dark-bg"></div>
      <div className="about-info">
        <h1>38 éve a szakmában</h1>
        <p>Közel 40 éves épület villamossági és ipari szakmai tapasztalattal vállalom lakások, házak, üzlethelységek, teljes villamos hálózatának tervezését, felújítását, kivitelezését. Modern és naprakész megoldásokkal,  precíz munkavégzéssel, a határidők betartásával.</p>
        <p>Továbbá vállalom villamos berendezések (bojler, tűzhely) bekötését, tönkrement vagy elavult elosztók, kapcsolók, dugaljak, lámpák cseréjét.</p>
        <p>Keressen bizalommal hirtelen fellépő problémák esetén is, én a lehető leggyorsabban megkeresem a hiba okát, amit követően azonnali javaslatot adok a javítási folyamatról és költségekről.</p>
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
    opacity: .4;
    top: 0;
    left: 0;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .about-info {
    padding: 1rem;
    /*background: rgba(0,0,0,.3);*/
    border-radius: .5rem;
    display: flex;
    justify-content: center;
    position: sticky;
    top: 4rem;
    max-width: 1300px;
    opacity: 1;
    color: white;
    z-index: 1;
    font-family: 'Oswald', sans-serif;
    font-weight: 200;
    letter-spacing: .025rem;
    text-align: justify;
    font-size: 1.4rem;
    flex-direction: column;
    gap: 1.5rem;

    p {
      font-size: 1.5rem;
      line-height: 170%;
      letter-spacing: .1rem;
    }

    h1 {
      text-align: center;
      text-transform: uppercase;
      font-size: 3rem;
      font-style: italic;
      letter-spacing: .1rem;
    }
  }
`;

export default Header;