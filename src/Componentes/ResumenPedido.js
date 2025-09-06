import React, { useState } from 'react';

const ResumenPedido = ({ carrito, total, cerrarResumen, limpiarCarrito }) => {
  const [nombre, setNombre] = useState('');

  const enviarPedido = () => {
    const numeroCapi = "51929949589"; // ✅ Tu número real de WhatsApp

    // 📝 Construimos el mensaje con salto de línea
    let mensaje = `¡Hola Capi Biker! 🏍️ Quiero realizar el siguiente pedido:\n\n`;

    carrito.forEach(item => {
      mensaje += `• ${item.nombre} (x${item.cantidad}) - S/ ${item.precio * item.cantidad}\n`;
    });

    mensaje += `\n🔢 Total: S/ ${total}`;
    if (nombre.trim()) {
      mensaje += `\n🧍 Cliente: ${nombre.trim()}`;
    }

    mensaje += `\n\n🧾 Gracias por atender mi pedido, ¡nos vemos en la ruta! 🏍️🔥`;

    // ✅ Codificamos el mensaje para que no se malinterpreten caracteres especiales
    const url = `https://web.whatsapp.com/send?phone=${numeroCapi}&text=${encodeURIComponent(mensaje)}`;

    // ✅ Abrimos WhatsApp Web con el mensaje
    window.open(url, "_blank");

    // 🧹 Limpiar carrito y cerrar resumen
    limpiarCarrito();
    cerrarResumen();
  };

  return (
    <div className="resumen-overlay">
      <div className="resumen-box">
        <h5>🧾 Confirmar pedido</h5>

        <label>Nombre del cliente (opcional):</label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Ej: Jhonatan pacherres"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <ul>
          {carrito.map((item, idx) => (
            <li key={idx}>
              {item.nombre} (x{item.cantidad}) - S/ {item.precio * item.cantidad}
            </li>
          ))}
        </ul>

        <p><strong>Total: S/ {total}</strong></p>

        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={cerrarResumen}>
            Cancelar
          </button>
          <button className="btn btn-success" onClick={enviarPedido}>
            Enviar pedido a WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumenPedido; // ✅ Exportación correcta
