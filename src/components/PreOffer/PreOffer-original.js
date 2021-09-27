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
      errs.push({ type: 'warning', msg: 'A Méretek kitöltése kötelező' });
    }
    if (rooms.length > 0 && (
      hall.length <= 0 || livingroom.length <= 0 || kitchen.length <= 0 || bathroom.length <= 0)
    ) {
      errs.push({ type: 'warning', msg: 'A kiállások számának kitöltése kötelező' });
    } else {
      let empty = false;
      numberOfRooms.map(room => {
        if (room.assembly <= 0) empty = true;
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
      addCustomer(size, rooms, livingroom, kitchen, bathroom, hall, phone, email, dishwasher,
        washingmachine, electricoven, dryer, typeofwork, zipcode, numberOfRooms, name,
        offers);
      setFormData(defaultDatas);
      errs.push({ type: 'access', msg: 'Köszönjük a megkeresést. A lehető leghamarabb visszahívjuk.' });
    }
    setErrors(errs);
  }

  return (
    <StyledPreOffer id="offer" ref={offerRef}>
      <div className="dark-bg"></div>
      <form>
        <p>Méretek</p>
        <Input onChange={changeValue} type="number" name="size" value={formData.size} required>Alapterület (nm)</Input>
        <Input onChange={changeValue} type="number" name="rooms" value={formData.rooms} required>Szobák száma</Input>
        {formData.rooms > 0 &&
          <Fragment>
          <p>Kiállások szeretne</p>
            <Input onChange={changeValue} type="number" name="hall" value={formData.hall} required>Előszoba</Input>
            <Input onChange={changeValue} type="number" name="livingroom" value={formData.livingroom} required>Nappapli</Input>
            <Input onChange={changeValue} type="number" name="kitchen" value={formData.kitchen} required>Konyha</Input>
            <Input onChange={changeValue} type="number" name="bathroom" value={formData.bathroom} required>Fürdőszoba</Input>
          </Fragment>
        }
        {numberOfRooms.map((room, i) => {
          return (
            <Input onChange={modifyAssemblies} type="number" name={room.indexName} value={room.assembly} required>{room.name}</Input>
          )
        })}
        <div className="form-group-select">
          <select name="typeofwork" value={formData.typeofwork} onChange={(e) => changeValue(e)}>
            <option value="channeling">Csatornázás</option>
            <option value="engraving">Vésés</option>
          </select>
          <label>
            Kábelvezetés
          </label>
        </div>
        <p>Elektromos készülékek</p>
        <Checker onChange={changeValue} type="checkbox" name="dishwasher" checked={formData.dishwasher}>Mosogatógép</Checker>
        <Checker onChange={changeValue} type="checkbox" name="electricoven" checked={formData.electricoven}>Elektromos sütő</Checker>
        <Checker onChange={changeValue} type="checkbox" name="washingmachine" checked={formData.washingmachine}>Mosógép</Checker>
        <Checker onChange={changeValue} type="checkbox" name="dryer" checked={formData.dryer}>Szárítógép</Checker>
        {/*<Button onClick={(e) => calculateOffer(e)} type="submit">Előkalkuláció</Button>*/}
      </form>
      <Prices>
        <p>Előkalkuláció</p>
        <div className="prices">
          {(offers.circuitOffer > 0 && formData.rooms > 0 && formData.size) &&
            <div className="prices-group">
            <div className="name">Áramkörök kiépítése</div>
            <div className="price">{ownPriceFormatter(formatter.format(offers.circuitOffer))}</div>
            </div>
          }
          {(offers.assemblyOffer > 0 && formData.rooms > 0 && formData.size) &&
            <div className="prices-group">
            <div className="name">Kiállások kiépítése</div>
            <div className="price">{ownPriceFormatter(formatter.format(offers.assemblyOffer))}</div>
            </div>
          }
          {(offers.typeOfWorkOffer > 0 && formData.rooms > 0 && formData.size) &&
            <div className="prices-group">
            <div className="name">Kábelvezetés kiépítése</div>
            <div className="price">{ownPriceFormatter(formatter.format(offers.typeOfWorkOffer))}</div>
            </div>
          }
          {((offers.circuitOffer > 0 || offers.assemblyOffer > 0 || offers.typeOfWorkOffer > 0) && formData.rooms > 0 && formData.size) &&
            <div className="prices-group">
            <div className="name">Összesen</div>
            <div className="price">{ownPriceFormatter(formatter.format(offers.circuitOffer + offers.assemblyOffer + offers.typeOfWorkOffer))}</div>
            </div>
          }
        </div>
        <Button onClick={(e) => changeInterest(e)}>{formData.interest ? 'Mégsem' : 'Érdekel'}</Button>
        {formData.interest &&
          <Fragment>
            <p>Elérhetőségek</p>
            <form>
              <Input onChange={changeValue} type="name" name="name" value={formData.name} required>Teljes név</Input>
              <Input onChange={changeValue} type="number" name="zipcode" value={formData.zipcode} required>Irányítószám</Input>
              <Input onChange={changeValue} type="email" name="email" value={formData.email} required>Email cím</Input>
              <Input onChange={changeValue} type="phone" name="phone" value={formData.phone} required>Telefonszám</Input>
            </form>
            <Button onClick={(e) => giveCall(e)}>Visszahívást kérek</Button>
          </Fragment>
        }
      </Prices>
    </StyledPreOffer>
  )
}

export default PreOffer;
