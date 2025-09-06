import React from 'react';
import './App.css';
import PageListaProductos from './Componentes/PageListaProductos';
import PanelAdmin from './admin/PanelAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';


// 🛣️ Importamos BrowserRouter y Routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para el cliente */}
        <Route path="/" element={<PageListaProductos />} />

        {/* Ruta para el administrador */}
        <Route path="/admin" element={<PanelAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
