import React, {Fragment, useEffect} from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';
import Button from '../utils/Button';
import { useHistory, useLocation } from 'react-router';

import CustomerDataLine from './CustomerDataLine';

const Customer = ({ customer, updateCallBack, updateNewCustomer }) => {

  const history = useHistory();
  const location = useLocation();

  const { name, callBack, newCustomer, zipcode, size, rooms,
    hall, bathroom, kitchen, livingroom, numberOfRooms, typeofwork, offers, email, phone } = customer;
  
  useEffect(() => {
    if (newCustomer) {
      updateNewCustomer();
    }
  }, [])
  return (
    <StyledCustomer>
      {(customer && customer !== '') &&
        <Fragment>
          <CusomterDatas>
            <Button className='dark' onClick={() => window.open(`${location.pathname}/pdf`, '_blank')}>Nyomtatás</Button>
            <CustomerDataLine title='Név' value={name} />
            <CustomerDataLine title='Irányítószám' value={zipcode} />
            <CustomerDataLine title='Alapterület' value={`${size}nm`} />
            <CustomerDataLine title='Szobák száma' value={rooms} />
            <CustomerDataLine title='Kábel elvezetés' value={typeofwork === 'channeling' ? 'Falon kívül' : 'Falon belül'} />
            <CustomerDataLine title='Előszoba kiállások' value={hall} />
            <CustomerDataLine title='Napplai kiállások' value={livingroom} />
            <CustomerDataLine title='Konyha kiállások' value={kitchen} />
            <CustomerDataLine title='Fürdőszoba kiállások' value={bathroom} />
            {numberOfRooms && numberOfRooms.map((room, i) => (
              <CustomerDataLine title={`${room.name} kiállások`} value={room.assembly} key={i} />
            ))}
            <CustomerDataLine title='Telefonszám' value={phone} />
            <CustomerDataLine title='Email' value={email} />
          <CustomerDataLine title='Felkeresve' callBack={callBack} onClick={() => updateCallBack()} value={callBack ? 'Felkeresve' : 'Felkeresésre vár'} className={callBack ? 'important' : 'warning'} modifier={true} modify='callBack' />
          </CusomterDatas>

          <CusomterDatas>
            <CustomerDataLine title='Kábelelvezetés kiépítése' value={`${offers.typeOfWorkOffer}.-`} />
            <CustomerDataLine title='Áramkörök kiépítése' value={`${offers.circuitOffer}.-`} />
            <CustomerDataLine title='Kiállások kiépítése ' value={`${offers.assemblyOffer}.-`} />
            <CustomerDataLine title='Összesen' className='information' value={(parseInt(offers.typeOfWorkOffer) + parseInt(offers.assemblyOffer) + parseInt(offers.circuitOffer)).toString() + '.-'} />
          </CusomterDatas>
        </Fragment>
      }
    </StyledCustomer>
  )
}

const StyledCustomer = styled.article`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  background: ${COLORS.bgdarkerblue};
  padding: 2rem;
`;

const CusomterDatas = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
`;

export default Customer
