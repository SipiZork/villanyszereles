import React, {Fragment, useState, useEffect} from 'react';
import Customers from '../../components/customers/Customers';
import Login from '../../components/login/Login';
import Button from '../../components/utils/Button';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AdminPage = () => {

  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      setUser(user);
    })
    
  }, [])

  return (
    <StyledAdminPage>
      {user === null ?
        <Login /> :
        user.accessToken === token ?
        <Customers /> : <Login />
      }
    </StyledAdminPage>
  );
};

const StyledAdminPage = styled.article`
    background: ${COLORS.bgdarkestblue};
    margin-top: 4rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    color: ${COLORS.textprimary};
    font-family: 'Raleway', sans-serif;

    .error-msg {
      font-size: 1.5rem;
      margin: 1rem;
      color: red;
    }
`;

export default AdminPage;