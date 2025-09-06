import React from 'react';

// Recibe como props la cantidad de productos y función para abrir el carrito
const CompCabecera = ({ cantidadCarrito, abrirCarrito }) => {
  return (
    // navbar = barra superior
    // navbar-expand-md = se expande en pantallas medianas+
    // navbar-dark = texto claro sobre fondo oscuro
    // bg-dark = fondo gris oscuro (#343a40)
    // mb-4 = margen inferior para separación
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container d-flex justify-content-between align-items-center">

        {/* Logo de la tienda */}
        <a className="navbar-brand" href="#">
          <img
            src="imagenes/logo.png"
            width="180"
            alt="Logo Capi Biker"
            className="img-fluid"
          />
        </a>

        {/* Ícono del carrito de compras + contador */}
        <div
          onClick={abrirCarrito}
          style={{ cursor: 'pointer' }} // cursor tipo "manito"
          className="d-flex align-items-center"
          title="Ver carrito"
        >
          <img
            src="imagenes/carrito.png"
            width="32"
            alt="Carrito"
            className="img-fluid"
          />
          
          {/* text-light = texto blanco */}
          {/* ml-2 = margen a la izquierda */}
          <span className="text-light ml-2">
            {cantidadCarrito} producto{cantidadCarrito !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default CompCabecera;
