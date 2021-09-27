import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../styles/styles';
import CustomerItem from './CustomerItem';
import { collection, getDocs } from 'firebase/firestore';

import {db} from '../../firebase/firebase';

const Customers = () => {

  const [customers, setCustomers] = useState([]);

  useEffect(async() => {
    const customers = []
    const querySnapshot = await getDocs(collection(db, 'customers'));
    querySnapshot.forEach((doc) => {
      customers.push({ data: doc.data(), id: doc.id });
    });
    setCustomers(customers);
  }, [])

  return (
    <StyledCustomers>
      {customers.map((customer, i) => (
        <CustomerItem customer={customer.data} id={customer.id} key={i} />
      ))}
    </StyledCustomers>
  )
}

const StyledCustomers = styled.article`
  margin-top: 4rem;
  padding-top: 1rem;
  background: ${COLORS.bgdarkestblue};
  color: ${COLORS.textprimary};
  display: flex;
  flex-direction: column;
  font-family: 'Oswald', sans-serif;
  align-items: center;
  gap: 1rem;

  h2 {
    position: relative;
    font-size: 3rem;
  }
`;

export default Customers;
