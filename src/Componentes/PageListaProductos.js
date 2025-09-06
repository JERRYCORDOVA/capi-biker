import React, { useState, useEffect } from 'react';
import CompCabecera from './CompCabecera';
import CompListaCategorias from './CompListaCategorias';
import CompListaProductos from './CompListaProductos';
import CompCarrito from './CompCarrito';
import CompPiePagina from './CompPiePagina';


const PageListaProductos = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");

  // 😎 Modo oscuro ON/OFF
  const [modoOscuro, setModoOscuro] = useState(false);

  // 🔍 Texto de búsqueda para filtrar productos por nombre
  const [busqueda, setBusqueda] = useState('');

  // 🛒 Carrito: leer del almacenamiento local al iniciar
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('capiCarrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // 💾 Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('capiCarrito', JSON.stringify(carrito));
  }, [carrito]);

  // ➕ Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.nombre === producto.nombre);

    if (existe) {
      const nuevoCarrito = carrito.map((item) =>
        item.nombre === producto.nombre
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }

    setMostrarCarrito(true); // Mostrar carrito automáticamente
  };

  return (
    <div className={modoOscuro ? 'dark-mode' : ''}>
      {/* 🚀 Cabecera con contador */}
      <CompCabecera
        cantidadCarrito={carrito.reduce((sum, item) => sum + item.cantidad, 0)}
        abrirCarrito={() => setMostrarCarrito(true)}
      />

      {/* 🛍️ Contenido principal */}
      <main role="main" className="container">
        <div className="row">
          {/* Categorías */}
          <CompListaCategorias cambiarCategoria={setCategoriaSeleccionada} />

          {/* Productos */}
          <div className="col-9">
            <p className="h5 text-secondary">
              Productos: {categoriaSeleccionada.toUpperCase()}
            </p>

            {/* 🔍 Buscador por nombre */}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <CompListaProductos
              categoriaSeleccionada={categoriaSeleccionada}
              agregarAlCarrito={agregarAlCarrito}
              busqueda={busqueda} // Se envía al hijo
            />
          </div>
        </div>
      </main>

      {/* 📦 Pie de página */}
      <CompPiePagina />

      {/* 🛒 Carrito lateral */}
      {mostrarCarrito && (
        <CompCarrito
          carrito={carrito}
          setCarrito={setCarrito}
          cerrar={() => setMostrarCarrito(false)}
        />
      )}

      {/* 🧾 Botón flotante para ver carrito */}
      <button
        className="btn btn-warning"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000
        }}
        onClick={() => setMostrarCarrito(true)}
      >
        Ver carrito 🛒
      </button>

      {/* 🌙 Botón modo oscuro / claro */}
      <button
        className="btn btn-secondary"
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          zIndex: 1000
        }}
        onClick={() => setModoOscuro(!modoOscuro)}
      >
        {modoOscuro ? 'Modo claro ☀️' : 'Modo oscuro 🌙'}
      </button>
    </div>
  );
};

export default PageListaProductos;
