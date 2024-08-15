import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import './estilovista.css'; // Asegúrate de importar el archivo de estilos

const FacturaTable = () => {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/get_facturas')
      .then(response => {
        setFacturas(response.data);
      })
      .catch(error => {
        console.error('Error fetching facturas:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete_factura/${id}`)
      .then(response => {
        alert(response.data.success || response.data.message);
        setFacturas(facturas.filter(factura => factura.id !== id));
      })
      .catch(error => {
        alert('Error: ' + error.message);
      });
  };

  return (
    <Container className="mt-5">
      <header className="header">
        <h1>Visualizacion y Eliminacion de Facturas</h1>
        <div className="logo">
        <img src={require('../img/logo.png')} alt="Logo Empresa" width="200px" />
      </div>
      </header>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Lista de Facturas</h2>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>ID</th>
                <th>Número de Factura</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map(factura => (
                <tr key={factura.id}>
                  <td>{factura.id}</td>
                  <td>{factura.numero_factura}</td>
                  <td>{factura.fecha}</td>
                  <td>{factura.total}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      onClick={() => handleDelete(factura.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <footer className="footer">
        <p>© 2024 Factura Management. Todos los derechos reservados.</p>
      </footer>
    </Container>
  );
};

export default FacturaTable;


