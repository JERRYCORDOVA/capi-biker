import React, { Component } from 'react';

class CompProductoDetalle extends Component {
  render() {
    return (
      <div className="col-9">
        {/* text-secondary aplica un texto gris claro (hex: #6c757d) */}
        {/* Puedes reemplazarlo por 'text-danger' (rojo) o 'text-warning' (amarillo) */}
        <p className="h5 text-secondary">Producto destacado</p>

        {/* card = tarjeta Bootstrap con borde y sombra */}
        {/* mb-3 = margin bottom para separar las tarjetas */}
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src="imagenes/casaca1.png" className="card-img" alt="Casaca" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                {/* text-primary = texto azul por defecto (#007bff) */}
                {/* Puedes reemplazar por clase personalizada como 'mi-titulo-biker' */}
                <h5 className="card-title text-primary">Casaca Alpinestars</h5>

                <p className="card-text">
                  Casaca deportiva ideal para rutas, con refuerzo térmico y diseño aerodinámico. Impermeable y resistente al viento.
                </p>

                {/* text-primary otra vez, se muestra en color azul */}
                {/* Puedes reemplazar por 'text-danger' o una clase propia */}
                <p className="h4 text-primary">S/ 380.00</p>

                <p className="text-right">
                  {/* btn-primary = fondo azul con texto blanco */}
                  {/* Puedes reemplazar por 'btn-danger', 'btn-warning' o clase personalizada */}
                  <a className="btn btn-danger btn-primary" href="#">
                    Agregar al carrito
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompProductoDetalle;
