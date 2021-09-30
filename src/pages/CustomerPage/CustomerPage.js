import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';
import { doc, getDoc, collection, where, updateDoc, onSnapshot } from '@firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams, useHistory } from 'react-router-dom';
import Customer from '../../components/customer/Customer';
import { db } from '../../firebase/firebase';

const CustomerPage = () => {

  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const history = useHistory();

  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

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

  const redirectToHome = () => {
    history.push('/');
  }

  useEffect(async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      setUser(user);
    });
    console.log(user);
    updateNewCustomer();
  }, []);

  useEffect(() => {
    if (user !== null && user.accessToken === token) {
      const ref = doc(db, 'customers', id);
      onSnapshot(ref, snapshot => {
        setCustomer(snapshot.data());
      });
    }
  }, [user])

  return (
    <StyledCustomerPage>
      {user !== null &&  user.accessToken === token ?
        <Customer customer={customer && customer !== null ? customer : ''} updateCallBack={updateCallBack} /> : <div>Nothing</div>}
    </StyledCustomerPage>
  )
}

const StyledCustomerPage = styled.article`
  margin-top: 4rem;
`;

export default CustomerPage;
