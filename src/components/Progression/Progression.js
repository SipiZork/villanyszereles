import React, { Fragment, useState } from 'react'
import styled from 'styled-components';
import ProgressArrow from '../arrow/ProgressArrow';
import { renovationProgression, troubleshootingProgression, wiringProgression } from '../../utils/Progession';
import { COLORS } from '../../styles/styles';
import parse from 'html-react-parser';

const Progression = () => {

  const [activeTab, setActiveTab] = useState(0);
  const [activeProgress, setActiveProgress] = useState(renovationProgression);
  const [activeTitle, setactiveTitle] = useState('Felújítási folyamat');

  const changeActiveTab = (tab) => {
    if (tab === 0) {
      setActiveProgress(renovationProgression);
      setactiveTitle('Felújítási / Építkezési folyamat');
    }
    if (tab === 1) {
      setActiveProgress(troubleshootingProgression);
      setactiveTitle('Hibaelhárítási folyamat');
    }
    if (tab === 2) {
      setActiveProgress(wiringProgression);
      setactiveTitle('Kisgép bekötés folyamat');
    }
    setActiveTab(tab);
  }

  return (
    <StyledProgession>
      <div className="dark-bg"></div>
      <ProgressTab>
        <div className={`tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => changeActiveTab(0)}>
          <div className="light-bg"></div>
          <p>Felújítás / Építkezés</p>
        </div>
        <div className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => changeActiveTab(1)}>
          <div className="light-bg"></div>
          <p>Hibaelhírtás</p>
        </div>
        {/*<div className={`tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => changeActiveTab(2)}>
          <div className="light-bg"></div>
          <p>Kisgép bekötés</p>
        </div>*/}
      </ProgressTab>
      <div className="title">
        <h2>{activeTitle}</h2>
      </div>
      <div className="content">
        {activeProgress.map((prog, i) => (
          <Fragment>
            <div className={`progress ${prog.step % 2 === 0 ? 'dark' : 'light'}`}>
              <div className={`step-title ${prog.step % 2 === 0 ? 'right' : 'left'}`}>
                <div className="step-icon"> {prog.step}</div>
                <h3>{prog.title}</h3>
              </div>
              <div className={`step-content ${prog.step % 2 === 0 ? 'right' : 'left'}`}>
                {parse(prog.description)}
              </div>
            </div>
            {i < activeProgress.length-1 &&
              <ProgressArrow right={prog.step % 2 === 0 ? false : true} />
            }
          </Fragment>
        ))}
      </div>
    </StyledProgession>
  )
}

const ProgressTab = styled.div`
  /*top: 4rem;*/
  top:0;
  left: 0;
  background: ${COLORS.bgdarkerblue};
  display: flex;
  width: 100%;
  height: 3rem;
  justify-content: space-around;
  margin-bottom: 1rem;
  position: sticky;
  z-index: 10;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: 5.5rem;
  }

  .tab {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    text-transform: uppercase;
    color: black;
    flex: 1;
    cursor: pointer;
    letter-spacing: .1rem;

    .light-bg {
      width: 100%;
      height: 0;
      position: absolute;
      left: 0;
      bottom: 0;
      transition: .3s all;
      background: ${COLORS.bgdarkblue};
      z-index: 1;
    }

    p {
      z-index: 2;
      transition: .3s all;
    }

    &.active, &:hover {
      .light-bg {
        height: 3rem;
      }
      @media screen and (max-width: 600px) {
        .light-bg {
          height: 2.75rem;
        }
      }
      color: ${COLORS.textprimary};
    }
  }
`;

const StyledProgession = styled.article`
  position: relative;
  background: ${COLORS.bgdarkblue};
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  flex-direction: column;
  padding: 2rem;
  font-family: 'Oswald', sans-serif;

  h2 {
    position: relative;
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  .content {
    width: 100%;
    position: relative;
    .progress {
      &.light {
        background: ${COLORS.bgdarkblue};
      }
      &.dark {
        background: ${COLORS.bgdarkerblue};
      }
      .step-title {
        display: flex;
        clear: both;
        align-items: center;
        min-height: 5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.right {
          flex-direction: row-reverse;
        }
        h3 {
          font-size: 3rem;
        }
        .step-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 4rem;
          font-weight: 900;
          min-width: 4rem;
          
          height: 100%;
        }
      }
      .step-content {
        font-size: 1.4rem;
        padding: 0 2rem 2rem;
        letter-spacing: .1rem;
        &.right {
          text-align: right;
        }

        strong {
          color: yellow;
          font-size: 1.6rem;
          text-decoration: underline;
          font-style: italic;
        }
      }
    }
  }
`;

export default Progression;
