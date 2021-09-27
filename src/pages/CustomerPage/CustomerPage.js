import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';
import { doc, getDoc, collection, where, updateDoc, onSnapshot } from '@firebase/firestore';
import { useParams } from 'react-router-dom';
import Customer from '../../components/customer/Customer';
import { db } from '../../firebase/firebase';

const CustomerPage = () => {

  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  const updateNewCustomer = async() => {
    const customerRef = doc(db, 'customers', id);
    await updateDoc(customerRef, {
      newCustomer: false
    });
  }

  const updateCustomer = async () => {
    let customerData = await getDoc(doc(db, 'customers', id));
    customerData = { data: customerData.data(), id: id };
    setCustomer(customerData);
  }

  const updateCallBack = async () => {
    const customerRef = doc(db, 'customers', id);
    await updateDoc(customerRef, {
      callBack: !customer.callBack
    });
  }

  useEffect(async () => {
    const ref = doc(db, 'customers', id);
    onSnapshot(ref, snapshot => {
      setCustomer(snapshot.data());
    });
    updateNewCustomer();
  }, []);

  return (
    <StyledCustomerPage>
      <Customer customer={customer && customer !== null ? customer : ''} updateCallBack={updateCallBack} />
    </StyledCustomerPage>
  )
}

const StyledCustomerPage = styled.article`
  margin-top: 4rem;
`;

export default CustomerPage;
