// Importamos React y el hook useState
import React, { useState } from 'react';

// Importamos el componente ResumenPedido (ventana emergente al finalizar compra)
import ResumenPedido from './ResumenPedido';

// Definimos el componente CompCarrito
// Props:
// - carrito: array con los productos agregados.
// - setCarrito: función para actualizar el carrito.
// - cerrar: función para cerrar el carrito lateral.
const CompCarrito = ({ carrito, setCarrito, cerrar }) => {
  // Estado local que controla si se muestra o no el resumen de pedido.
  const [mostrarResumen, setMostrarResumen] = useState(false);

  // ➕ Aumentar la cantidad de un producto en el carrito
  const aumentarCantidad = (nombre) => {
    const actualizado = carrito.map((item) =>
      item.nombre === nombre
        ? { ...item, cantidad: item.cantidad + 1 } // Si coincide, incrementa
        : item // Si no, deja igual
    );
    setCarrito(actualizado);
  };

  // ➖ Disminuir la cantidad de un producto
  const disminuirCantidad = (nombre) => {
    const actualizado = carrito
      .map((item) =>
        item.nombre === nombre
          ? { ...item, cantidad: item.cantidad - 1 } // resta 1 a la cantidad
          : item
      )
      .filter((item) => item.cantidad > 0); // Elimina productos con cantidad 0
    setCarrito(actualizado);
  };

  // 🗑 Eliminar un producto completamente del carrito
  const eliminarProducto = (nombre) => {
    setCarrito(carrito.filter((item) => item.nombre !== nombre));
  };

  // 💰 Calcular el total del carrito
  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  // 🎨 Renderizado del componente
  return (
    <div className="carrito-lateral animar-carrito">
      {/* Título */}
      <h5>🛒 Carrito</h5>

      {/* Botón para cerrar el carrito lateral */}
      <button onClick={cerrar} className="btn btn-sm btn-outline-danger mb-3">
        Cerrar
      </button>

      {/* Si el carrito está vacío */}
      {carrito.length === 0 ? (
        <p className="text-muted">Carrito vacío</p>
      ) : (
        // Si hay productos en el carrito, se listan uno por uno
        carrito.map((item, index) => (
          <div key={index} className="mb-3">
            {/* Nombre del producto */}
            <strong>{item.nombre}</strong>

            <div className="d-flex justify-content-between align-items-center">
              {/* Precio unitario x cantidad */}
              <span>S/ {item.precio} x {item.cantidad}</span>

              {/* Botones de control */}
              <div>
                {/* Botón disminuir cantidad */}
                <button
                  className="btn btn-sm btn-secondary mx-1"
                  onClick={() => disminuirCantidad(item.nombre)}
                >
                  -
                </button>

                {/* Botón aumentar cantidad */}
                <button
                  className="btn btn-sm btn-secondary mx-1"
                  onClick={() => aumentarCantidad(item.nombre)}
                >
                  +
                </button>

                {/* Botón eliminar producto */}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarProducto(item.nombre)}
                >
                  🗑
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))
      )}

      {/* Si hay productos en el carrito, mostramos el total y el botón de finalizar compra */}
      {carrito.length > 0 && (
        <>
          {/* Total a pagar */}
          <div className="text-right mb-2">
            <strong>Total: S/ {total}</strong>
          </div>

          {/* Botón para abrir la ventana de resumen */}
          <button
            className="btn btn-success btn-block"
            onClick={() => setMostrarResumen(true)}
          >
            Finalizar compra 🧾
          </button>
        </>
      )}

      {/* Ventana emergente de confirmación (ResumenPedido) */}
      {mostrarResumen && (
        <ResumenPedido
          carrito={carrito}             // Pasamos el carrito
          total={total}                 // Pasamos el total
          cerrarResumen={() => setMostrarResumen(false)} // Función para cerrar el resumen
          limpiarCarrito={() => {
            setCarrito([]); // Vaciamos carrito
            cerrar();       // Cerramos panel lateral
          }}
        />
      )}
    </div>
  );
};

// Exportamos el componente
export default CompCarrito;
