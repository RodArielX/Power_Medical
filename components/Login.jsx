import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/logo.png';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (result.status === 'success') {
        onLogin(profile);
        if (profile === 'bodeguero') {
          navigate('/bodeguero');
        } else if (profile === 'contador') {
          navigate('/panel_contador');
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Error en la conexión');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="border p-4 rounded shadow-sm bg-white" style={{ maxWidth: '400px', width: '100%' }}>
        <img src={logo} alt="Logo" className="mb-3" style={{ width: '100px' }} />
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              required
            >
              <option value="" disabled>Selecciona un perfil</option>
              <option value="bodeguero">Bodeguero</option>
              <option value="contador">Contador</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">Iniciar Sesión</button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
