import React from 'react';
import { Link } from 'react-router-dom'; 
import './panel_contador.css'; 

const PanelContador = () => {
  return (
    <div className="container">
      <div className="admin-panel">
        <h1>PANEL DEL CONTADOR</h1>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="admin-options">
            <div className="row">
              <div className="col-md-6">
                <Link to="/factura_form" className="text-decoration-none"> {}
                  <div className="card">
                    <center><img src={require('../img/regis.jpeg')} alt="Subir Factura" className="icon" /></center>
                    <div className="card-body">
                      <h5 className="card-title">Registrar Factura</h5>
                    </div>
                  </div>
                </Link> {}
              </div>
              <div className="col-md-6">
                <Link to="/visualizar_factura" className="text-decoration-none"> {}
                  <div className="card">
                    <center><img src={require('../img/visualizar.jpeg')} alt="Visualizar Facturas" className="icon" /></center>
                    <div className="card-body">
                      <h5 className="card-title">Visualizar Facturas</h5>
                    </div>
                  </div>
                </Link> {}
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <Link to="/actualizar_factura" className="text-decoration-none"> {}
                  <div className="card">
                    <center><img src={require('../img/actuali.jpeg')} alt="Actualizar Facturas" className="icon" /></center>
                    <div className="card-body">
                      <h5 className="card-title">Actualizar Facturas</h5>
                    </div>
                  </div>
                </Link> {}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 right-image">
          <img src={require('../img/contadora.jpeg')} alt="Contador" width="100%" />
        </div>
      </div>
    </div>
  );
}

export default PanelContador;

