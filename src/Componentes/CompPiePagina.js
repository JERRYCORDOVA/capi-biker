import React, { Component } from 'react';

class CompPiePagina extends Component {
  render() {
    return (
      // navbar-dark: textos claros, bg-dark: fondo oscuro
      // Ya NO usamos fixed-bottom para que el pie no esté pegado al viewport
      <nav className="navbar navbar-dark bg-dark mt-5">
        <div className="container justify-content-between">
          {/* Logo o nombre de la tienda */}
          <a className="navbar-brand" href="#">Capi Biker</a>

          {/* Año y derechos */}
          <p className="text-secondary mb-0">&copy; 2025</p>
        </div>
      </nav>
    );
  }
}

export default CompPiePagina;
