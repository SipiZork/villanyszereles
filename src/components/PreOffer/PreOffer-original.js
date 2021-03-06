import React, {useEffect, useState, Fragment} from 'react';
import Button from '../utils/Button';
import Input from '../form/Input';
import Checker from '../form/Checker';

import { Prices, StyledPreOffer } from './PreOfferStyle';
import { addCustomer } from '../../firebase/firebase';

const PreOffer = ({ offerRef, addError }) => {

  const formatter = Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' });
  const ownPriceFormatter = (price) => {
    return price.toString().replace(/\s/g, '.').split(',')[0] + ' Ft';
  }

  const [formData, setFormData] = useState({
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
  }

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    addError(errors);
  }, [errors])

  const changeInterest = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      interest: !formData.interest
    })
  }

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
  }, [formData, numberOfRooms])

  const modifyAssemblies = (e) => {
    const { value, name } = e.target;
    const newArray = [...numberOfRooms];
    newArray.map(room => {
      if (room.indexName === name) {
        room.assembly = value;
      }
    });
    setNumberOfRooms(newArray);
  }

  const changeRooms = (roomNumber) => {
    let newRooms = [];
    for (let i = 0; i < roomNumber-1; i++) {
      newRooms.push({name: `Szoba ${i+1}`, indexName: `room${i+1}`, assembly: '' })
    }
    setNumberOfRooms(newRooms);
  }

  const changeValue = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if (e.target.name === 'rooms') {
      changeRooms(value);
    }
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  }

  const calculateOffer = () => {
    const circuitPrice = 7500;
    const assemblyPrice = 1500;
    const channelingPrice = 500;
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
    });

    let extraCircuit = 0;
    if (dishwasher) extraCircuit += 1;
    if (electricoven) extraCircuit += 1;
    if (washingmachine) extraCircuit += 1;
    if (dryer) extraCircuit += 1;

    const roomCircuitForCalculate = isNaN(roomCircuit) ? 0 : roomCircuit;
    const lightCircuitForCalculate = isNaN(lightCircuit) ? 0 : lightCircuit;
    const extraCircuitForCalculate = isNaN(extraCircuit) ? 0 : extraCircuit;

    let circuitOffer = circuitPrice * (roomCircuitForCalculate + lightCircuitForCalculate + extraCircuitForCalculate);
    let assemblyOffer = assemblyPrice * (roomCircuitForCalculate + extraCircuitForCalculate);
    let typeOfWorkOffer = roomsForOffer * (parseInt(size) / 2) * typePrice;
    setOffers({
      circuitOffer,
      assemblyOffer,
      typeOfWorkOffer
    });
  }

  const giveCall = (e) => {
    e.preventDefault();
    let errs = []
    const { size, rooms, livingroom, kitchen, bathroom, hall, phone, email, dishwasher,
      washingmachine, electricoven, dryer, typeofwork, zipcode, name } = formData;

    if (size.length <= 0 || rooms.length <= 0) {
      errs.push({ type: 'warning', msg: 'A M??retek kit??lt??se k??telez??' });
    }
    if (rooms.length > 0 && (
      hall.length <= 0 || livingroom.length <= 0 || kitchen.length <= 0 || bathroom.length <= 0)
    ) {
      errs.push({ type: 'warning', msg: 'A ki??ll??sok sz??m??nak kit??lt??se k??telez??' });
    } else {
      let empty = false;
      numberOfRooms.map(room => {
        if (room.assembly <= 0) empty = true;
      });
      if (empty) {
        errs.push({ type: 'warning', msg: 'A ki??ll??sok sz??m??nak kit??lt??se k??telez??' });
      }
    }
    if (phone.length <= 0) {
      errs.push({ type: 'warning', msg: 'Telefonsz??m megad??sa k??telez??' });
    }
    if (email <= 0) {
      errs.push({ type: 'warning', msg: 'Email c??m megad??sa k??telez??' });
    }
    if (zipcode <= 0) {
      errs.push({ type: 'warning', msg: 'Ir??ny??t??sz??m megad??sa k??telez??' });
    }
    if (name.length <= 0) {
      errs.push({ type: 'warning', msg: 'N??v megad??sa k??telez??' });
    }
    if (errs.length <= 0) {
      addCustomer(size, rooms, livingroom, kitchen, bathroom, hall, phone, email, dishwasher,
        washingmachine, electricoven, dryer, typeofwork, zipcode, numberOfRooms, name,
        offers);
      setFormData(defaultDatas);
      errs.push({ type: 'access', msg: 'K??sz??nj??k a megkeres??st. A lehet?? leghamarabb visszah??vjuk.' });
    }
    setErrors(errs);
  }

  return (
    <StyledPreOffer id="offer" ref={offerRef}>
      <div className="dark-bg"></div>
      <form>
        <p>M??retek</p>
        <Input onChange={changeValue} type="number" name="size" value={formData.size} required>Alapter??let (nm)</Input>
        <Input onChange={changeValue} type="number" name="rooms" value={formData.rooms} required>Szob??k sz??ma</Input>
        {formData.rooms > 0 &&
          <Fragment>
          <p>Ki??ll??sok szeretne</p>
            <Input onChange={changeValue} type="number" name="hall" value={formData.hall} required>El??szoba</Input>
            <Input onChange={changeValue} type="number" name="livingroom" value={formData.livingroom} required>Nappapli</Input>
            <Input onChange={changeValue} type="number" name="kitchen" value={formData.kitchen} required>Konyha</Input>
            <Input onChange={changeValue} type="number" name="bathroom" value={formData.bathroom} required>F??rd??szoba</Input>
          </Fragment>
        }
        {numberOfRooms.map((room, i) => {
          return (
            <Input onChange={modifyAssemblies} type="number" name={room.indexName} value={room.assembly} required>{room.name}</Input>
          )
        })}
        <div className="form-group-select">
          <select name="typeofwork" value={formData.typeofwork} onChange={(e) => changeValue(e)}>
            <option value="channeling">Csatorn??z??s</option>
            <option value="engraving">V??s??s</option>
          </select>
          <label>
            K??belvezet??s
          </label>
        </div>
        <p>Elektromos k??sz??l??kek</p>
        <Checker onChange={changeValue} type="checkbox" name="dishwasher" checked={formData.dishwasher}>Mosogat??g??p</Checker>
        <Checker onChange={changeValue} type="checkbox" name="electricoven" checked={formData.electricoven}>Elektromos s??t??</Checker>
        <Checker onChange={changeValue} type="checkbox" name="washingmachine" checked={formData.washingmachine}>Mos??g??p</Checker>
        <Checker onChange={changeValue} type="checkbox" name="dryer" checked={formData.dryer}>Sz??r??t??g??p</Checker>
        {/*<Button onClick={(e) => calculateOffer(e)} type="submit">El??kalkul??ci??</Button>*/}
      </form>
      <Prices>
        <p>El??kalkul??ci??</p>
        <div className="prices">
          {(offers.circuitOffer > 0 && formData.rooms > 0 && formData.size) &&
            <div className="prices-group">
            <div className="name">??ramk??r??k ki??p??t??se</div>
            <div className="price">{ownPriceFormatter(formatter.format(offers.circuitOffer))}</div>
            </div>
          }
          {(offers.assemblyOffer > 0 && formData.rooms > 0 && formData.size) &&
            <div className="prices-group">
            <div className="name">Ki??ll??sok ki??p??t??se</div>
            <div className="price">{ownPriceFormatter(formatter.format(offers.assemblyOffer))}</div>
            </div>
          }
          {(offers.typeOfWorkOffer > 0 && formData.rooms > 0 && formData.size) &&
            <div className="prices-group">
            <div className="name">K??belvezet??s ki??p??t??se</div>
            <div className="price">{ownPriceFormatter(formatter.format(offers.typeOfWorkOffer))}</div>
            </div>
          }
          {((offers.circuitOffer > 0 || offers.assemblyOffer > 0 || offers.typeOfWorkOffer > 0) && formData.rooms > 0 && formData.size) &&
            <div className="prices-group">
            <div className="name">??sszesen</div>
            <div className="price">{ownPriceFormatter(formatter.format(offers.circuitOffer + offers.assemblyOffer + offers.typeOfWorkOffer))}</div>
            </div>
          }
        </div>
        <Button onClick={(e) => changeInterest(e)}>{formData.interest ? 'M??gsem' : '??rdekel'}</Button>
        {formData.interest &&
          <Fragment>
            <p>El??rhet??s??gek</p>
            <form>
              <Input onChange={changeValue} type="name" name="name" value={formData.name} required>Teljes n??v</Input>
              <Input onChange={changeValue} type="number" name="zipcode" value={formData.zipcode} required>Ir??ny??t??sz??m</Input>
              <Input onChange={changeValue} type="email" name="email" value={formData.email} required>Email c??m</Input>
              <Input onChange={changeValue} type="phone" name="phone" value={formData.phone} required>Telefonsz??m</Input>
            </form>
            <Button onClick={(e) => giveCall(e)}>Visszah??v??st k??rek</Button>
          </Fragment>
        }
      </Prices>
    </StyledPreOffer>
  )
}

export default PreOffer;
