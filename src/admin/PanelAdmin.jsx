import React, { useEffect, useState } from 'react';

const PanelAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // ✅ Cargar productos al iniciar
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const res = await fetch('http://localhost:3001/productos');
    const data = await res.json();
    setProductos(data);
  };

  // 🟢 Crear o actualizar producto
  const guardarProducto = async () => {
    const producto = { nombre, precio, categoria, imagen };

    if (editandoId) {
      await fetch(`http://localhost:3001/productos/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });
    } else {
      await fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });
    }

    limpiarFormulario();
    obtenerProductos();
  };

  const eliminarProducto = async (id) => {
    await fetch(`http://localhost:3001/productos/${id}`, {
      method: 'DELETE',
    });
    obtenerProductos();
  };

  const editarProducto = (prod) => {
    setNombre(prod.nombre);
    setPrecio(prod.precio);
    setCategoria(prod.categoria);
    setImagen(prod.imagen);
    setEditandoId(prod._id);
  };

  const limpiarFormulario = () => {
    setNombre('');
    setPrecio('');
    setCategoria('');
    setImagen('');
    setEditandoId(null);
  };

  return (
    <div className="container mt-4">
      <h2>🛠️ Panel de Administración - Productos</h2>

      {/* 🔧 Formulario */}
      <div className="card p-3 my-4">
        <h5>{editandoId ? '✏️ Editar' : '➕ Agregar'} producto</h5>
        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="URL de imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={guardarProducto}>
            {editandoId ? 'Actualizar' : 'Guardar'}
          </button>
          {editandoId && (
            <button className="btn btn-warning" onClick={limpiarFormulario}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* 📋 Lista de productos */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Precio (S/)</th>
            <th>Categoría</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p._id}>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td>{p.categoria}</td>
              <td>
                <img src={p.imagen} alt={p.nombre} width="60" />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => editarProducto(p)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarProducto(p._id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanelAdmin;
