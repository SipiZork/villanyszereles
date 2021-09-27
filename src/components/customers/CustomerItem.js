import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';
import CustomerData from './CustomerData';

const CustomerItem = ({ customer, id }) => {

  const history = useHistory();
  const { name, callBack, newCustomer, zipcode, size, rooms,
    hall, bathroom, kitchen, livingroom, numberOfRooms, typeofwork } = customer;
  const classNames = newCustomer ? `new` : !callBack ? 'need-call' : 'called';

  const getDisctrict = () => {
    console.log(zipcode[0]);
    if (zipcode[0] == 1) {
      return `${zipcode[1]}${zipcode[2]}`;
    } else {
      return `${zipcode}`;
    }
  }

  const goToCustomer = () => {
    console.log(id);
    history.push(`customer/${id}`);
  }

  const getTypeOfWork = () => {
    if (typeofwork === 'channeling') {
      return 'Csatornázás'
    } else {
      return 'Vésés'
    }
  }

  const addAssemblies = () => {
    let assemblies = parseInt(hall) + parseInt(kitchen) + parseInt(livingroom) + parseInt(bathroom) + 4;
    numberOfRooms.map(room => {
      assemblies += parseInt(room.assembly) + 1;
    })
    return assemblies;
  }

  return (
    <StyledCustomerItem onClick={goToCustomer}>
      <div className={`header ${classNames}`}>
        {name}
      </div>
      <div className="basic-datas">
      <CustomerData className='zip' data={zipcode} name='Irányítószám' />
        {zipcode[0] == 1 &&
          <CustomerData className='disctrict' data={getDisctrict()} name='Kerület' />
        }
        <CustomerData className='size' data={size} name='Alapterület' />
        <CustomerData className='room-number' data={rooms} name='Szoba' />
        <CustomerData className='' data={addAssemblies()} name='Szerelvény' />
        <CustomerData className='' data={getTypeOfWork()} name='Kábelezés' />
      </div>
    </StyledCustomerItem>
  );
}

const StyledCustomerItem = styled.div`
  width: 500px;
  border-radius: .45rem;
  border: 1px solid rgba(200,200,200,.5);
  opacity: .7;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }

  .header {
    border-radius: .45rem;
    font-size: 1.2rem;
    padding: .5rem;
    &.new {
      background-color: rgba(255,0,0,.4);
    }
    &.need-call {
      background-color: rgba(242, 255, 0);
      color: black;
    }
    &.called {
      background-color: rgba(0, 255, 0, .5);
      color: black;
    }
  }

  .basic-datas {
    padding: .5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export default CustomerItem;
