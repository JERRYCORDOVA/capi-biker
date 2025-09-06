import React, { Component } from 'react';

// Importa la barra de navegación superior (con logo y carrito)
import CompCabecera from './CompCabecera';

// Importa la lista de categorías del costado izquierdo
import CompListaCategorias from './CompListaCategorias';

// Importa el detalle del producto destacado (imagen grande + descripción + precio + botón)
import CompProductoDetalle from './CompProductoDetalle';

// Importa el pie de página con branding
import CompPiePagina from './CompPiePagina';

class PageProducto extends Component {
  render() {
    return (
      <div>
        {/* Cabecera de la página: logo, nombre de tienda, ícono del carrito */}
        <CompCabecera />

        {/* Contenido principal */}
        <main role="main" className="container">
          <div className="row">
            {/* Categorías (columna izquierda) */}
            <CompListaCategorias />

            {/* Detalle del producto (columna derecha) */}
            <CompProductoDetalle />
          </div>
        </main>

        {/* Pie de página fijo abajo con marca y año */}
        <CompPiePagina />
      </div>
    );
  }
}

export default PageProducto;
