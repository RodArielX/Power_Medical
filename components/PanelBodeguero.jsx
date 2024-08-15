import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PanelBodeguero = () => {
  const [form, setForm] = useState({ nombre: '', descripcion: '', cantidad: '', precio: '' });
  const [editingId, setEditingId] = useState(null);
  const [selectedOption, setSelectedOption] = useState('ingresar');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Obtener productos al cargar el componente
    axios.get('http://localhost:5000/get_productos')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === 'ingresar') {
      // Ingresar producto
      axios.post('http://localhost:5000/add_productos', form)
        .then(response => {
          alert(response.data.message);
          setForm({ nombre: '', descripcion: '', cantidad: '', precio: '' });
          // Actualizar la lista de productos
          return axios.get('http://localhost:5000/get_productos');
        })
        .then(response => setProducts(response.data))
        .catch(error => console.error('Error al ingresar producto:', error));
    } else if (selectedOption === 'actualizar') {
      // Actualizar producto
      axios.put(`/update_producto/${editingId}`, form)
        .then(response => {
          alert(response.data.message);
          setEditingId(null);
          setForm({ nombre: '', descripcion: '', cantidad: '', precio: '' });
          // Actualizar la lista de productos
          return axios.get('http://localhost:5000/get_productos');
        })
        .then(response => setProducts(response.data))
        .catch(error => console.error('Error al actualizar producto:', error));
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
    setSelectedOption('actualizar');
  };

  const handleDelete = (id) => {
    // Eliminar producto
    axios.delete(`http://localhost:5000//api/productos/${id}`)
      .then(response => {
        alert(response.data.message);
        // Actualizar la lista de productos
        return axios.get('/api/productos');
      })
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error al eliminar producto:', error));
  };

  return (
    <div className="container-fluid bg-primary vh-100">
      <div className="container py-5">
        <h1 className="text-center text-white mb-4">Panel del Bodeguero</h1>
        <div className="d-flex justify-content-center mb-4">
          <button className="btn btn-light mx-2" onClick={() => setSelectedOption('ingresar')}>Ingresar Producto</button>
          <button className="btn btn-light mx-2" onClick={() => setSelectedOption('actualizar')}>Actualizar Producto</button>
          <button className="btn btn-light mx-2" onClick={() => setSelectedOption('eliminar')}>Eliminar Producto</button>
        </div>
        <div className="bg-light p-4 rounded shadow-sm">
          {selectedOption === 'ingresar' && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-center mb-4">Ingresar Producto</h2>
              <div className="mb-3">
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="cantidad"
                  value={form.cantidad}
                  onChange={handleChange}
                  placeholder="Cantidad"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  step="0.01"
                  name="precio"
                  value={form.precio}
                  onChange={handleChange}
                  placeholder="Precio"
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Agregar</button>
            </form>
          )}
          {selectedOption === 'actualizar' && (
            <div>
              <h2 className="text-center mb-4">Actualizar Producto</h2>
              <table className="table table-light table-striped">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.nombre}</td>
                      <td>{product.descripcion}</td>
                      <td>{product.cantidad}</td>
                      <td>${product.precio}</td>
                      <td>
                        <button className="btn btn-warning mx-1" onClick={() => handleEdit(product)}>Editar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {editingId && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Nombre"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      name="descripcion"
                      value={form.descripcion}
                      onChange={handleChange}
                      placeholder="Descripción"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      name="cantidad"
                      value={form.cantidad}
                      onChange={handleChange}
                      placeholder="Cantidad"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      step="0.01"
                      name="precio"
                      value={form.precio}
                      onChange={handleChange}
                      placeholder="Precio"
                      className="form-control"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Actualizar</button>
                </form>
              )}
            </div>
          )}
          {selectedOption === 'eliminar' && (
            <div>
              <h2 className="text-center mb-4">Eliminar Producto</h2>
              <table className="table table-light table-striped">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.nombre}</td>
                      <td>{product.descripcion}</td>
                      <td>{product.cantidad}</td>
                      <td>${product.precio}</td>
                      <td>
                        <button className="btn btn-danger mx-1" onClick={() => handleDelete(product.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PanelBodeguero;


