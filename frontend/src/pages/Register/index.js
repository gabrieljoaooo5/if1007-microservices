import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

export default function Register() {
  const [tokenTrello, settokenTrello] = useState('');
  const [consumerKey, setconsumerKey] = useState('');

  const history = useHistory();

  const userEmail = localStorage.getItem('userEmail');

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      userEmail,
      tokenTrello,
      consumerKey
    };

    try {
      const response = await api.put('/users', data);

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>

          <h1>Inserir dados do Trello</h1>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Token"
            value={tokenTrello}
            onChange={e => settokenTrello(e.target.value)}
          />

          <input 
            placeholder="Consumer Key"
            value={consumerKey}
            onChange={e => setconsumerKey(e.target.value)}
          />

          <button className="button" type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
}