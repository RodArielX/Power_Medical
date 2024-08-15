import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './estiloFactura.css'; // Asegúrate de importar el archivo de estilos

const FacturaForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    numero_factura: '',
    fecha: '',
    total: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/add_factura', formData)
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
        <h1>Agregar Factura</h1>
        <div className="logo">
        <img src={require('../img/logo.png')} alt="Logo Empresa" width="200px" />
      </div>
      </header>
      <Container className="form-container">
        <Row className="justify-content-center">
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formId">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Ingrese el ID"
                />
              </Form.Group>

              <Form.Group controlId="formNumeroFactura">
                <Form.Label>Número de Factura</Form.Label>
                <Form.Control
                  type="text"
                  name="numero_factura"
                  value={formData.numero_factura}
                  onChange={handleChange}
                  placeholder="Ingrese el número de factura"
                />
              </Form.Group>

              <Form.Group controlId="formFecha">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formTotal">
                <Form.Label>Total</Form.Label>
                <Form.Control
                  type="number"
                  name="total"
                  value={formData.total}
                  onChange={handleChange}
                  placeholder="Ingrese el total"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <footer className="footer">
        <p>© 2024 Factura Management. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default FacturaForm;

