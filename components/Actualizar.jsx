import React, { useState } from 'react';
import axios from 'axios';
import './estilosactualizar.css';

const ActualizarFac = () => {
  const [id, setId] = useState('');
  const [numeroFactura, setNumeroFactura] = useState('');
  const [fecha, setFecha] = useState('');
  const [total, setTotal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/update_factura', {
      id: id,
      numero_factura: numeroFactura,
      fecha: fecha,
      total: total
    })
    .then(response => {
      alert(response.data.success || response.data.message);
    })
    .catch(error => {
      alert('Error: ' + error.message);
    });
  };

  return (
    <div className="background-container">
      <header className="header">
        <h1>Actualizar Factura</h1>
        <div className="logo">
        <img src={require('../img/logo.png')} alt="Logo Empresa" width="200px" />
      </div>
      </header>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">ID:</label>
            <input 
              id="id"
              type="text" 
              value={id} 
              onChange={(e) => setId(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="numeroFactura">Número de Factura:</label>
            <input 
              id="numeroFactura"
              type="text" 
              value={numeroFactura} 
              onChange={(e) => setNumeroFactura(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="fecha">Fecha:</label>
            <input 
              id="fecha"
              type="date" 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="total">Total:</label>
            <input 
              id="total"
              type="number" 
              value={total} 
              onChange={(e) => setTotal(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Actualizar Factura</button>
        </form>
      </div>
      <footer className="footer">
        <p>© 2024 Factura Management. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default ActualizarFac;
