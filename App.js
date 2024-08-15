import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PanelContador from './components/Panel_Contador';
import FacturaForm from './components/Factura';
import FacturaTable from './components/Vista_Factura';
import ActualizarFac from './components/Actualizar';
import Login from './components/Login';

function App() {
    const [perfil, setPerfil] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login onLogin={setPerfil} />} />
                {perfil === 'bodeguero' ? (
                    <>
                        <Route path="/factura_form" element={<FacturaForm />} />
                        <Route path="/visualizar_factura" element={<FacturaTable />} />
                        <Route path="/actualizar_factura" element={<ActualizarFac />} />
                    </>
                ) : perfil === 'contador' ? (
                    <>
                        <Route path="/panel_contador" element={<PanelContador />} />
                        <Route path="/factura_form" element={<FacturaForm />} />
                        <Route path="/visualizar_factura" element={<FacturaTable />} />
                        <Route path="/actualizar_factura" element={<ActualizarFac />} />
                        <Route path="*" element={<Navigate to="/panel_contador" />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/" />} />
                )}
            </Routes>
        </Router>
    );
}

export default App;
