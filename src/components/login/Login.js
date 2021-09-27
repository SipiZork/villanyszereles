import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import Button from '../utils/Button';
import styled from 'styled-components';
import Input from '../form/Input';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { COLORS } from '../../styles/styles';

const Login = () => {

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const changeValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        localStorage.setItem('token', userCredential._tokenResponse.idToken);
      })
      .catch(e => console.error(e.message))
      .finally(history.push('/admin'));
  }

  return (
    <StyledLogin>
      <form>
        <div className="group">
          <div className="title-bar">
            <h4>Admin belépés</h4>
          </div>
          <div className="input-group">
            <Input onChange={changeValue} type="text" name="email" value={formData.size} required>Email cím</Input>
            <Input onChange={changeValue} type="password" name="password" value={formData.rooms} required>Jelszó</Input>
          </div>
        </div>
        <Button onClick={loginUser}>
          {loading? 'Belépés folyamatban...' : 'Belépés'}
        </Button>
      </form>
    </StyledLogin>
  )
}

const StyledLogin = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 4rem);

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .group {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .input-group {
        width: 100%;
        display: flex;
        gap: 1rem;
        justify-content: space-between;
      }
    }
    
    button {
      width: 90%;
      margin: 0 auto;
    }
  }
`;

export default Login;
