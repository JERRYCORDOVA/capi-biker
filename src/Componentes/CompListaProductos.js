// src/Componentes/CompListaProductos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompProductoResumen from './CompProductoResumen';

const CompListaProductos = ({ categoriaSeleccionada, agregarAlCarrito, busqueda }) => {
  const [productos, setProductos] = useState([]);

  // 🔄 Cargar productos del backend al montar
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await axios.get('http://localhost:3001/productos');
        setProductos(res.data);
      } catch (err) {
        console.error('❌ Error al cargar productos del backend:', err);
      }
    };

    obtenerProductos();
  }, []);

  // 🔍 Aplicar filtro por categoría y búsqueda
  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria =
      categoriaSeleccionada === 'todos' || prod.categoria === categoriaSeleccionada;
    const coincideBusqueda = prod.nombre.toLowerCase().includes(busqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="row">
      {productosFiltrados.length > 0 ? (
        productosFiltrados.map((prod) => (
          <CompProductoResumen
            key={prod._id}
            nombre={prod.nombre}
            precio={prod.precio}
            imagen={
              prod.imagen?.startsWith('http')
                ? prod.imagen
                : `http://localhost:3001/uploads/${prod.imagen}`
            }
            onAgregar={() => agregarAlCarrito(prod)}
          />
        ))
      ) : (
        <p className="text-muted">No hay productos en esta categoría.</p>
      )}
    </div>
  );
};

export default CompListaProductos;
