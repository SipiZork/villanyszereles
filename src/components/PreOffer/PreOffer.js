import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';
import Button from '../utils/Button';
import Checker from '../form/Checker';
import ProgressBar from '../ProgressBar/ProgressBar';
import { FormOne, FormTwo, FormThreeTest, FormFourTest } from './forms';

import { addCustomer } from '../../firebase/firebase';

const PreOffer = ({ offerRef, addError }) => {

  const formatter = Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' });
  const ownPriceFormatter = (price) => {
    return price.toString().replace(/\s/g, '.').split(',')[0] + ' Ft';
  };

  const [formData, setFormData] = useState({
    accept: false,
    size: '',
    rooms: '',
    livingroom: '',
    kitchen: '',
    bathroom: '',
    hall: '',
    phone: '',
    email: '',
    interest: false,
    dishwasher: true,
    washingmachine: false,
    electricoven: false,
    dryer: false,
    typeofwork: 'channeling',
    zipcode: '',
    name: ''
  });

  const defaultDatas = {
    size: '',
    rooms: '',
    livingroom: '',
    kitchen: '',
    bathroom: '',
    hall: '',
    phone: '',
    email: '',
    interest: false,
    dishwasher: false,
    washingmachine: false,
    electricoven: false,
    dryer: false,
    typeofwork: 'channeling',
    zipcode: '',
    name: ''
  };

  const [errors, setErrors] = useState([]);

  const [step, setStep] = useState(1);
  const [inactiveNextButton, setInactiveNextButton] = useState(true);

  useEffect(() => {
    addError(errors);
  }, [errors]);

  const [offers, setOffers] = useState({
    circuitOffer: 0,
    assemblyOffer: 0,
    typeOfWorkOffer: 0,
  });

  const [numberOfRooms, setNumberOfRooms] = useState([]);

  useEffect(() => {
    if (formData.rooms > 0 && formData.size > 0) {
      calculateOffer();
    }
    if (step === 1) {
      if (formData.size.length > 0 && formData.rooms.length > 0) {
        setInactiveNextButton(false);
      } else {
        setInactiveNextButton(true);
      }
    } else if (step === 2) {
      if (formData.kitchen.length > 0 && formData.hall.length > 0 && formData.livingroom.length > 0 && formData.bathroom.length > 0) {
        let allRooms = true;
        numberOfRooms.map(room => {
          if (room.assembly.length <= 0) {
            allRooms = false;
          }
        });
        if (allRooms) {
          setInactiveNextButton(false);
        } else {
          setInactiveNextButton(true);
        }
      } else {
        setInactiveNextButton(true);
      }
    } else if (step === 3) {
      setInactiveNextButton(false);
    } else if (step === 4) {
      if (formData.name.length > 0 && formData.zipcode.length > 0 && formData.email.length > 0 && formData.phone.length > 0 && formData.accept) {
        setInactiveNextButton(false);
      } else {
        setInactiveNextButton(true);
      }
    }
  }, [formData, numberOfRooms, step]);

  const modifyAssemblies = (e) => {
    const { value, name } = e.target;
    const newArray = [...numberOfRooms];
    newArray.map(room => {
      if (room.indexName === name) {
        room.assembly = value;
      }
    });
    setNumberOfRooms(newArray);
    return;
  };

  const changeRooms = (roomNumber) => {
    let newRooms = [];
    for (let i = 0; i < roomNumber - 1; i++) {
      newRooms.push({ name: `Szoba ${i + 1}`, indexName: `room${i + 1}`, assembly: '' });
    }
    setNumberOfRooms(newRooms);
    return;
  };

  const changeValue = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if (e.target.name === 'rooms') {
      changeRooms(value);
    }
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const calculateOffer = () => {
    const circuitPrice = 8500;
    const assemblyPrice = 2500;
    const channelingPrice = 1000;
    const engravingPrice = 2500;
    const { typeofwork, livingroom, size, hall, kitchen, bathroom, rooms, dishwasher, washingmachine, electricoven, dryer } = formData;
    const livingroomNumber = livingroom === '' || isNaN(livingroom) ? 0 : parseInt(livingroom);
    const kitchenNumber = kitchen === '' || isNaN(kitchen) ? 0 : parseInt(kitchen);
    const bathroomNumber = bathroom === '' || isNaN(bathroom) ? 0 : parseInt(bathroom);
    const hallNumber = hall === '' || isNaN(hall) ? 0 : parseInt(hall);
    let typePrice = typeofwork === 'channeling' ? channelingPrice : engravingPrice;
    const roomsForOffer = parseInt(rooms) + 3;

    const lightCircuit = Math.round((roomsForOffer) / 2);
    let roomCircuit = hallNumber + livingroomNumber + kitchenNumber + bathroomNumber + roomsForOffer;
    numberOfRooms.map(room => {
      if (!isNaN(room.assembly) && room.assembly > 0) {
        roomCircuit += parseInt(room.assembly) + 1;
      }
      return;
    });

    let extraCircuit = 0;
    if (dishwasher) extraCircuit += 1;
    if (electricoven) extraCircuit += 1;
    if (washingmachine) extraCircuit += 1;
    if (dryer) extraCircuit += 1;

    const roomCircuitForCalculate = isNaN(roomCircuit) ? 0 : roomCircuit < 15 || roomCircuit > 28 ? roomCircuit * 1.7 : roomCircuit;
    const lightCircuitForCalculate = isNaN(lightCircuit) ? 0 : lightCircuit;
    const extraCircuitForCalculate = isNaN(extraCircuit) ? 0 : extraCircuit;

    let circuitOffer = circuitPrice * (roomCircuitForCalculate + lightCircuitForCalculate + extraCircuitForCalculate);
    let assemblyOffer = assemblyPrice * (roomCircuitForCalculate  + lightCircuitForCalculate + extraCircuitForCalculate);
    let typeOfWorkOffer = roomsForOffer * (parseInt(size) / 2) * typePrice;
    setOffers({
      circuitOffer,
      assemblyOffer,
      typeOfWorkOffer
    });
  };

  const giveCall = (e) => {
    e.preventDefault();
    let errs = [];
    let allCircuit = 0;
    const { size, rooms, livingroom, kitchen, bathroom, hall, phone, email, dishwasher,
      washingmachine, electricoven, dryer, typeofwork, zipcode, name } = formData;
    if (size.length <= 0 || rooms.length <= 0) {
      errs.push({ type: 'warning', msg: 'A Méretek kitöltése kötelező' });
    }
    if (rooms.length > 0 && (
      hall.length <= 0 || livingroom.length <= 0 || kitchen.length <= 0 || bathroom.length <= 0)
    ) {
      errs.push({ type: 'warning', msg: 'A kiállások számának kitöltése kötelező' });
    } else {
      let empty = false;
      numberOfRooms.map(room => {
        allCircuit += parseInt(room.assembly);
        if (room.assembly <= 0) empty = true;
        return;
      });
      if (empty) {
        errs.push({ type: 'warning', msg: 'A kiállások számának kitöltése kötelező' });
      }
    }
    if (phone.length <= 0) {
      errs.push({ type: 'warning', msg: 'Telefonszám megadása kötelező' });
    }
    if (email <= 0) {
      errs.push({ type: 'warning', msg: 'Email cím megadása kötelező' });
    }
    if (zipcode <= 0) {
      errs.push({ type: 'warning', msg: 'Irányítószám megadása kötelező' });
    }
    if (name.length <= 0) {
      errs.push({ type: 'warning', msg: 'Név megadása kötelező' });
    }
    if (errs.length <= 0) {
      addCustomer(size, rooms, livingroom, kitchen, bathroom,
        hall, phone, email, name, dishwasher, washingmachine, electricoven, dryer,
        typeofwork, zipcode, numberOfRooms, offers, (allCircuit + parseInt(livingroom) + parseInt(kitchen) + parseInt(bathroom) + parseInt(hall)));
      setFormData(defaultDatas);
      setStep(5);
      errs.push({ type: 'access', msg: 'Köszönjük a megkeresést. A lehető leghamarabb visszahívjuk.' });
    }
    setErrors(errs);
  };

  const jumpToStep = (jumpStep) => {
    if (jumpStep > step) {
      if (!inactiveNextButton && jumpStep === step+1) {
        setStep(jumpStep);
      }
    } else {
      setStep(jumpStep);
    }
  }

  return (
    <StyledPreOffer id="offer" ref={offerRef}>
      <div className="progress-bar">
        <div className="steps">
          {/*<p className={`${step > 1 ? 'done' : step === 1 ? 'active' : ''}`} onClick={() => jumpToStep(1)}>1</p>
          <p className={`${step > 2 ? 'done' : step === 2 ? 'active' : ''}`} onClick={() => jumpToStep(2)}>2</p>
          <p className={`${step > 3 ? 'done' : step === 3 ? 'active' : ''}`} onClick={() => jumpToStep(3)}>3</p>
          <p className={`${step > 4 ? 'done' : step === 4 ? 'active' : ''}`} onClick={() => jumpToStep(4)}>4</p>*/}
          <p className={`${step > 1 ? 'done' : step === 1 ? 'active' : ''}`}>1</p>
          <p className={`${step > 2 ? 'done' : step === 2 ? 'active' : ''}`}>2</p>
          <p className={`${step > 3 ? 'done' : step === 3 ? 'active' : ''}`}>3</p>
          <p className={`${step > 4 ? 'done' : step === 4 ? 'active' : ''}`}>4</p>
        </div>
        <ProgressBar maxStep={4} step={step} />
        <div className="steps-names">
          <p>Méretek</p>
          <p>Kiállások</p>
          <p>Készülékek</p>
          <p>Küldés</p>
        </div>
      </div>

      {/*content here*/}
      <form>
        {step === 1 && <FormOne formData={formData} changeValue={changeValue} />}
        {step === 2 && <FormTwo formData={formData} numberOfRooms={numberOfRooms} changeValue={changeValue} modifyAssemblies={modifyAssemblies} />}
        {step === 3 && <FormThreeTest formData={formData} changeValue={changeValue} />}
        {step === 4 && <FormFourTest offers={offers} changeValue={changeValue} formData={formData} formatter={formatter} ownPriceFormatter={ownPriceFormatter} />}
        {step === 5 && <div>Köszönjük a megkeresést.</div> }
      </form>
      <div className="button-group">
        <Button onClick={() => step - 1 > 0 ? setStep(step => step - 1) : ''}>Vissza</Button>
        {step !== 4 && <Button disabled={inactiveNextButton} onClick={() => step + 1 < 5 ? setStep(step => step + 1) : ''}>Következő</Button>}
        {step === 4 && <Button disabled={inactiveNextButton} type="submit" onClick={(e) => giveCall(e)}>Érdeklődöm</Button>}
    </div>
    </StyledPreOffer>
  )
}

export const StyledPreOffer = styled.article`
  background: ${COLORS.bgdarkestblue};
  padding: 2rem 0;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  color: ${COLORS.textprimary};
  font-family: 'Raleway', sans-serif;

  form {
    max-width: 1100px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .group {
    width: 100%;
    display:flex;
    flex-direction: column;
    gap: 2rem;

    span {
      font-weight: 600;
      color: ${COLORS.bglightblue}
    }

    .details {
      font-size: .9rem;
      p {
        strong {
          font-size: 1rem;
        }
      }
    }

    .prices {
      display: flex;
      margin: 0 1rem;
      flex-direction: column;
      @media screen and (max-width: 600px) {
        width: 90%;
        margin: 0 auto;
      }

      .prices-group {
        gap: 1rem;
        padding: .5rem;
        display: flex;
        justify-content: space-between;
        opacity: .8;
        font-size: 1.05rem;
        border-bottom: 1px solid ${COLORS.bglightblue};
        transition: all .25s;
        &:hover {
          opacity: 1;
          color: yellow;
        }
        &:nth-child(odd) {
          background-color: ${COLORS.bgdarkerblue};
        }
        &:nth-child(even) {
          background-color: ${COLORS.bgdarkblue};
        }
        &.text-bold {
          font-weight: 800;
        }
        .name {
        }
        .price {

        }
      }
    }

    .input-group {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: space-around;

      input {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button  {
          -webkit-appearance: none;
          margin: 0rem;
        }
        &[type=number] {
          -moz-appearance:textfield; /* Firefox */
        }
      }
    }

    .title-bar {
      margin: 0 1rem;
      padding: 1rem; 
      background-color: ${COLORS.bgdarkerblue};
      h4 {
        font-size: 1.1rem;
      }
      p {
        padding: .5rem;
        strong {
          font-style: italic;
          font-size: 1.3rem;
          color: yellow;
          text-transform: uppercase;
        }
      }
    }
  }

  .form-group-select {
    width: 30%;
    height: 1.8rem;
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    gap: 1rem;
    @media screen and (max-width: 600px) {
      width: 90%;
    }

    select {
      height: 1.8rem;
      padding-left: .5rem;
      font-size: 1.2rem;
    }
  }

  .progress-bar {
    min-width: 250px;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    .steps,
    .steps-names {
      display: flex;
      justify-content: space-around;
      p {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        text-align: center;
        line-height: 1.7rem;
        font-size: 1.5rem;
        color: ${COLORS.textprimary};
        opacity: .5;
        font-weight: 500;

        &.active {
          background-color: ${COLORS.bgdarkblue};
          color: ${COLORS.textblue};
          font-weight: 800;
          opacity: 1;
          color: white;
        }

        &.done {
          background-color: ${COLORS.bgdarkerblue};
          color: ${COLORS.textblue};
          font-weight: 800;
          color: black;
        }
      }
    }

    .steps {
      pointer-events: none;
    }
    .steps-names {
      p{
        width: 25%;
        font-size: 1rem;
      }
    }
  }

  .button-group {
    display: flex;
    gap: 1rem;
    width: 50%;
  }
`;

export default PreOffer;
