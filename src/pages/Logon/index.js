import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';


export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    const data = {
      email,
      password
    }
    
    try {

      console.log('entrou');

      
      const response = await api.post('/users', data);
      
      console.log(response.data)
      
      localStorage.setItem('userId', response.data._id);
      localStorage.setItem('userEmail', email);

      if(response.data.tokenTrello !== '#') {
        history.push('/profile');
      } else {
        history.push('/register');
      }
      
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>
        </form>
      </section>
    </div>
  );
}
