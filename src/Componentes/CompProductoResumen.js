import React from 'react';

const CompProductoResumen = ({ nombre, precio, imagen, onAgregar }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        {/* Imagen del producto */}
        <img
          src={imagen}
          className="card-img-top img-fluid"
          alt={nombre}
          style={{ objectFit: 'cover', height: '220px' }}
          onError={(e) => (e.target.src = '/imagenes/default.jpg')} // Imagen por defecto
        />

        {/* Contenido */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-dark fw-bold">{nombre}</h5>
          <p className="card-text text-success fs-5">S/ {precio}</p>

          <button
            onClick={onAgregar}
            className="btn btn-warning mt-auto text-dark fw-semibold"
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompProductoResumen;
